import { useState } from "react";
import { Container, Nav, Navbar, Button, Dropdown } from "react-bootstrap";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AuthModal from "../AuthModal/AuthModal";
import { logout } from "../../app/features/auth/authSlice";
import { toast } from "react-toastify";

const NavBar = () => {
  const { cartList } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }
  window.addEventListener("scroll", scrollHandler);

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logged out successfully");
    navigate("/");
  };

  return (
    <>
      <Navbar
        fixed="top"
        expand="md"
        className={isFixed ? "navbar fixed" : "navbar"}
      >
        <Container className="navbar-container">
          <Navbar.Brand as={Link} to="/">
            <img
              src="/MultiMart.png"
              alt="Multimart Logo"
              className="navbar-logo"
              style={{ height: "45px", objectFit: "contain" }}
            />
          </Navbar.Brand>

          <div className="d-flex align-items-center me-2">
            <Link
              aria-label="Wishlist Page"
              to="/wishlist"
              className="cart media-cart me-3 position-relative"
            >
              <i className="fa-regular fa-heart fs-4 text-dark"></i>
              {wishlist.length > 0 && (
                <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle" style={{ fontSize: "10px" }}>
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              aria-label="Go to Cart Page"
              to="/cart"
              className="cart media-cart me-3"
              data-num={cartList.length}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="nav-icon"
              >
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
            </Link>

            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => setExpand(expand ? false : "expanded")}
            >
              <span></span>
              <span></span>
              <span></span>
            </Navbar.Toggle>
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
              <Nav.Item>
                <Link
                  className="navbar-link"
                  to="/"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">Home</span>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link
                  className="navbar-link"
                  to="/shop"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">Shop</span>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link
                  className="navbar-link position-relative"
                  to="/wishlist"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">
                    Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                  </span>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link
                  className="navbar-link"
                  to="/orders"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">My Orders</span>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link
                  className="navbar-link"
                  to="/cart"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">Cart</span>
                </Link>
              </Nav.Item>

              <Nav.Item className="ms-md-3 mt-2 mt-md-0">
                {isLoggedIn ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      size="sm"
                      style={{
                        backgroundColor: "#0f3460",
                        borderColor: "#0f3460",
                        borderRadius: "20px",
                        padding: "6px 16px",
                      }}
                    >
                      Hi, {user?.name || "User"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      <Dropdown.Item as={Link} to="/wishlist">
                        ❤️ My Wishlist ({wishlist.length})
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/orders">
                        📦 My Orders
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                    style={{
                      backgroundColor: "#0f3460",
                      borderColor: "#0f3460",
                      borderRadius: "20px",
                      padding: "6px 16px",
                      fontWeight: "500",
                    }}
                  >
                    Login / Sign Up
                  </Button>
                )}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AuthModal
        show={showAuthModal}
        handleClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default NavBar;