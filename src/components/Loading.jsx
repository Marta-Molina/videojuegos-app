import React from 'react';

const Loading = ({ message = 'Cargando...' }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
    <div style={{ textAlign: 'center' }}>
      <div className="spinner" style={{ width: 48, height: 48, margin: '0 auto 10px', borderRadius: 999, border: '4px solid rgba(255,255,255,0.06)', borderTopColor: '#b86bff', animation: 'spin 1s linear infinite' }} />
      <div style={{ color: '#dcd0ff' }}>{message}</div>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default Loading;
