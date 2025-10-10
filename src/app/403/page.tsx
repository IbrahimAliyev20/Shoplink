import React from 'react';

const ForbiddenPage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f8d7da',
      color: '#721c24',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>403</h1>
      <h2>Giriş Qadağandır</h2>
      <p>Sizin bu səhifəyə daxil olmaq üçün icazəniz yoxdur.</p>
    </div>
  );
};

export default ForbiddenPage;