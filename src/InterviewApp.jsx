import React, { useState, useEffect, useRef } from 'react';
import { conductInterview } from './services/interviewService';
import InterviewChat from './InterviewChat';
import InterviewSummary from './InterviewSummary';

function InterviewApp({ onBack = null }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [summary, setSummary] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load API key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('anthropic_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setShowApiInput(false);
      startInterview(savedKey);
    }
  }, []);

  const startInterview = async (key) => {
    setIsLoading(true);
    try {
      const response = await conductInterview([], key);
      setMessages([{ role: 'assistant', content: response.message }]);

      if (response.isComplete) {
        setInterviewComplete(true);
        setSummary(response.summary);
      }
    } catch (error) {
      setMessages([{
        role: 'assistant',
        content: 'Error starting interview. Please check your API key and try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('anthropic_api_key', apiKey);
      setShowApiInput(false);
      startInterview(apiKey);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await conductInterview(newMessages, apiKey);
      const updatedMessages = [...newMessages, { role: 'assistant', content: response.message }];
      setMessages(updatedMessages);

      if (response.isComplete) {
        setInterviewComplete(true);
        setSummary(response.summary);
      }
    } catch (error) {
      setMessages([...newMessages, {
        role: 'assistant',
        content: 'Error processing your response. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetApiKey = () => {
    localStorage.removeItem('anthropic_api_key');
    setApiKey('');
    setShowApiInput(true);
    setMessages([]);
    setInterviewComplete(false);
    setSummary(null);
  };

  const handleStartNewInterview = () => {
    setMessages([]);
    setInterviewComplete(false);
    setSummary(null);
    setUserInput('');
    startInterview(apiKey);
  };

  if (showApiInput) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '3rem', maxWidth: 500, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <h2 style={{ marginTop: 0, color: '#00205b', textAlign: 'center', fontSize: '2rem' }}>AI Case Interview</h2>
          <p style={{ color: '#555', textAlign: 'center', marginBottom: '2rem' }}>
            Enter your Anthropic API key to start interviewing AI case ideas
          </p>
          <form onSubmit={handleApiKeySubmit}>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: 8,
                border: '2px solid #667eea',
                fontSize: '1rem',
                marginBottom: '1rem',
                fontFamily: 'monospace'
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              Start Interview
            </button>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                style={{
                  width: '100%',
                  background: '#f0f0f0',
                  color: '#333',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.8rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Back to Catalog
              </button>
            )}
          </form>
          <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '1.5rem', textAlign: 'center' }}>
            Your API key is stored locally and never sent to our servers
          </p>
        </div>
      </div>
    );
  }

  if (interviewComplete && summary) {
    return (
      <InterviewSummary
        summary={summary}
        onStartNew={handleStartNewInterview}
        onBack={onBack}
        onResetApiKey={handleResetApiKey}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'rgba(255,255,255,0.95)', borderBottom: '2px solid #667eea', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, color: '#00205b', fontSize: '1.8rem' }}>AI Case Interview</h1>
          <p style={{ margin: '0.3rem 0 0 0', color: '#666' }}>Powered by Claude</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleResetApiKey}
            style={{
              background: '#f0f0f0',
              color: '#333',
              border: 'none',
              borderRadius: 6,
              padding: '0.6rem 1.2rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Reset API Key
          </button>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: '#00205b',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '0.6rem 1.2rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Back to Catalog
            </button>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', maxWidth: 900, width: '100%', margin: '0 auto' }}>
        <InterviewChat messages={messages} isLoading={isLoading} />
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ background: 'rgba(255,255,255,0.95)', borderTop: '2px solid #667eea', padding: '1.5rem 2rem' }}>
        <form onSubmit={handleSendMessage} style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your response..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              borderRadius: 25,
              border: '2px solid #667eea',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !userInput.trim()}
            style={{
              background: isLoading || !userInput.trim() ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 25,
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: isLoading || !userInput.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Thinking...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default InterviewApp;
