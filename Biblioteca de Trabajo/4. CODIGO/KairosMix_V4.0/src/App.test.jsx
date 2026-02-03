import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>KairosMix - Test</h1>
      <p>Si ves este mensaje, React está funcionando correctamente.</p>
      <div style={{ background: '#f0f0f0', padding: '10px', marginTop: '10px' }}>
        <h2>Información de debug:</h2>
        <p>Modo: {import.meta.env.MODE}</p>
        <p>Base URL: {import.meta.env.BASE_URL}</p>
        <p>DEV: {import.meta.env.DEV ? 'true' : 'false'}</p>
        <p>PROD: {import.meta.env.PROD ? 'true' : 'false'}</p>
      </div>
    </div>
  );
}

export default App;