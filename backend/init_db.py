import models
from database import engine, SessionLocal
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

print("Inicializando base de datos local (SQLite)...")
models.Base.metadata.create_all(bind=engine)
print("Tablas creadas con éxito.")

db = SessionLocal()

def seed_user(email, plain_password, role, empresa_nombre=None, especialidad=None):
    existing_user = db.query(models.User).filter(models.User.email == email).first()
    hashed = pwd_context.hash(plain_password)
    if not existing_user:
        new_user = models.User(
            email=email,
            password_hash=hashed,
            role=role,
            empresa_nombre=empresa_nombre,
            especialidad=especialidad
        )
        db.add(new_user)
        db.commit()
        print(f"Usuario {email} creado con contraseña cifrada.")
    else:
        # Update hash if already exists with plain-text password
        if not existing_user.password_hash.startswith("$2"):
            existing_user.password_hash = hashed
            db.commit()
            print(f"Contraseña de {email} actualizada a bcrypt.")
        else:
            print(f"Usuario {email} ya existe con hash bcrypt. Sin cambios.")

seed_user("empresa@care.es", "pass123", "b2b", empresa_nombre="Grupo Inmobiliario Lujo S.L")
seed_user("pro@care.es",     "pass123", "interiorista", especialidad="Arquitectura Residencial")
seed_user("vip@care.es",     "pass123", "b2c")

db.close()
print("Base de datos lista.")
