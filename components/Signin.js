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
      <div style={{
        width: '100%', marginBottom: '20px', display: 'flex', justifyContent: 'center',
      }}
      >
        <img
          src="/water-mgmt-droplet.png"
          alt="Droplet, the Water Management Mascot!"
          width="300px"
          style={{ marginTop: '80px' }}
        />
      </div>
      <h3 style={{ marginBottom: '20px' }}>Hi, I&apos;m Droplet!  Welcome to Water Management!</h3>
      <p style={{ color: '#F6F6F6' }}>In this app you will find all things water management. Sign in below to get started!</p>
      <Button type="button" variant="success" size="lg" className="copy-btn" onClick={signIn}>
        Sign in
      </Button>
    </div>
  );
}

export default Signin;
