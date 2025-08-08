import React, { useEffect } from 'react';
import RemoteButton from '../components/RemoteButton';

export default function Home() {
  useEffect(() => {
    // Page view tracking - analytics removed
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', marginBottom: '1rem' }}>
        Remote App
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.5' }}>
        This is the remote application that exposes the RemoteButton component 
        through Module Federation.
      </p>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#555', marginBottom: '1rem', fontSize: '1.2rem' }}>
          Exposed Remote Component:
        </h2>
        <RemoteButton />
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
        • This app runs on port 3001
        <br />
        • Exposes: RemoteButton component at ./RemoteButton
        <br />
        • Remote entry: http://localhost:3001/_next/static/chunks/remoteEntry.js
      </div>
    </div>
  );
}