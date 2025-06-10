import React from 'react';

const ComingSoon: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 'calc(100vh - 150px)',
        background: '#fff',
        borderRadius: '50px',
        margin: '50px 0',
        fontSize: '50px',
        fontWeight: '700',
        color: '#040C2B'
      }}
    >
      <h1>Coming Soon!</h1>
    </div>
  );
};

export default ComingSoon;
