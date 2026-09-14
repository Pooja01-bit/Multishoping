import { useState } from "react";
import { Modal, Button, Form, Tab, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../app/features/auth/authSlice";
import { toast } from "react-toastify";

const AuthModal = ({ show, handleClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password!");
      return;
    }
    const userObj = {
      name: email.split("@")[0] || "User",
      email: email,
    };
    dispatch(loginSuccess(userObj));
    toast.success("Welcome back, " + userObj.name + "!");
    handleClose();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }
    const userObj = {
      name: name,
      email: email,
    };
    dispatch(loginSuccess(userObj));
    toast.success("Account created successfully!");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#0f3460", fontWeight: "600" }}>
          Account Portal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="pills" className="justify-content-center mb-3">
            <Nav.Item>
              <Nav.Link eventKey="login" style={{ cursor: "pointer" }}>
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="register" style={{ cursor: "pointer" }}>
                Sign Up
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="login">
              <Form onSubmit={handleLoginSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100"
                  style={{ backgroundColor: "#0f3460", border: "none" }}
                >
                  Login to MultiMart
                </Button>
              </Form>
            </Tab.Pane>

            <Tab.Pane eventKey="register">
              <Form onSubmit={handleRegisterSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100"
                  style={{ backgroundColor: "#0f3460", border: "none" }}
                >
                  Create Account
                </Button>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;

