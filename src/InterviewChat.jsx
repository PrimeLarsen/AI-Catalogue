import React from 'react';

function InterviewChat({ messages, isLoading }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {messages.map((message, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
          }}
        >
          <div
            style={{
              maxWidth: '75%',
              padding: '1.2rem 1.5rem',
              borderRadius: message.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
              background: message.role === 'user'
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : '#fff',
              color: message.role === 'user' ? '#fff' : '#333',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: '1.05rem',
              lineHeight: '1.6',
              wordWrap: 'break-word'
            }}
          >
            {message.role === 'assistant' && (
              <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#667eea', fontSize: '0.9rem' }}>
                Claude Interviewer
              </div>
            )}
            <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div
            style={{
              maxWidth: '75%',
              padding: '1.2rem 1.5rem',
              borderRadius: '20px 20px 20px 4px',
              background: '#fff',
              color: '#333',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#667eea', fontSize: '0.9rem' }}>
              Claude Interviewer
            </div>
            <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
              <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>●</span>
              <span style={{ animation: 'pulse 1.5s ease-in-out 0.2s infinite' }}>●</span>
              <span style={{ animation: 'pulse 1.5s ease-in-out 0.4s infinite' }}>●</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default InterviewChat;
