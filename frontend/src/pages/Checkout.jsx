import { useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const ref = useRef();
  const { cart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".checkout-box", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment feature coming soon! Pro feature.");
  };

  return (
    <div ref={ref} className="checkout">
      <form className="checkout-box" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total to pay: <strong>${total.toFixed(2)}</strong></p>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="text" placeholder="Shipping Address" required />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}
