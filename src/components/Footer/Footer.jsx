import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#0f3460", color: "#fff", paddingTop: "50px", paddingBottom: "20px" }}>
        <Container>
          <Row className="footer-row">
            <Col md={3} sm={5} className='box mb-4'>
              <div className="logo d-flex align-items-center mb-3">
                  <i className="fa-solid fa-bag-shopping me-2 fs-3 text-warning"></i>
                  <h1 className="fs-3 fw-bold text-white mb-0">Multi<span className="text-warning">Shop</span></h1>
              </div>
              <p style={{ color: "#d1d5db", fontSize: "14px", lineHeight: "1.6" }}>
                Your premier e-commerce destination for high-quality furniture, modern mobile electronics, audio accessories, and lifestyle essentials with fast shipping.
              </p>
            </Col>
            <Col md={3} sm={5} className='box mb-4'>
              <h2 className="fs-5 fw-bold text-white mb-3">About Us</h2>
              <ul className="list-unstyled" style={{ color: "#d1d5db", fontSize: "14px", lineHeight: "2" }}>
                <li>Careers</li>
                <li>Our Stores</li>
                <li>Sustainability</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </Col>
            <Col md={3} sm={5} className='box mb-4'>
              <h2 className="fs-5 fw-bold text-white mb-3">Customer Care</h2>
              <ul className="list-unstyled" style={{ color: "#d1d5db", fontSize: "14px", lineHeight: "2" }}>
                <li>Help Center </li>
                <li>How to Buy </li>
                <li>Track Your Order </li>
                <li>Corporate Purchasing </li>
                <li>Returns & Refunds </li>
              </ul>
            </Col>
            <Col md={3} sm={5} className='box mb-4'>
              <h2 className="fs-5 fw-bold text-white mb-3">Contact Us</h2>
              <ul className="list-unstyled" style={{ color: "#d1d5db", fontSize: "14px", lineHeight: "2" }}>
                <li>Mohali, Punjab, India</li>
                <li>Email: poojakumari192751@gmail.com</li>
                <li>Phone: +91 98765 43210</li>
              </ul>
            </Col>
          </Row>
          <hr style={{ borderColor: "rgba(255,255,255,0.15)", margin: "20px 0" }} />
          <div className="text-center py-2" style={{ color: "#9ca3af", fontSize: "14px" }}>
            © 2026 MultiShop. Designed & Built by <strong>Pooja Kumari</strong>. All Rights Reserved.
          </div>
        </Container>
    </footer>
  )
}

export default Footer
