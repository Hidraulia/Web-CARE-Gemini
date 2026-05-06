from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from passlib.context import CryptContext

import models
from database import SessionLocal, engine

# Ensure tables are created
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CARE Backend API")

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Allow CORS completely for Vercel deployment (TODO: restrict to vercel domain in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class LeadCreate(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    message: str
    client_type: str  # 'b2b', 'interiorista', 'b2c'

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/api/leads")
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    db_lead = models.Lead(
        name=lead.name,
        email=lead.email,
        company=lead.company,
        message=lead.message,
        client_type=lead.client_type,
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return {"status": "success", "lead_id": db_lead.id, "type": db_lead.client_type}

@app.post("/api/auth/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales incorrectas")

    # Verify bcrypt hash — falls back to plain-text check for legacy seeded users
    password_valid = False
    try:
        password_valid = pwd_context.verify(request.password, user.password_hash)
    except Exception:
        # Legacy plain-text fallback (only for development seeds)
        password_valid = (user.password_hash == request.password)

    if not password_valid:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales incorrectas")
    
    return {
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "empresa_nombre": user.empresa_nombre,
        "especialidad": user.especialidad,
        "must_change_password": user.must_change_password
    }

class RegisterRequest(BaseModel):
    email: str
    password: str
    role: str
    empresa_nombre: Optional[str] = None
    especialidad: Optional[str] = None

@app.post("/api/auth/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El email ya está registrado.")
        
    hashed_password = pwd_context.hash(request.password)
    
    new_user = models.User(
        email=request.email,
        password_hash=hashed_password,
        role=request.role,
        empresa_nombre=request.empresa_nombre,
        especialidad=request.especialidad,
        must_change_password=True
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"status": "success", "id": new_user.id}

class ChangePasswordRequest(BaseModel):
    email: str
    current_password: str
    new_password: str

@app.post("/api/auth/change-password")
def change_password(request: ChangePasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado.")
        
    # Verify current password
    password_valid = False
    try:
        password_valid = pwd_context.verify(request.current_password, user.password_hash)
    except Exception:
        password_valid = (user.password_hash == request.current_password)
        
    if not password_valid:
        raise HTTPException(status_code=401, detail="Contraseña actual incorrecta.")
        
    user.password_hash = pwd_context.hash(request.new_password)
    user.must_change_password = False
    db.commit()
    
    return {"status": "success"}

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "CARE Backend API"}
