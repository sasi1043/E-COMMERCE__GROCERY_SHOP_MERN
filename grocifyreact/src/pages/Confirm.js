import { useLocation } from "react-router-dom";
import { useLoginVerify } from '../context/LoginContext';
import { jwtDecode } from 'jwt-decode';
import { useCallback, useEffect } from "react";
import { useCart } from "../context/CartContext";
import API from "../Api";

function Confirm() {
  const query = new URLSearchParams(useLocation().search);
  const referance = query.get("referance");

  // for restoring user data

// Call useLoginVerify only ONE time
const { loginuser, loginemail, loginuserID, id } = useLoginVerify();


   //  for restoring data after refreshing
  const restoreUser = useCallback(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      loginuser(decoded.name);
      loginemail(decoded.email);
      loginuserID(decoded.id);
    } catch (error) {
      console.log("Invalid token");
    }
  }, [loginuser, loginemail, loginuserID]);


   const {clearCart,cart}=useCart()
   const {price}=useCart();

  console.log("reference",referance)
  // Always define the hook at the top level
const sendOrder = useCallback(async () => {
  console.log(id)
  if (!id || !referance || cart.length === 0) return; // handle conditions inside

    const now=new Date();
  try {
    const response = await API.post("/api/orders", {
      orderID: id,
      referenceID: referance,
      items: cart,
      status: "Payment Successful",
      date: new Date().toLocaleString(),
      totalPrice:price,
      time:now.toLocaleTimeString()
    });
    
    console.log(price);
    console.log("Order saved:", response.data);
    clearCart();
  } catch (err) {
    console.log("Error saving order:", err);
  }
}, [id, referance, cart, clearCart,price]);

// Always call useEffect at the top level
useEffect(() => {
  restoreUser()
  sendOrder();
}, [sendOrder,restoreUser]);



  return (
    <div className="d-flex container text-center justify-content-center align-items-center vh-100 ">
      <div className="paymentSuccess">
        <h3>Payment Successful</h3>
        <p>Thank you for your payment. Your transaction was successful.</p>

        {referance && (
          <p className="refID">
            <strong>Reference ID:</strong> {referance}
            
          </p>
        )}
        <h4>View your ordered products in My orders</h4>
      </div>

    </div>
  );
}

export default Confirm;
