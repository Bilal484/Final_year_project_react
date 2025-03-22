import React, { useEffect, useState } from "react";
import "./header.css";
import imgLogo from "../../assets/images/PNG Logo Files/Transparent Logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("email");
    if (storedUser) {
      const userDisplayName = storedUser.split("@")[0];
      setUserName(userDisplayName);
    }
  }, [location]);

  const isAuthenticated = !!userName;

  const handleLogout = () => {
    localStorage.removeItem("email");
    setUserName(null);
    navigate("/login");
  };

  return (
    <div className="header-parent">
      <header>
        <nav className="navbar navbar-expand-lg bg-light p-3">
          <div className="container-fluid">
            <div className="d-flex justify-content-between flex-row align-items-center small__div">
              <div className="nav-item logo-nav">
                <Link className="navbar-brand text-danger fw-bold h1" to="/">
                  <img src={imgLogo} width="80" alt="Logo" />
                </Link>
              </div>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon text-white"></span>
              </button>
            </div>

            <div
              className="collapse navbar-collapse justify-content-md-end gap-3"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="text-muted" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="text-muted" to="/About">
                    About
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown1"
                    role="button"
                  >
                    Browse Properties
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown1"
                  >
                    <div className="dropdown-column">
                      <div className="dropdown-grid">
                        <li>
                          <Link className="dropdown-item" to="/Buy">
                            Buy
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/Sell">
                            Sell
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/Rent">
                            Rent
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/Sub2Deal">
                            Sub2 Deals
                          </Link>
                        </li>
                      </div>
                    </div>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown2"
                    role="button"
                  >
                    Services
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown2"
                  >
                    <div className="dropdown-column">
                      <div className="dropdown-grid">
                        <li>
                          <Link className="dropdown-item" to="/Investors">
                            Investors
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/Realtors">
                            Realtors
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/Developers">
                            Developers
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/Flippers">
                            Flippers
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/Contractors">
                            Contractors
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/TransactionCordinator"
                          >
                            Transaction Coordinators
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/Wholesaler">
                            Wholesalers
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/Lenders">
                            Lenders
                          </Link>
                        </li>
                      </div>
                    </div>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link className="text-muted" to="/HowtoWork">
                    How It Works
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown3"
                    role="button"
                  >
                    Resources
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown3"
                  >
                    <div className="dropdown-column">
                      <div className="dropdown-grid">
                        <li>
                          <Link className="dropdown-item" to="/Blog">
                            Blogs
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/FAQs">
                            FAQs
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/Guides">
                            Guides
                          </Link>
                        </li>
                      </div>
                    </div>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link className="text-muted" to="/Advertise">
                    Advertise
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="text-muted" to="/Contact">
                    Contact
                  </Link>
                </li>
              </ul>

              {/* Right Side (Login/Signup or Logout) */}
              <div className="d-flex Listing_Details align-items-center">
                {!isAuthenticated ? (
                  <Link to="/Login">
                    <button className="btn me-2">Login / SignUp</button>
                  </Link>
                ) : (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      to="#"
                      id="userDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <button className="btn me-2">{userName}</button>
                    </Link>
                    <ul
                      className="dropdown-menu p-2 mt-2 "
                      aria-labelledby="userDropdown"
                    >
                      <div className="dropdown-column">
                        <div className="dropdown-grid">
                          {/* Add more dropdown items here if needed */}
                          <li>
                            <button
                              className="dropdown-item text-light"
                              style={{ width: "fit-content" }}
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </li>
                        </div>
                      </div>
                    </ul>
                  </li>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
