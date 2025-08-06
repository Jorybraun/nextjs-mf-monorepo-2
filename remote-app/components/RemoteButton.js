import React from 'react';

const RemoteButton = () => {
  const handleClick = () => {
    // Track analytics event when button is clicked
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('Remote Button Clicked', {
        component: 'RemoteButton',
        location: 'remote-app',
        timestamp: new Date().toISOString(),
      });
      console.log('Analytics tracked: Remote Button Clicked');
    } else {
      console.warn('Segment analytics not available');
    }
    
    alert('Hello from Remote Button!');
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '6px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = '#0051d5';
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = '#0070f3';
      }}
    >
      Click me (Remote Component)
    </button>
  );
};

export default RemoteButton;