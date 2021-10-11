import React, { useState, useEffect } from "react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavBar = ({ user, location }) => {
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      fixed="top"
    >
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="me-auto"
            activeKey={active}
            onClick={(e) => setActive(e.target.id)}
          >
            <Link
              to="/home"
              id="/home"
              className={`nav-link ${active === "/home" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/add"
              id="/add"
              className={`nav-link ${active === "/add" ? "active" : ""}`}
            >
              New Question
            </Link>
            <Link
              to="/leaderboard"
              id="/leaderboard"
              className={`nav-link ${
                active === "/leaderboard" ? "active" : ""
              }`}
            >
              Leader Board
            </Link>
          </Nav>
          <Nav>
            <Nav.Link>
              <div className="d-flex">
                <div
                  className="pr-2 text-white"
                  style={{ marginRight: "10px" }}
                >
                  {user ? user.name : ""}
                </div>
                <div
                  className="rounded-circle border border-light"
                  style={{
                    width: "25px",
                    height: "25px",
                    backgroundImage: `url(${user ? user.avatarURL : ""})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                  }}
                />
              </div>
            </Nav.Link>
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    avatarURL: PropTypes.string,
  }),
  location: PropTypes.shape({ pathname: PropTypes.string }),
};

export default NavBar;
