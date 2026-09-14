import { Col, Button } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { toggleWishlist } from "../../app/features/wishlist/wishlistSlice";

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector((state) => state.wishlist);

  const isLiked = wishlist.some((item) => item.id === productItem.id);

  const handleClick = () => {
    navigate(`/shop/${productItem.id}`);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Added to cart!");
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product: productItem, num: 1 }));
    navigate("/checkout");
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(productItem));
    if (isLiked) {
      toast.info("Removed from Wishlist");
    } else {
      toast.success("Added to Wishlist!");
    }
  };

  return (
    <Col md={3} sm={6} xs={12} className="product mtop mb-4">
      <div className="product-card-wrapper border rounded-3 p-3 bg-white shadow-sm h-100 position-relative d-flex flex-column justify-content-between">
        {title === "Big Discount" || productItem.discount ? (
          <span className="discount badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1">
            {productItem.discount}% Off
          </span>
        ) : null}

        <div
          className="product-like position-absolute top-0 end-0 m-2 fs-5"
          style={{ cursor: "pointer", zIndex: 5, color: isLiked ? "#e63946" : "#6c757d" }}
          onClick={handleWishlistToggle}
        >
          <i className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
        </div>

        <div className="text-center py-2" style={{ cursor: "pointer" }} onClick={handleClick}>
          <img
            loading="lazy"
            src={productItem.imgUrl}
            alt={productItem.productName}
            style={{ maxHeight: "150px", objectFit: "contain", width: "100%" }}
          />
        </div>

        <div className="product-details mt-2">
          <h3
            onClick={handleClick}
            className="fs-6 fw-bold text-dark text-truncate mb-1"
            style={{ cursor: "pointer" }}
            title={productItem.productName}
          >
            {productItem.productName}
          </h3>

          <div className="rate text-warning mb-2" style={{ fontSize: "14px" }}>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star-half-alt"></i>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-2">
            <h4 className="fw-bold text-dark mb-0">${productItem.price}.00</h4>
            <button
              aria-label="Add to cart"
              className="add btn btn-sm btn-outline-primary rounded-circle"
              onClick={handleAdd}
              style={{ width: "32px", height: "32px", padding: 0 }}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          <Button
            size="sm"
            className="w-100 fw-bold border-0"
            style={{ backgroundColor: "#0f3460", color: "#fff" }}
            onClick={handleBuyNow}
          >
            ⚡ Buy Now
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;