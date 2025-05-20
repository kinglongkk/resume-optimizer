import React, { useState } from 'react';
import api from '../services/api';
import '../styles/ApiKeyForm.css';

const ApiKeyForm = ({ onApiKeyVerified }) => {
  const [apiKey, setApiKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('请输入 Moonshot API Key');
      return;
    }
    
    setIsVerifying(true);
    setError('');
    
    try {
      await api.verifyApiKey(apiKey);
      onApiKeyVerified(apiKey);
    } catch (err) {
      setError(err.detail || '验证 API Key 失败，请检查后重试');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="api-key-form">
      <h2>简历优化助手</h2>
      <p>请输入您的 Moonshot API Key 以继续</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="apiKey">Moonshot API Key</label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="输入您的 Moonshot API Key"
            disabled={isVerifying}
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isVerifying}
        >
          {isVerifying ? '验证中...' : '验证并继续'}
        </button>
        
        <div className="info-text">
          <p>
            如果您还没有 Moonshot API Key，请访问 
            <a href="https://www.moonshot.cn/" target="_blank" rel="noopener noreferrer">
              Moonshot 官网
            </a> 
            获取。
          </p>
        </div>
      </form>
    </div>
  );
};

export default ApiKeyForm;
