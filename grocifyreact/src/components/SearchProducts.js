import { useCart } from '../context/CartContext'
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import { useTheme } from '../context/ThemeContext';
import Rating from '@mui/material/Rating';


const API=process.env.REACT_APP_BACKEND_URL;

const SearchProducts = () => {

  const {state}=useLocation();
  const {result =[]}=state || {};
  console.log({result})
   const {addCart} =useCart();

   const {theme} = useTheme();

  return (
    <div style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff",width:"100vw",height:"100vh"}}>
      {/* Navbar */}
       <div className='container-fluid fixed-top' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
      <NavBar/>
       
      <h3 className='mt-3' >Healthy Dairy Products</h3>
       <div className='container-fluid' >
      {/* Heading tag */}
      

      <div className='row' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
        <div className='col-md-6' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
      <div className='d-flex' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
        
        <div className=' mt-2  p-2 rounded'>
           <form >
            <div className='mt-1' >
             <input type='radio'  name='poular' className='radioinput'></input>
             <label style={{marginLeft:"5px",marginRight:"10px"}} for="Popular">Most Popular</label>

             <input type='radio'  name='poular' className='radioinput'></input>
             <label style={{marginLeft:"10px"}} for="Popular">Trending</label>
             </div>
           </form>
        </div>

        {/* Filter section */}
        <div className='mx-2 mt-2  p-2 rounded' >
           <form className='mt-1' >
             <input style={{marginLeft:"5px"}} type='radio'  name='poular' ></input>
             <label style={{marginLeft:"5px"}}  for="Popular">Cool Drinks</label>
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


      <div className='container-fluid row ' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff",marginTop:"170px"}}>
             
            
            {/* Products - fruit display starts */}
           <div className='col-md-9 mt-2' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
            <div className='row gy-5'>
              {result.map((k)=>(
                <div className='col-12 col-sm-6 col-md-4' key={k._id}>
                <div className='card border-secondary' style={{maxWidth:"250px"}}>
                  <div className='card-header' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff",textAlign:"center"}} >
                    <img src={`${API}/${k.path}`} alt='apple' height={150} width={150}></img>
                  </div>
                  <div className='card-body' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
                    <h6>{k.name}</h6>
                    <p>{k.description}</p>
                    <Rating  name="size-small" defaultValue={k.rating}  size="small" />
                    <div className='d-flex justify-content-between  align-items-center' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
                      <h6  className='mt-1 fw-bold'>₹ {k.price}/{k.measure}</h6>
                      <button style={{borderRadius:"25px" }} onClick={()=>addCart(k)}>Add To Cart</button>
                    </div>
                  </div>
                </div>
              </div>
              ))}
              
            </div>
           </div>
      
            </div>




      
    </div>
  )
}

export default SearchProducts

