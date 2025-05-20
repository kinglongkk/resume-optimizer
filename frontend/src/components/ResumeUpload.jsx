import React, { useState } from 'react';
import api from '../services/api';
import '../styles/ResumeUpload.css';

const ResumeUpload = ({ apiKey, onAnalysisComplete }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) {
      setFile(null);
      return;
    }
    
    if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('请上传 PDF 格式的简历文件');
      setFile(null);
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
      setError('文件大小不能超过 5MB');
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('请选择要上传的简历文件');
      return;
    }
    
    setIsUploading(true);
    setError('');
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 5;
        return newProgress > 90 ? 90 : newProgress;
      });
    }, 300);
    
    try {
      const result = await api.uploadResume(file, apiKey);
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Pass analysis results to parent component
      onAnalysisComplete(result);
    } catch (err) {
      clearInterval(progressInterval);
      setUploadProgress(0);
      setError(err.detail || '上传或分析简历时出错，请重试');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="resume-upload">
      <h2>上传您的简历</h2>
      <p>请上传 PDF 格式的简历文件，我们将为您分析并提供优化建议</p>
      
      <form onSubmit={handleSubmit}>
        <div className="upload-area">
          <input
            type="file"
            id="resume"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <label htmlFor="resume" className={isUploading ? 'disabled' : ''}>
            {file ? file.name : '选择 PDF 文件'}
          </label>
        </div>
        
        {file && (
          <div className="file-info">
            <p>文件名: {file.name}</p>
            <p>大小: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}
        
        {error && <div className="error-message">{error}</div>}
        
        {isUploading && (
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
            <span>{uploadProgress}%</span>
          </div>
        )}
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={!file || isUploading}
        >
          {isUploading ? '分析中...' : '上传并分析'}
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;
