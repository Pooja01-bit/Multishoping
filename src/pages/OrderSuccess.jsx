import { useLocation, Link } from "react-router-dom";
import { Container, Card, Row, Col, Button, Table } from "react-bootstrap";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const OrderSuccess = () => {
  useWindowScrollToTop();
  const location = useLocation();
  const order = location.state?.order;

  return (
    <>
      <Banner title="Order Confirmation" />
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="p-4 text-center border-0 shadow-sm rounded-3 mb-4">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-success text-white rounded-circle"
                  style={{ width: "70px", height: "70px", fontSize: "32px" }}
                >
                  ?
                </div>
                <h2 style={{ color: "#0f3460" }} className="fw-bold">
                  Thank You For Your Order!
                </h2>
                <p className="text-muted">
                  Your order has been placed and is currently being processed.
                </p>

                {order && (
                  <div className="bg-light p-3 rounded-3 text-start my-3">
                    <Row>
                      <Col sm={6} className="mb-2">
                        <strong>Order Number:</strong> {order.id}
                      </Col>
                      <Col sm={6} className="mb-2">
                        <strong>Order Date:</strong> {order.createdAt}
                      </Col>
                      <Col sm={6} className="mb-2">
                        <strong>Payment Method:</strong> {order.paymentMethod}
                      </Col>
                      <Col sm={6} className="mb-2">
                        <strong>Status:</strong>{" "}
                        <span className="badge bg-warning text-dark">
                          {order.status}
                        </span>
                      </Col>
                      <Col sm={12}>
                        <strong>Shipping Address:</strong> {order.shippingAddress}
                      </Col>
                    </Row>
                  </div>
                )}

                {order?.items && (
                  <Table responsive borderless className="align-middle text-start my-3">
                    <thead className="table-light">
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th className="text-end">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.productName}</td>
                          <td>{item.qty}</td>
                          <td className="text-end">${item.price * item.qty}.00</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}

                <div className="d-flex justify-content-center gap-3 mt-4">
                  <Button
                    as={Link}
                    to="/orders"
                    style={{ backgroundColor: "#0f3460", border: "none" }}
                  >
                    View My Orders
                  </Button>
                  <Button as={Link} to="/shop" variant="outline-dark">
                    Continue Shopping
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default OrderSuccess;

