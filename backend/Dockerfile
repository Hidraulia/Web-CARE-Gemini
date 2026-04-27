# Use official Python lightweight image
FROM python:3.10-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies (no-cache to keep image small)
RUN pip install --no-cache-dir -r requirements.txt

# Copy all application files
COPY . .

# Expose port (Render sets $PORT env var dynamically)
EXPOSE 8000

# Command to start the application using the dynamic PORT from Render
# If PORT is not set, default to 8000
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
