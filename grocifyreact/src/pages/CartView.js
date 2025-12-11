import { useCart } from '../context/CartContext'
import NavBar from '../components/NavBar';
import Rating from '@mui/material/Rating';
import { Button, FormControl } from 'react-bootstrap';
import { useState,useEffect, useCallback} from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { useLoginVerify } from '../context/LoginContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const API=process.env.REACT_APP_BACKEND_URL;


function CartView() {
  const {theme} =useTheme();
    const {cart,removeCart} =useCart();
    const{mobile,user,email}=useLoginVerify() || {};
    const navigate=useNavigate();
    // Store quantities for each item
 const [counts, setCounts] = useState(() => {
    const savedCounts = localStorage.getItem("cartCounts");
    return savedCounts ? JSON.parse(savedCounts) : {};
  });

  // Sync counts with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartCounts", JSON.stringify(counts));
  }, [counts]);

  // Initialize counts when cart changes
  useEffect(() => {
    setCounts(prevCounts => {
      const updatedCounts = { ...prevCounts };
      cart.forEach(item => {
        if (!updatedCounts[item._id]) {
          updatedCounts[item._id] = 1; // default quantity
        }
      });
      return updatedCounts;
    });
  }, [cart]);

  // Increase count
  const increase = (id) => {
    setCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  };

  // Decrease count
  const decrease = (id) => {
    setCounts(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1) // don’t go below 1
    }));
  };

   // Calculate total
// Calculate total including increased quantities
const totalPrice = cart.reduce((total, item) => {
  const qty = counts[item._id] || 1; // Quantity

  // Apply discount if exists, else original price
  const finalPrice = item.discount
    ? Number(item.price) * (1 - item.discount / 100)
    : Number(item.price);

  return total + finalPrice * qty;
}, 0);

// for restoring user data

  const { loginuser, loginemail, loginuserID } = useLoginVerify();

  //  for restoring data after refreshing
  const restoreUser = useCallback(() => {
    const token = localStorage.getItem("token");
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

  // useEffect now has NO missing dependencies
  useEffect(() => {
    restoreUser();
  }, [restoreUser]);

  const {storeprice}=useCart();


//buy now page navigation after clicking buy now button::

   const buynowBut=async(amount,user,email,mobile)=>{
     // for getting razorpay api key
     storeprice(amount)
    
    const{data}=await axios.get(`${API}/getkey`);
    const key=data.key;

    //posting amount
    const {data:orderData}=await axios.post(`${API}/paymentprocess`,{amount})
    
    const {order}=orderData;
    console.log(order);
    //for open razorpay for payment process

    const options={
      key,
      amount,
      currency:"INR",
      name:user,
      description:'Payment React App',
      order_id:order.id,
      callback_url:`${API}/api/paymentVerification`,
      prefill:{
        name:user,
        email,
        contact:mobile,
      },
      theme:{
        color:'#222'
      },
    };
    const rzp=new window.Razorpay(options);
    rzp.open();
  }

  return (
    <>
     <div className='container-fluid fixed-top'  style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
      <NavBar/>
       
      <h3 className='mt-3 ms-3'>My Cart</h3>
       <div className='container-fluid' >
      {/* Heading tag */}
      

      <div className='row'  style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}} >
        <div className='col-md-6'>
      <div className='d-flex' >
        
        <div className=' mt-2 p-2 rounded'  style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
           <form >
            <div className='mt-1' >
             <input type='radio'  name='poular' className='radioinput'></input>
             <label style={{marginLeft:"5px"}} for="Popular">Delivered</label>
             
             <input style={{marginLeft:"20px"}} type='radio'   name='poular' className='radioinput'></input>
             <label style={{marginLeft:"5px"}}  for="Popular">OnGoing</label>
             
             <input style={{marginLeft:"20px"}} type='radio'   name='poular' className='radioinput'></input>
             <label style={{marginLeft:"5px"}}  for="Popular">Cancelled</label>
             </div>
           </form>
        </div>

        
        
        </div>
        </div>
        <span className='col-md-4'></span>
      </div>
      </div>
      </div>


    {cart.length===0?(
      <div className='d-flex justify-content-center align-items-center vh-100' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
        <div className='container d-flex justify-content-center mt-1 ' style={{maxWidth:"400px",borderRadius:"20px",fontSize:"30px"}}>
          <p className='mt-2'>Your cart is empty</p>
        </div>
        
      </div>
    ):(
      <div className='container-fluid row ms-0 w-100 h-100' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff",marginTop:"120px",marginBottom:"90px"}}>
            <div className='row gy-5' style={{paddingBottom:"130px"}}>
              {cart.map((item)=>(
                <div className='col-12 col-sm-6 col-md-3 pb-4'  key={item._id}>
                <div className='card border-secondary w-100 h-100'>
                  <div className='card-header' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff",textAlign:"center"}}>
                    <img src={`${API}/${item.path}`} alt='apple' height={150} width={150}></img>
                  </div>
                  <div className='card-body' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
                    <h6>{item.name}</h6>
                    <p>{item.description}</p>
                    <div className='d-flex justify-content-between align-items-center'>
                    <Rating  name="size-small" defaultValue={item.rating}  size="small" />
                    <h6 className='mt-1 fw-bold'>₹{
                         counts[item._id] *
                              (
                          item.discount ? Number(item.price) * (1 - item.discount / 100): Number(item.price))}</h6>
                    </div>
                    <div className='d-flex justify-content-between  align-items-center mt-1'>
                      <button type='button' style={{fontSize:"15px",borderRadius:"80px"}}  onClick={() => decrease(item._id)}>-</button>
                      <FormControl style={{maxWidth:"50px",height:"30px"}} value={counts[item._id] || 1}
                        readOnly></FormControl>
                      <button type='button' style={{borderRadius:"50px"}} onClick={() => increase(item._id)}>+</button>
                      <button style={{borderRadius:"25px"}} onClick={()=>removeCart(item._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
              ))} 
            </div>
           </div>
    )}
      <div className='container-fluid d-flex justify-content-between align-items-center fixed-bottom ' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
        
        <div className='justify-content-between' >
          <h4>Total Price 
            <IconButton>
            <ArrowRightAltIcon></ArrowRightAltIcon>
          </IconButton>
          </h4>
          <h5>Click Buy Now button to place Order 
          <IconButton>
            <ArrowRightAltIcon></ArrowRightAltIcon>
          </IconButton>
         </h5>
        </div>
     
        <div >
        <h4 className='ms-1 mb-3'>₹{totalPrice}</h4>
         <Button variant='contained bg-dark text-white me-5 mb-1' onClick={()=>{
          if(user){
            (buynowBut(totalPrice,user,email,mobile))
          }
          else{
            alert("please login to continue");
            navigate('/login');
          }
   
          }}>Buy Now</Button>
         </div>

      </div>
    </>
  )
}

export default CartView
