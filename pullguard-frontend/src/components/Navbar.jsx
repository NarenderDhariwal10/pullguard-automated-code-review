import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Navbar as BSNavbar, Container, Nav, Button, Image, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaCog } from 'react-icons/fa';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <BSNavbar bg="white" expand="lg" className="shadow-sm border-bottom" sticky="top">
      <Container>
        {/* Brand */}
        <BSNavbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary">
          PullGuard
        </BSNavbar.Brand>

        {/* Mobile toggle */}
        <BSNavbar.Toggle aria-controls="navMenu" />

        {/* Menu */}
        <BSNavbar.Collapse id="navMenu">
          {/* Main nav links */}
          <Nav className="me-auto fs-5">
            <Nav.Link as={NavLink} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/reviews">
              Reviews
            </Nav.Link>
            <Nav.Link as={NavLink} to="/repos">
              Repos
            </Nav.Link>
          </Nav>

          {/* Auth area */}
          <div className="d-flex align-items-center">
            {user ? (
              <NavDropdown
                align="end"
                title={
                  <span className="d-flex align-items-center">
                    <Image
                      src={user.avatarUrl}
                      alt="avatar"
                      roundedCircle
                      className="me-2 border border-primary"
                      style={{ width: 36, height: 36, objectFit: 'cover' }}
                    />
                    <span className="fw-semibold text-primary">{user.login}</span>
                  </span>
                }
              >
                <NavDropdown.Item as={Link} to="/profile">
                  <FaUser className="me-2" /> Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings">
                  <FaCog className="me-2" /> Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/logout" className="text-danger">
                  <FaSignOutAlt className="me-2" /> Sign out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button as={Link} to="/login" variant="primary" size="sm" className="fw-semibold px-3">
                <FaSignInAlt className="me-1" /> Sign in
              </Button>
            )}
          </div>
        </BSNavbar.Collapse>
      </Container>

      {/* Hover & active states */}
      <style>{`
        .nav-link {
          transition: color 0.25s ease, background-color 0.25s ease;
        }
        .nav-link.active {
          color: #0d6efd !important;
          font-weight: 600;
        }
        .nav-link:hover {
          color: #0b5ed7 !important;
        }
        .navbar-brand:hover {
          color: #0a58ca !important;
          text-decoration: none;
        }
      `}</style>
    </BSNavbar>
  );
}
