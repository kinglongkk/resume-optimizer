import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = {
  verifyApiKey: async (apiKey) => {
    try {
      const response = await axios.post(`${API_URL}/resume/verify-api-key`, {
        api_key: apiKey
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Network error occurred' };
    }
  },
  
  uploadResume: async (file, apiKey) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
      
      const response = await axios.post(`${API_URL}/resume/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Network error occurred' };
    }
  }
};

export default api;
