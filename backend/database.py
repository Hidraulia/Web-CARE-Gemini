from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os

# Check if DATABASE_URL is set in the environment (e.g., Render)
DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://user:password@localhost/caredb")

# Render PostgreSQL URLs start with postgres:// but SQLAlchemy 1.4+ requires postgresql://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Connect to PostgreSQL
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
