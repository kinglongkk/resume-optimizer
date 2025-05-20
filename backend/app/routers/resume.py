from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from fastapi.responses import JSONResponse
from typing import Optional
from pydantic import BaseModel
import os

from app.services.moonshot import MoonshotService
from app.utils.pdf import extract_text_from_pdf

router = APIRouter(
    prefix="/api/resume",
    tags=["resume"],
    responses={404: {"description": "Not found"}},
)

class ApiKeyVerification(BaseModel):
    api_key: str

class ResumeAnalysisRequest(BaseModel):
    api_key: str

async def get_moonshot_service(api_key: str = Form(...)):
    service = MoonshotService(api_key)
    return service

@router.post("/verify-api-key")
async def verify_api_key(request: ApiKeyVerification):
    """Verify if the provided Moonshot API key is valid"""
    try:
        service = MoonshotService(request.api_key)
        is_valid = await service.verify_api_key()
        
        if not is_valid:
            return JSONResponse(
                status_code=400,
                content={"detail": "Invalid API key"}
            )
            
        return {"status": "success", "message": "API key is valid"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    api_key: str = Form(...),
):
    """Upload and analyze a resume"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    try:
        # Read file content
        file_content = await file.read()
        
        # Extract text from PDF
        resume_text = await extract_text_from_pdf(file_content)
        
        if not resume_text or len(resume_text.strip()) < 50:
            raise HTTPException(status_code=400, detail="Could not extract sufficient text from the PDF")
        
        # Initialize Moonshot service
        moonshot_service = MoonshotService(api_key)
        
        # Analyze resume
        analysis_result = await moonshot_service.analyze_resume(resume_text)
        
        # Generate interview questions
        interview_questions = await moonshot_service.generate_interview_questions(resume_text)
        
        # Combine results
        result = {
            "filename": file.filename,
            "suggestions": analysis_result["suggestions"],
            "interview_questions": interview_questions["interview_questions"]
        }
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
