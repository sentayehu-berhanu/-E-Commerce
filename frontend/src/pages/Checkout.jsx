import { useEffect, useRef, useContext, useState } from "react";
import gsap from "gsap";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

export default function Checkout() {
  const ref = useRef();
  const { cart, clearCart } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 0; // Free Postage
  const total = subtotal + delivery;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".checkout-container", {
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
    if (!termsAccepted) {
      alert("Please agree to the Terms and Conditions to continue.");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Save order stats to localStorage for the Admin Dashboard
      const currentSales = parseFloat(localStorage.getItem("totalSales") || "0");
      const currentOrders = parseInt(localStorage.getItem("totalOrders") || "0", 10);
      localStorage.setItem("totalSales", (currentSales + total).toString());
      localStorage.setItem("totalOrders", (currentOrders + 1).toString());

      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div ref={ref} className="checkout-page">
        <div className="checkout-left" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '600px' }}>
          <h2 style={{ color: '#28a745', marginBottom: '20px', justifyContent: 'center' }}>Order Successful!</h2>
          <p>Thank you for your purchase.</p>
          <p style={{ color: '#86868b', marginBottom: '30px' }}>Your order is being processed and you will receive an email confirmation shortly.</p>
          <Link to="/" className="checkout-btn" style={{
            display: 'inline-block',
            textDecoration: 'none',
            maxWidth: '300px'
          }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="checkout-page">
      <h1>Checkout</h1>
      <form className="checkout-container" onSubmit={handleSubmit}>
        
        {/* Left Column: Delivery Details */}
        <div className="checkout-left">
          <h2>1 DELIVERY DETAILS</h2>
          <div className="checkout-form">
            <div className="row">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
            </div>
            <input type="text" placeholder="Address Line 1" required />
            <input type="text" placeholder="Address Line 2 (optional)" />
            <input type="text" placeholder="Address Line 3 (optional)" />
            <div className="row">
              <input type="text" placeholder="City/Town" required />
              <select required defaultValue="">
                <option value="" disabled>Select Country</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="row">
              <input type="text" placeholder="County, Region" required />
              <input type="text" placeholder="Postal/Zip Code" required />
            </div>
            <input type="tel" placeholder="Phone Number (optional)" />
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="checkout-right">
          <h2>SUMMARY <span style={{fontSize: '0.8rem', color: '#1d1d1f', cursor: 'pointer', textDecoration: 'underline'}}>EDIT BASKET</span></h2>
          
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="summary-item-details">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div style={{fontWeight: 500}}>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span style={{display: 'flex', flexDirection: 'column'}}>
                Delivery
                <span style={{fontSize: '0.8rem', color: '#86868b'}}>(Free Postage)</span>
              </span>
              <span>${delivery.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Order Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <label className="terms-box">
            <input 
              type="checkbox" 
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            I agree to the Terms and Conditions
          </label>

          <button type="submit" className="checkout-btn" disabled={!termsAccepted || isProcessing}>
            {isProcessing ? 'PROCESSING...' : 'PLACE ORDER'}
          </button>

          <p style={{textAlign: 'center', fontSize: '0.85rem', color: '#86868b', marginTop: '20px', cursor: 'pointer'}}>
            Have a discount code?
          </p>
        </div>

      </form>
    </div>
  );
}
