// ==========================================
// FILE: src/context/SurveyContext.jsx
// ==========================================
import React, { createContext, useState, useContext, useEffect } from 'react';

const SurveyContext = createContext();

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within SurveyProvider');
  }
  return context;
};

export const SurveyProvider = ({ children }) => {
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyChecked, setSurveyChecked] = useState(false);

  useEffect(() => {
    checkSurveyStatus();
  }, []);

  const checkSurveyStatus = async () => {
    const token = localStorage.getItem('token');
    const surveyCompleted = localStorage.getItem('surveyCompleted');
    
    // If no token or survey already completed, don't show
    if (!token || surveyCompleted === 'true') {
      setSurveyChecked(true);
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/analytics/survey/status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        if (!data.surveyCompleted) {
          setShowSurvey(true);
        } else {
          localStorage.setItem('surveyCompleted', 'true');
        }
      }
    } catch (error) {
      console.error('Check survey error:', error);
    } finally {
      setSurveyChecked(true);
    }
  };

  const handleSurveyComplete = () => {
    setShowSurvey(false);
    localStorage.setItem('surveyCompleted', 'true');
  };

  const handleSurveyClose = () => {
    setShowSurvey(false);
    // Will show again on next login if not completed
  };

  const triggerSurveyCheck = () => {
    setSurveyChecked(false);
    checkSurveyStatus();
  };

  return (
    <SurveyContext.Provider 
      value={{ 
        showSurvey, 
        surveyChecked,
        handleSurveyComplete, 
        handleSurveyClose,
        triggerSurveyCheck
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
