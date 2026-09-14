import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { submitOrder } from "../services/api";
import { addOrder } from "../app/features/order/orderSlice";
import { deleteProduct } from "../app/features/cart/cartSlice";
import { toast } from "react-toastify";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Checkout = () => {
  useWindowScrollToTop();
  const { cartList } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "UPI",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = cartList.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartList.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      toast.error("Please fill in all shipping details!");
      return;
    }

    setIsSubmitting(true);
    try {
      const newOrder = await submitOrder({
        shippingAddress: `${formData.address}, ${formData.city} - ${formData.pincode}`,
        phone: formData.phone,
        paymentMethod: formData.paymentMethod,
        totalAmount: totalAmount,
        items: cartList,
      });

      dispatch(addOrder(newOrder));
      // Clear cart items
      cartList.forEach((item) => dispatch(deleteProduct(item)));

      toast.success("Order Placed Successfully!");
      navigate("/order-success", { state: { order: newOrder } });
    } catch (err) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Banner title="Checkout" />
      <section className="checkout-section py-5">
        <Container>
          <Row>
            <Col lg={7} className="mb-4">
              <Card className="p-4 border-0 shadow-sm rounded-3">
                <h4 style={{ color: "#0f3460" }} className="mb-4">
                  1. Shipping Information
                </h4>
                <Form onSubmit={handlePlaceOrder}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter full name"
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label>Phone Number *</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter phone number"
                      />
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="name@example.com"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Street Address *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="House No, Street, Locality"
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label>City / Town *</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter City"
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label>Pincode *</Form.Label>
                      <Form.Control
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter 6-digit Pincode"
                      />
                    </Col>
                  </Row>

                  <h4 style={{ color: "#0f3460" }} className="mt-4 mb-3">
                    2. Payment Method
                  </h4>
                  <Form.Group className="mb-4">
                    <Form.Check
                      type="radio"
                      id="upi"
                      label="UPI / GPay / PhonePe"
                      name="paymentMethod"
                      value="UPI"
                      checked={formData.paymentMethod === "UPI"}
                      onChange={handleInputChange}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      id="card"
                      label="Credit / Debit Card"
                      name="paymentMethod"
                      value="Credit / Debit Card"
                      checked={formData.paymentMethod === "Credit / Debit Card"}
                      onChange={handleInputChange}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      id="cod"
                      label="Cash on Delivery (COD)"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={formData.paymentMethod === "Cash on Delivery"}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    disabled={isSubmitting || cartList.length === 0}
                    className="w-100 py-2 fw-bold"
                    style={{ backgroundColor: "#0f3460", border: "none" }}
                  >
                    {isSubmitting ? "Processing Order..." : `Confirm & Pay Rs. ${totalAmount}.00`}
                  </Button>
                </Form>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="p-4 border-0 shadow-sm rounded-3">
                <h4 style={{ color: "#0f3460" }} className="mb-3">
                  Order Summary
                </h4>
                <Table responsive borderless className="align-middle">
                  <tbody>
                    {cartList.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={item.imgUrl}
                            alt={item.productName}
                            style={{ width: "50px", height: "50px", objectFit: "contain" }}
                          />
                        </td>
                        <td>
                          <div className="fw-semibold">{item.productName}</div>
                          <small className="text-muted">Qty: {item.qty}</small>
                        </td>
                        <td className="text-end fw-bold">
                          Rs. {item.price * item.qty}.00
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span className="fw-bold">Rs. {totalAmount}.00</span>
                </div>
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Shipping Fee:</span>
                  <span className="fw-bold">FREE</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between h5 text-dark fw-bold">
                  <span>Total Payable:</span>
                  <span style={{ color: "#0f3460" }}>Rs. {totalAmount}.00</span>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Checkout;

