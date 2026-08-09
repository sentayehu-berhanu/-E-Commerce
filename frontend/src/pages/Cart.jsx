import { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart } = useContext(CartContext);
  const cartRef = useRef();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cart.length > 0) {
        gsap.from(".cart-item", {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1
        });
      }
    }, cartRef);

    return () => ctx.revert();
  }, [cart]);

  return (
    <div className="cart-page" ref={cartRef}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/" style={{color: '#0071e3'}}>Go shopping!</Link></p>
      ) : (
        <>
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            </div>
          ))}

          <div className="cart-total">
            Total: ${total.toFixed(2)}
          </div>
          
          <Link to="/checkout" className="cart-checkout-btn">
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
}
