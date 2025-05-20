import PyPDF2
from io import BytesIO

async def extract_text_from_pdf(file_content: bytes) -> str:
    """
    Extract text content from a PDF file
    
    Args:
        file_content: Binary content of the PDF file
        
    Returns:
        str: Extracted text from the PDF
    """
    try:
        pdf_reader = PyPDF2.PdfReader(BytesIO(file_content))
        text = ""
        
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()
            
        return text
    except Exception as e:
        raise Exception(f"Error extracting text from PDF: {str(e)}")
