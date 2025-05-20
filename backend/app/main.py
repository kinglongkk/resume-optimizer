from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import resume

app = FastAPI(
    title="Resume Optimizer API",
    description="API for analyzing and optimizing resumes using Moonshot AI",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(resume.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Resume Optimizer API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
