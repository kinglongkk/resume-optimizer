import React, { useState } from 'react';
import '../styles/ResumeAnalysis.css';

const ResumeAnalysis = ({ analysisResults, onReset }) => {
  const [activeTab, setActiveTab] = useState('suggestions');
  
  const { filename, suggestions, interview_questions } = analysisResults;
  
  const formatContent = (content) => {
    // Split content by line breaks and map to paragraphs
    return content.split('\n').map((line, index) => {
      if (line.trim() === '') return <br key={index} />;
      return <p key={index}>{line}</p>;
    });
  };

  return (
    <div className="resume-analysis">
      <h2>简历分析结果</h2>
      <p className="filename">文件名: {filename}</p>
      
      <div className="tabs">
        <button 
          className={activeTab === 'suggestions' ? 'active' : ''}
          onClick={() => setActiveTab('suggestions')}
        >
          优化建议
        </button>
        <button 
          className={activeTab === 'interview' ? 'active' : ''}
          onClick={() => setActiveTab('interview')}
        >
          模拟面试题
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'suggestions' && (
          <div className="suggestions">
            <h3>简历优化建议</h3>
            <div className="content">
              {formatContent(suggestions)}
            </div>
          </div>
        )}
        
        {activeTab === 'interview' && (
          <div className="interview-questions">
            <h3>模拟面试题</h3>
            <div className="content">
              {formatContent(interview_questions)}
            </div>
          </div>
        )}
      </div>
      
      <div className="actions">
        <button className="reset-button" onClick={onReset}>
          上传新简历
        </button>
      </div>
    </div>
  );
};

export default ResumeAnalysis;
