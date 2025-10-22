import {  useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const API=process.env.REACT_APP_BACKEND_URL;


function Biscuit() {

    const {addCart}=useCart();  
    const {theme}=useTheme()
   
   const[biscuit,setBiscuit]=useState([]);
    
    async function load(){
        try{
            const res =await axios.get(`${API}/api/products/biscuit`);
            setBiscuit(res.data);
        }
        catch(e){
            console.error(e);
        }
    }
    
    useEffect(()=>{
        load();
    },[])

  return (
    <>
    {/* Navbar */}
       <div className='container-fluid fixed-top' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
      <NavBar/>
       
      <h3 className='mt-3'>All Your Favorite Biscuits</h3>
       <div className='container-fluid' >
      {/* Heading tag */}
      

      <div className='row' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}} >
        <div className='col-md-6'style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
      <div className='d-flex' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
        
        <div className=' mt-2 p-2 rounded'>
           <form >
            <div className='mt-1' >
             <input type='radio'  name='poular' className='radioinput'></input>
             <label style={{marginLeft:"5px"}} for="Popular">Most Popular</label>
             
             <input style={{marginLeft:"10px"}} type='radio'   name='poular' className='radioinput'></input>
             <label style={{marginLeft:"5px"}}  for="Popular">Cheapest</label>
             </div>
           </form>
        </div>

        {/* Filter section */}
        <div className='mx-2 mt-2  p-2 rounded' >
           <form className='mt-1' >
             <input style={{marginLeft:"5px"}} type='radio'  name='poular' ></input>
             <label style={{marginLeft:"5px"}}  for="Popular">Organic Farm</label>
           </form>
        </div>
        <div className='mx-2 mt-2 p-2 rounded'>
           <form >
             <select className='form-control' >
              <option>India</option>
              <option>Japan</option>
              <option>China</option>
              <option>America</option>
             </select>
           </form>
        </div>
        </div>
        </div>
        <span className='col-md-4'></span>
        <div className='col-md-2' style={{textAlign:"right"}}>
        

        {/* sideBar  with categories , brands  and rating*/}
        </div>
      </div>
      </div>
      </div>


      <div className='container-fluid row' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff",marginTop:"170px"}}>
        <div className='col-md-3 ' >
      <div className='container  mt-2 rounded' style={{height:"550px",width:"300px",position:"fixed",border:"solid lightgray 1px"}}>
        <div >
          <h5 className='mt-3 ms-3'>Categories</h5>
          <div className='ms-5'>
          <p>Plain Biscut</p>
          <p> Cream Biscut</p>
          <p> Glucose biscut</p>
          <p>Cookies</p>
          </div>
        </div>
        <div >
          <h5 className='mt-3 ms-3'>Brands</h5>
          <div className='ms-5'>
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Britania</label>
            </div>
          
           
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Sunfeast</label>
            </div>
          
           
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Parle</label>
            </div>
          
           
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Lotus Biscoff</label>
            </div>
          
           
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Milky Bikies</label>
            </div>
          
          
          </div>
        </div>

        <div >
          <h5 className='mt-3 ms-3'>Rating</h5>
          <div className='ms-5'>
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
               <Rating className='ms-2' name="size-small" defaultValue={5} size="small" /><br></br>
            </div>
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
               <Rating className='ms-2' name="size-small" defaultValue={4} size="small" /><br></br>
            </div>
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
               <Rating className='ms-2' name="size-small" defaultValue={3} size="small" /><br></br>
            </div>
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
               <Rating className='ms-2' name="size-small" defaultValue={2} size="small" /><br></br>
            </div>
                
          </div>
        </div>

       </div>
       {/* Sidebar ends */}
      </div>
      
      {/* Products - fruit display starts */}
     <div className='col-md-9 mt-2' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
      <div className='row gy-5'>
        {biscuit.map((bc)=>(
          <div className='col-12 col-sm-6 col-md-3' key={bc._id}>
          <div className='card border-secondary' style={{maxWidth:"250px"}}>
            <div className='card-header' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff",textAlign:"center"}}>
              <img src={`${API}/${bc.path}`} alt='apple' height={150} width={150}></img>
            </div>
            <div className='card-body' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
              <h6>{bc.name}</h6>
              <p>{bc.description}</p>
              <Rating  name="size-small" defaultValue={bc.rating}  size="small" />
              <div className='d-flex justify-content-between  align-items-center'>
                <h6  className='mt-1 fw-bold'>₹ {bc.price}/Pkct</h6>
                <button style={{borderRadius:"25px" }} onClick={()=>addCart(bc)}>Add To Cart</button>
              </div>
            </div>
          </div>
        </div>
        ))}
        
      </div>
     </div>

      </div>
    
    </>
  )
}

export default Biscuit
