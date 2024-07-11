import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '25%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <h1>Welcome to Water Management</h1>
      <p>In this app you will find all things water and management. Possibly even both</p>
      <Button type="button" variant="success" size="lg" className="copy-btn" onClick={signIn}>
        Log in
      </Button>
    </div>
  );
}

export default Signin;
