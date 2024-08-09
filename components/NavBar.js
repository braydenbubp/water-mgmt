/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <>
      <Navbar className="navbar-navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link passHref href="/">
            <Navbar.Brand>
              <img
                src="/water-mgmt-droplet.png"
                alt="Droplet, the Water Management Mascot!"
                height="40px"
              />
            </Navbar.Brand>
          </Link>
          <Link passHref href="/">
            <Navbar.Brand className="navbar-brand">Water Management</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
            >
              {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
              <div style={{
                display: 'flex',
              }}
              >
                <Link passHref href="/">
                  <Nav.Link className="clickableLink">Home</Nav.Link>
                </Link>
                <Link passHref href="/post/edit/new">
                  <Nav.Link className="clickableLink">Add Post</Nav.Link>
                </Link>
                <Link passHref href={`/profile/${user.id}`}>
                  <Nav.Link className="clickableLink">Profile</Nav.Link>
                </Link>
              </div>
              <div style={{
                display: 'flex',
                marginLeft: 'auto',
              }}
              >
                <Button variant="danger" onClick={signOut}>Sign Out</Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
