import React, { useState } from 'react';

function InterviewSummary({ summary, onStartNew, onBack, onResetApiKey }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: '3rem', maxWidth: 800, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ margin: 0, color: '#00205b', fontSize: '2.5rem' }}>Interview Complete!</h2>
          <p style={{ color: '#666', fontSize: '1.1rem', marginTop: '0.5rem' }}>
            Here's what we learned about your AI case idea:
          </p>
        </div>

        <div style={{
          background: '#f8f9fa',
          borderRadius: 12,
          padding: '2rem',
          marginBottom: '2rem',
          border: '2px solid #e9ecef',
          position: 'relative'
        }}>
          <button
            onClick={handleCopy}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: copied ? '#28a745' : '#667eea',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>

          <pre style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#333',
            margin: 0,
            paddingRight: '5rem'
          }}>
            {summary}
          </pre>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onStartNew}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Start New Interview
          </button>
          <button
            onClick={onBack}
            style={{
              background: '#00205b',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Back to Catalog
          </button>
          <button
            onClick={onResetApiKey}
            style={{
              background: '#f0f0f0',
              color: '#333',
              border: '2px solid #ddd',
              borderRadius: 8,
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Reset API Key
          </button>
        </div>

        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#e7f3ff', borderRadius: 8, border: '1px solid #b3d9ff' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#0066cc', fontSize: '1.1rem' }}>What's Next?</h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#333', lineHeight: '1.6' }}>
            <li>Review the gathered information with your team</li>
            <li>Identify potential AI suppliers from the catalog</li>
            <li>Refine your requirements based on the insights</li>
            <li>Start reaching out to suppliers for proposals</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InterviewSummary;
