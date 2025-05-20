import React, { useState } from 'react';
import ApiKeyForm from './components/ApiKeyForm';
import ResumeUpload from './components/ResumeUpload';
import ResumeAnalysis from './components/ResumeAnalysis';
import './styles/App.css';

function App() {
  const [apiKey, setApiKey] = useState('sk-R0mzLiFAi17kIOikq141mY5mmR5luHiyKC8ieEK6qS87Btlg');
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleApiKeyVerified = (key) => {
    setApiKey(key);
  };

  const handleAnalysisComplete = (results) => {
    setAnalysisResults(results);
  };

  const handleReset = () => {
    setAnalysisResults(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>简历优化助手</h1>
      </header>
      
      <main className="app-main">
        {!apiKey ? (
          <ApiKeyForm onApiKeyVerified={handleApiKeyVerified} />
        ) : analysisResults ? (
          <ResumeAnalysis 
            analysisResults={analysisResults} 
            onReset={handleReset} 
          />
        ) : (
          <ResumeUpload 
            apiKey={apiKey} 
            onAnalysisComplete={handleAnalysisComplete} 
          />
        )}
      </main>
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} 简历优化助手 - 基于 React + FastAPI + Moonshot AI</p>
      </footer>
    </div>
  );
}

export default App;
