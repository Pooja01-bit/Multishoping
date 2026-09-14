import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../app/features/wishlist/wishlistSlice";
import { addToCart } from "../app/features/cart/cartSlice";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { toast } from "react-toastify";

const Wishlist = () => {
  useWindowScrollToTop();
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBuyNow = (item) => {
    dispatch(addToCart({ product: item, num: 1 }));
    dispatch(removeFromWishlist(item));
    navigate("/checkout");
  };

  return (
    <>
      <Banner title="My Wishlist" />
      <section className="wishlist-section py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <Container>
          {wishlist.length === 0 ? (
            <Card className="p-5 text-center border-0 shadow-sm rounded-3">
              <h3 className="text-muted mb-3">Your Wishlist is empty ❤️</h3>
              <p className="text-secondary">Explore our shop and save your favorite items here!</p>
              <div className="mt-3">
                <Button as={Link} to="/shop" style={{ backgroundColor: "#0f3460", border: "none" }}>
                  Explore Shop
                </Button>
              </div>
            </Card>
          ) : (
            <Row className="g-4">
              {wishlist.map((item) => (
                <Col key={item.id} md={4} sm={6} xs={12}>
                  <Card className="h-100 border-0 shadow-sm p-3 rounded-3 position-relative">
                    <div
                      className="position-absolute top-0 end-0 m-3 text-danger fs-5"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch(removeFromWishlist(item));
                        toast.info("Removed from Wishlist");
                      }}
                      title="Remove from Wishlist"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </div>

                    <div className="text-center py-2">
                      <img
                        src={item.imgUrl}
                        alt={item.productName}
                        style={{ maxHeight: "150px", objectFit: "contain", width: "100%" }}
                      />
                    </div>

                    <Card.Body className="d-flex flex-column justify-content-between p-0 mt-3">
                      <div>
                        <Card.Title className="fs-6 fw-bold text-dark text-truncate">
                          {item.productName}
                        </Card.Title>
                        <h4 className="fw-bold my-2" style={{ color: "#0f3460" }}>
                          ${item.price}.00
                        </h4>
                      </div>

                      <div className="d-flex flex-column gap-2 mt-3">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            dispatch(addToCart({ product: item, num: 1 }));
                            toast.success("Moved to Cart!");
                          }}
                        >
                          🛒 Move to Cart
                        </Button>
                        <Button
                          size="sm"
                          style={{ backgroundColor: "#0f3460", border: "none" }}
                          onClick={() => handleBuyNow(item)}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default Wishlist;
