import React, { useCallback, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { useLoginVerify } from '../context/LoginContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

  const API=process.env.REACT_APP_BACKEND_URL;


function MyOrders() {

    const {theme}=useTheme()
   
     const [orders,setOrders]=useState([]);
     const {id,loginemail,loginuser,loginuserID}=useLoginVerify()

    
   console.log(id)

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

     useEffect(()=>{
        async function load(){
        restoreUser()

      try{
         const res=await axios.get(`${API}/api/orders/${id}`);
         setOrders(res.data);
      }
      catch(error){
        console.log({e:error.message})
      }
     }
     load()
     },[restoreUser,id])

  return (
    <>
    {/* for navbar */}
    <div className='container-fluid fixed-top' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
        <NavBar/>
    </div>

    {/* for displaying order */}
    <div className='container-fluid 'style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>

         <div className='row ms-2 '  style={{paddingTop:"100px"}}>

       <div className='col-md-2' style={{borderRadius:"5px",border:"2px dotted lightgrey",padding:"10px",position:"fixed"}}>
             <h5>Filters</h5>

        <div className='ms-4 mt-2'>       
            <div>
              <input type='checkbox' for="orders filter" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>On the Way</label>
            </div>
            
            <div>
              <input type='checkbox' for="orders filter" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Delivered</label>
            </div>
            <div>
              <input type='checkbox' for="orders filter" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Cancelled</label>
            </div>
            <div>
              <input type='checkbox' for="orders filter" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Returned</label>
            </div>
        </div>

        <div className='mt-2'>
            <h5>Order Time</h5>
            <div className='ms-4'>
                <div>
              <input type='checkbox' for="orders filter" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>On the Way</label>
            </div>
            
            <div>
              <input type='checkbox' for="orders filter" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Delivered</label>
            </div>
            <div>
              <input type='checkbox' for="orders filter" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Cancelled</label>
            </div>
            <div>
              <input type='checkbox' for="orders filter" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Returned</label>
            </div>
            </div>
        </div> 

    </div>
    {/* end of filter column */}
         <div className='row'>
          <div className='col-md-2'></div>
         {/* col for space */}

        <div className='col-md-1'></div>
        
        {/* for displaying ordered products */}
        <div className='col-md-9'>
          <h3>My Orders</h3>
          {orders.map((p)=>(
            <div className='row w-100 h-200 mt-4'key={p._id} style={{border:"dotted 1px", borderRadius:"10px"}}>
             <div className='col-md-3'>
                 <div>
                  <h6 className='pt-2'>{p.date}</h6>
                   
                   <div className='fan-wrapper ms-3 p-2'>
                  {p.items.map((item,i)=>(
                    <div key={item._id}>

                       <img className="fan-img"  src={`${API}/${item.path.replace(/\\/g, "/")}`} alt='ordered'  style={{
          left: `${i * 25}px`,
          transform: `rotate(${i * 5 - 10}deg)`
        }}></img>
                    </div>
                  ))}
                  </div>
                
                 </div>
             </div>
             
            <div className='col-md-3 mt-2' >
              <h6>List of Products Ordered</h6>
              {p.items.map((item)=>(
              <p key={item._id}>{item.name}</p>
              ))}
            </div>

             
               

             <div className='col-md-3 d-flex align-items-center'>
                <h5>Amount :{p.totalPrice}</h5>
             </div>
             <div className='col-md-3 d-flex flex-column justify-content-center'>
                <h5>{p.status}</h5>
                <p>ReferenceID :{p.referenceID}</p>
             </div>

            </div>
          ))}
            
        </div>
        </div> 
        
         </div>

    </div>
    
    </>
  )
}

export default MyOrders
