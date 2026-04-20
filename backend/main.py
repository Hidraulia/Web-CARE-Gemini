from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

import models
from database import SessionLocal, engine

# Ensure tables are created (useful if someone forgets to run init_db.py)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CARE Backend API")

# Allow CORS since Next.js frontend runs on 3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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
    client_type: str  # E.g., 'b2b', 'interiorista', 'b2c'

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
    # Note: Using plain text matching for prototyping. Use passlib/bcrypt in production.
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user or user.password_hash != request.password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    
    return {
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "empresa_nombre": user.empresa_nombre,
        "especialidad": user.especialidad
    }
