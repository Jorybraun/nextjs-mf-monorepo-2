import React, { useEffect, useState, lazy, Suspense  } from 'react';
import dynamic from 'next/dynamic';

const RemoteComponent = lazy(() => import('remote/button'))

export default function Home() {
  useEffect(() => {
    // Track page view when component mounts
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.page('Host App Home', {
        title: 'Host App Home Page',
        path: '/',
        app: 'host-app',
      });
      console.log('Analytics tracked: Host App Home page view');
    }
  }, []);

  const handleHostButtonClick = () => {
    // Track analytics event for host button
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('Host Button Clicked', {
        component: 'HostButton',
        location: 'host-app',
        timestamp: new Date().toISOString(),
      });
      console.log('Analytics tracked: Host Button Clicked');
    }
    
    alert('Hello from Host App!');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', marginBottom: '1rem' }}>
        Host App
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.5' }}>
        This is the host application that consumes remote components through Module Federation.
        Both the host and remote components include Segment analytics tracking.
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#555', marginBottom: '1rem', fontSize: '1.2rem' }}>
          Host Component:
        </h2>
        <button
          onClick={handleHostButtonClick}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '2rem',
          }}
        >
          Click me (Host Component)
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#555', marginBottom: '1rem', fontSize: '1.2rem' }}>
          Remote Component (from remote-app):
        </h2>
        <Suspense fallback={'loading remote title'}>
          <RemoteComponent />
        </Suspense>
      </div>

      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '6px',
        fontSize: '14px',
        color: '#666',
      }}>
        <strong>Module Federation Info:</strong>
        <br />
        • This app runs on port 3000
        <br />
        • Consumes: RemoteButton from remote-app
        <br />
        • Remote URL: http://localhost:3001/_next/static/chunks/remoteEntry.js
        <br />
        <br />
        <strong>Setup Instructions:</strong>
        <br />
        1. Run both apps: `npm run dev:remote` and `npm run dev:host`
        <br />
        2. Add your Segment write key to both _document.js files
        <br />
        3. Open browser console to see analytics events
      </div>
    </div>
  );
}