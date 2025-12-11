import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import Rating from '@mui/material/Rating';
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { Button } from 'react-bootstrap';


// model for filter in small screen 
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TuneIcon from '@mui/icons-material/Tune';

// for snackbar
import Snackbar from '@mui/material/Snackbar';

const API=process.env.REACT_APP_BACKEND_URL;

// style for filter model in small screen
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Grains() {

  const {addCart}=useCart();
  const {theme}=useTheme();

   const[grains,setGrains]=useState([]);

   async function load(){
    try{
    const res=await axios.get(`${API}/api/products/grains`)
    setGrains(res.data)
    }
    catch(e){
        console.error(e)
    }
   }

   useEffect(()=>{
    load()
   },[])
       
       //model for filetr in small screen
         const [open, setOpen] = React.useState(false);
         const handleOpen = () => setOpen(true);
         const handleClose = () => setOpen(false);

         
           // for snackbar
            const [snack, setSnack] = React.useState(false);
         
           const snackClick = () => {
             setSnack(true);
           };
         
           const snackClose = (event, reason) => {
             if (reason === 'clickaway') {
               return;
             }
         
             setSnack(false);
           };
         

  return (
    <>
    
     {/* Navbar */}
       <div className='container-fluid fixed-top' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
      <NavBar/>
       
      <h3 className='mt-3'>Healthy Grains & Cereals</h3>
       <div className='container-fluid' >
      {/* Heading tag */}
      

      <div className='row ' >
        <div className='col-md-6'>
      <div className='d-flex' >
        
        <div className=' mt-2 p-2 rounded head-filter'>
           <form >
            <div className='mt-1' >
             <input type='radio'  name='poular' className='radioinput'></input>
             <label style={{marginLeft:"5px"}} for="Popular">Most Popular</label>
             
             <input style={{marginLeft:"10px"}} type='radio'   name='poular' className='radioinput'></input>
             <label style={{marginLeft:"5px"}}  for="Popular">Top Rated</label>
             </div>
           </form>
        </div>

        {/* Filter section */}
        <div className='mx-2 mt-2 p-2 rounded head-filter' >
           <form className='mt-1' >
             <input style={{marginLeft:"5px"}} type='radio'  name='poular' ></input>
             <label style={{marginLeft:"5px"}}  for="Popular">New Arrivals</label>
           </form>
        </div>
        <div className='mx-2 mt-2  p-2 rounded head-filter'>
           <form >
             <select className='form-control' >
              <option>India</option>
              <option>Japan</option>
              <option>China</option>
              <option>America</option>
             </select>
           </form>
        </div>
          <div className='mt-2 p-2 rounded filter-btn'>
            <Button variant='outline-dark' onClick={handleOpen}> <TuneIcon />Filter</Button>
        </div>

{/* model for filter */}
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className= 'mt-2 p-2 rounded head-filter'>
           <form>
            <div className='mt-1' >
             <input type='radio'  name='poular' className='radioinput'></input>
             <label style={{marginLeft:"5px"}} for="Popular">Most Popular</label>
             

             <input style={{marginLeft:"10px"}} type='radio'   name='poular' className='radioinput'></input>
             <label style={{marginLeft:"5px"}}  for="Popular">Trending</label>
             </div>
           </form>
        </div>

        <div className='mx-2 mt-2 p-2 rounded head-filter'>
           <form >
             <select className='form-control' >
              <option>India</option>
              <option>Japan</option>
              <option>China</option>
              <option>America</option>
             </select>
           </form>
        </div>

        <div >
          <h5 className='mt-3'>Categories</h5>
          <div className='ms-5'>
           <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Cereals</label>
            </div>
           <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Millets</label>
            </div>
           <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>pulses</label>
            </div>
           <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>OilSeeds</label>
            </div>
           <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Dals</label>
            </div>
          </div>
        </div>
        <h5 className='mt-2'>Brands</h5>
          <div className='ms-5'>
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Fortune</label>
            </div>
          
           
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>India Gate</label>
            </div>
          
           
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Aashirvaad</label>
            </div>
          
           
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Arrowhead Mills</label>
            </div>

          </div>

        <div>
          <h5 className='mt-2'>Price Range</h5>
          <div className='ms-5'>
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>₹0-₹50</label>
            </div>
                
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>₹51-₹150</label>
            </div>
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>₹150-₹300</label>
            </div>
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>₹300 Above</label>
            </div>
          </div>
        </div>
          
          <div className='mt-2'>
          <Button  onClick={handleClose}>Set</Button>
          <Button style={{marginLeft:"10px"}} onClick={handleClose}>Cancel</Button>
          </div>

          

          </Box>
        </Fade>
      </Modal>
    </div>

{/* end of model for filter */}

        </div>
        </div>

      </div>
      </div>
      </div>


      <div className='row' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
        <div className='col-md-3 sidebar' style={{marginTop:"170px"}}>
      <div className='container ms-1 me-1 mt-2 rounded' style={{height:"550px",width:"300px",position:"fixed",border:"solid lightgray 1px"}}>
        <div >
          <h5 className='mt-2 ms-3'>Categories</h5>
          <div >
         <div className='ms-5'>
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Cereals</label>
            </div>
          
           
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Millets</label>
            </div>
          
           
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Pulses</label>
            </div>
          
           
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>OilSeeds</label>
            </div>
          
           
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Dals</label>
            </div>
          
          
          </div>
          </div>
        </div>
        <div >
          <h5 className='mt-2 ms-3'>Brands</h5>
          <div className='ms-5'>
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Fortune</label>
            </div>
          
           
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>India Gate</label>
            </div>
          
           
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Aashirvaad</label>
            </div>
          
           
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>Arrowhead Mills</label>
            </div>

          </div>
        </div>

        <div >
          <h5 className='mt-3 ms-3'>Price Range</h5>
          <div className='ms-5'>
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>₹0-₹50</label>
            </div>
                
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>₹51-₹150</label>
            </div>
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>₹150-₹300</label>
            </div>
            <div>
              <input type='checkbox' for="tropicana" className='form-check-input border-dark'></input>
              <label for="tropicana" className='form-label mx-2 '>₹300 Above</label>
            </div>
          </div>
        </div>

       </div>
       {/* Sidebar ends */}
      </div>
      
      {/* Products - fruit display starts */}
     <div className='col-md-9 col-md-3 col-12 mt-2 topmar' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
      <div className='row gy-4 ms-1 me-1'>
        {grains.map((gr)=>(
          <div className='col-6 col-sm-4 col-md-3' key={gr._id}>
          <div className='card border-secondary w-100 h-100' style={{maxWidth:"250px"}}>
            <div className='card-header' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff",textAlign:"center"}}>
              <img src={`${API}/${gr.path}`} alt='apple' height={150} className='img-prod' width={150}></img>
            </div>
            <div className='card-body' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
              <h6>{gr.name}</h6>
              <p>{gr.description}</p>
              <Rating  name="size-small" defaultValue={gr.rating}  size="small" />
              <div className='d-flex justify-content-between  align-items-center'>
                <h6  className='mt-1 fw-bold'>₹ {gr.price}/kg</h6>
                <button className='addcart' style={{borderRadius:"25px"}} onClick={()=>{addCart(gr);snackClick()}}>Add To Cart</button>
                <Snackbar
        open={snack}
        autoHideDuration={5000}
        onClose={snackClose}
        message="View Added Products in the cart"
      />  
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

export default Grains
