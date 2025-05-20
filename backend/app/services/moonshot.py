import httpx
from typing import Dict, Any, Optional

class MoonshotService:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.moonshot.cn/v1"
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    async def analyze_resume(self, resume_text: str) -> Dict[str, Any]:
        """
        Analyze resume content using Moonshot API
        
        Args:
            resume_text: Text content of the resume
            
        Returns:
            Dict: Analysis results including suggestions and improvements
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers=self.headers,
                    json={
                        "model": "moonshot-v1-8k",
                        "messages": [
                            {"role": "system", "content": "你是一位专业的简历优化顾问，擅长分析简历并提供改进建议。"},
                            {"role": "user", "content": f"请分析以下简历内容，并提供具体的优化建议，包括内容组织、表达方式、技能展示等方面。简历内容如下：\n\n{resume_text}"}
                        ],
                        "temperature": 0.7
                    },
                    timeout=30.0
                )
                
                response.raise_for_status()
                result = response.json()
                
                return {
                    "suggestions": result["choices"][0]["message"]["content"]
                }
        except Exception as e:
            raise Exception(f"Error analyzing resume with Moonshot API: {str(e)}")
    
    async def generate_interview_questions(self, resume_text: str) -> Dict[str, Any]:
        """
        Generate mock interview questions based on resume content
        
        Args:
            resume_text: Text content of the resume
            
        Returns:
            Dict: Generated interview questions
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers=self.headers,
                    json={
                        "model": "moonshot-v1-8k",
                        "messages": [
                            {"role": "system", "content": "你是一位经验丰富的面试官，根据候选人的简历准备面试问题。"},
                            {"role": "user", "content": f"请根据以下简历内容，生成10个可能的面试问题，包括技术问题和行为问题。简历内容如下：\n\n{resume_text}"}
                        ],
                        "temperature": 0.7
                    },
                    timeout=30.0
                )
                
                response.raise_for_status()
                result = response.json()
                
                return {
                    "interview_questions": result["choices"][0]["message"]["content"]
                }
        except Exception as e:
            raise Exception(f"Error generating interview questions with Moonshot API: {str(e)}")
            
    async def verify_api_key(self) -> bool:
        """
        Verify if the provided API key is valid
        
        Returns:
            bool: True if API key is valid, False otherwise
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/models",
                    headers=self.headers,
                    timeout=10.0
                )
                
                return response.status_code == 200
        except Exception:
            return False
