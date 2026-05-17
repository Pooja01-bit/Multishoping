import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../app/features/wishlist/wishlistSlice";
import { addToCart } from "../app/features/cart/cartSlice";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <section className="wishlist-items">
      <div className="container">
        {wishlist.length === 0 && (
          <h1 className="no-items">No items in Wishlist</h1>
        )}

        {wishlist.map((item) => (
          <div className="wishlist-card" key={item.id}>
            <div className="wishlist-img">
              <img src={item.imgUrl} alt={item.productName} />
            </div>

            <div className="wishlist-details">
              <h3>{item.productName}</h3>
              <h4>${item.price}.00</h4>

              <div className="wishlist-actions">
                <button
                  className="btn-move"
                  onClick={() => {
                    dispatch(addToCart({ product: item, num: 1 }));
                    dispatch(removeFromWishlist(item));
                  }}
                >
                  Move to Cart
                </button>

                <button
                  className="btn-remove"
                  onClick={() => dispatch(removeFromWishlist(item))}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Wishlist;
