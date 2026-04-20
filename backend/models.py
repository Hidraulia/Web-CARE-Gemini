from sqlalchemy import Column, Integer, String, DateTime
from database import Base
import datetime

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    company = Column(String, nullable=True)
    message = Column(String)
    client_type = Column(String, index=True) # b2b, interiorista, b2c
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String, index=True) # b2b, interiorista, b2c
    empresa_nombre = Column(String, nullable=True) # Solo B2B
    especialidad = Column(String, nullable=True)   # Solo Interioristas
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
