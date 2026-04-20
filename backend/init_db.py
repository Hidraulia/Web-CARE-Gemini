import models
from database import engine, SessionLocal

print("Inicializando base de datos local (SQLite)...")
models.Base.metadata.create_all(bind=engine)
print("Tablas creadas con éxito.")

# Seed Users
db = SessionLocal()

def seed_user(email, password_hash, role, empresa_nombre=None, especialidad=None):
    existing_user = db.query(models.User).filter(models.User.email == email).first()
    if not existing_user:
        new_user = models.User(
            email=email,
            password_hash=password_hash, # Using plain text for dummy purposes, realistically this is hashed
            role=role,
            empresa_nombre=empresa_nombre,
            especialidad=especialidad
        )
        db.add(new_user)
        db.commit()
        print(f"Usuario {email} creado.")

seed_user("empresa@care.es", "pass123", "b2b", empresa_nombre="Grupo Inmobiliario Lujo S.L")
seed_user("pro@care.es", "pass123", "interiorista", especialidad="Arquitectura Residencial")
seed_user("vip@care.es", "pass123", "b2c")

db.close()
