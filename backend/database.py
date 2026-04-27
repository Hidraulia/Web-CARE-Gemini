from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os

# Check if DATABASE_URL is set in the environment (e.g., Render)
DATABASE_URL = os.environ.get("DATABASE_URL")

if DATABASE_URL:
    # Render PostgreSQL URLs start with postgres:// but SQLAlchemy 1.4+ requires postgresql://
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    
    # Connect to PostgreSQL
    engine = create_engine(DATABASE_URL)
else:
    # Fallback to local SQLite if DATABASE_URL is not provided
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(BASE_DIR, "care.db")
    DATABASE_URL = f"sqlite:///{db_path}"
    
    engine = create_engine(
        DATABASE_URL, connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
