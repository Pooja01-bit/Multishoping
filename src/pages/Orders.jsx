import { Container, Card, Row, Col, Badge, Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Orders = () => {
  useWindowScrollToTop();
  const { ordersList } = useSelector((state) => state.order);

  const handlePrintInvoice = (order) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f3460; padding-bottom: 10px; }
            .title { color: #0f3460; font-size: 24px; font-weight: bold; }
            .details { margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #0f3460; color: white; }
            .total { text-align: right; margin-top: 20px; font-size: 18px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">MultiMart Invoice</div>
            <div>Order ID: ${order.id}</div>
          </div>
          <div class="details">
            <p><strong>Date:</strong> ${order.createdAt}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Shipping Address:</strong> ${order.shippingAddress}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                  (item) => `
                <tr>
                  <td>${item.productName}</td>
                  <td>${item.qty}</td>
                  <td>Rs. ${item.price}.00</td>
                  <td>Rs. ${item.price * item.qty}.00</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <div class="total">Total Paid: Rs. ${order.totalAmount}.00</div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <>
      <Banner title="My Orders" />
      <section className="py-5">
        <Container>
          {ordersList.length === 0 ? (
            <Card className="p-5 text-center border-0 shadow-sm rounded-3">
              <h4>No orders found</h4>
              <p className="text-muted">You haven't placed any orders yet.</p>
              <div className="mt-3">
                <Button as={Link} to="/shop" style={{ backgroundColor: "#0f3460", border: "none" }}>
                  Start Shopping
                </Button>
              </div>
            </Card>
          ) : (
            ordersList.map((order) => (
              <Card key={order.id} className="p-4 border-0 shadow-sm rounded-3 mb-4">
                <Row className="align-items-center mb-3">
                  <Col md={6}>
                    <h5 style={{ color: "#0f3460" }} className="fw-bold mb-1">
                      Order #{order.id}
                    </h5>
                    <small className="text-muted">Placed on {order.createdAt}</small>
                  </Col>
                  <Col md={6} className="text-md-end mt-2 mt-md-0">
                    <Badge
                      bg={
                        order.status === "Delivered"
                          ? "success"
                          : order.status === "Shipped"
                          ? "info"
                          : "warning"
                      }
                      className="px-3 py-2 me-2"
                    >
                      {order.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => handlePrintInvoice(order)}
                    >
                      📄 Invoice
                    </Button>
                  </Col>
                </Row>
                <hr />
                <Table responsive borderless className="align-middle mb-0">
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ width: "60px" }}>
                          <img
                            src={item.imgUrl}
                            alt={item.productName}
                            style={{ width: "45px", height: "45px", objectFit: "contain" }}
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
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    Payment: <strong>{order.paymentMethod}</strong>
                  </small>
                  <div className="h5 fw-bold mb-0" style={{ color: "#0f3460" }}>
                    Total: Rs. {order.totalAmount}.00
                  </div>
                </div>
              </Card>
            ))
          )}
        </Container>
      </section>
    </>
  );
};

export default Orders;