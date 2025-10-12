import { useLocation } from "react-router-dom"
function Confirm() {

  const query=new URLSearchParams(useLocation().search);
  const referance=query.get("referance")

  return (
     <div className="d-flex container text-center justify-content-center align-items-center vh-100 ">
      <div className="paymentSuccess">
      <h3>Payment Successful</h3>
      <p>Thank you for Your Payment . Your transaction was Successful</p>
      {referance && (
        <p className="refID">
            <strong>Reference ID:</strong>{referance}
        </p>
      )}
      </div>
    </div>
  )
}

export default Confirm
