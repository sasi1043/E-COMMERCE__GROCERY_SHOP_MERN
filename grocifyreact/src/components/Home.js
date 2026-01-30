import * as React from 'react';

import { useRef } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Typography } from "@mui/material"
//carousel 
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import caroimg from '../images/Images/caros3.webp';
import caroimg1 from '../images/Images/caros5.webp';
import caros4 from '../images/Images/caros 4.webp';
//card 

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { useTheme } from '../context/ThemeContext';
import NavBar from './NavBar';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';



const API=process.env.REACT_APP_BACKEND_URL;

function Home() {

 
  const navigate= useNavigate();
   //getting home images::
   const[image,setImage]=useState([]);
   const[topsell,setTopsell]=useState([]);
   const[discount,setDiscount]=useState([]);

   

   async function load(){
    try{
      const res = await axios.get(`${API}/api/products/homeimageget`);
      const res1=await axios.get(`${API}/api/topselling`);
      const res2=await axios.get(`${API}/api/discount`);
      setDiscount(res2.data);
      setTopsell(res1.data);
      setImage(res.data);
    }
    catch(e){
      console.error(e);
    }
   }

   useEffect(()=>{
    load();
    localStorage.removeItem("token");
   })


   const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  }

  const {theme}=useTheme();

  //scroll bar
   const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200, // adjust step size
        behavior: "smooth",
      });
    }
  };

  //navigation to pages
  const navigation=(name)=>{
    if(name==="Fruits"){
        navigate('/fruits')
    }
    if(name==="Grains"){
      navigate('/grains')
    }
    if(name==="Dairy"){
      navigate('/Dairy')
    }
    if(name==="Frozen"){
      navigate('/frozen')
    }
    if(name==="Beverages"){
      navigate('/beverages')
    }
    if(name==="Healthcare"){
      navigate('/healthcare')
    }
    if(name==="Masala"){
      navigate('/masala')
    }
    if(name==="Chocolates"){
      navigate('/choco')
    }
    if(name==="Biscuts"){
      navigate('/biscut')
    }
    if(name==="Stationaries"){
      navigate('/stationary')
    }
  }



  return (
      <div className="container-fluid" style={{backgroundColor:theme==="light"?"#fff":"#222",color:theme==="light"?"#222":"#fff"}}>
         <NavBar/>
      {/* products display */}
     <div className="d-flex align-items-center" style={{paddingTop:"35px"}}>
        {/* Left Arrow */}
        <IconButton className='arrow-home' onClick={() => scroll("left")} style={{height:"20px",width:"20px"}}>
          <ArrowBackIosIcon />
        </IconButton>

        {/* Scrollable Products */}
        <div ref={scrollRef}
          className="d-flex overflow-auto ms-2"
          style={{ scrollbarWidth: "none", height: "140px", flex: 1 }}
        >
          
          {image.map((img)=>(
            <div  style={{ marginLeft: "20px",marginRight:"20px"}} key={img._id}>
            <img src={`${API}/images/Homeimagess/${img.filename}`} className='homeproducts' alt="fruits" height="90px" width="90px" style={{ margin: "5px", borderRadius: "20px"}} onClick={()=>navigation(img.name)}/>
            <Typography variant="h6" style={{ marginLeft: "10px" }}>{img.name}</Typography>
          </div>
          ))}
          
       
        </div>

        {/* Right Arrow */}
        <IconButton className='arrow-home' onClick={() => scroll("right")}  style={{height:"20px",width:"20px"}}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
        
         
        {/* products display ends */}

      {/* carousel starts */}
      <div className='img-fluid'>
      <Carousel className="mt-4" activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <img src={caroimg1} alt="carosel " className='caros-img'></img>
        <Carousel.Caption>
          <h3>Fresh Daily Essentials</h3>
          <p>Handpicked fruits, vegetables, and groceries delivered fresh every day.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={caroimg} alt="carosel " className='caros-img'></img>
        <Carousel.Caption>
          <h3>Black Friday Mega Deals</h3>
          <p>Unbeatable discounts on groceries and daily essentials—today only!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={caros4} alt="carosel " className='caros-img' ></img>
        <Carousel.Caption>
          <h3>Flat 50% OFF</h3>
          <p>Enjoy half-price savings on selected groceries and essentials.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    {/* carousel ends */}
    {/* card starts */}
    
    <Typography className="mt-4" variant="h4">Top Selling Products</Typography>
    <div className="row mt-3">
      {/* card 1 */}
        {topsell.slice(0,4).map((p)=>(
          <div className="col-6 col-sm-4 col-md-3" key={p._id}>
          <Card sx={{ maxWidth: 345 }} style={{
          background:theme==="light"?"#fff":"#222",
    color:theme==="light"?"#222":"#fff",
        }}
        >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={`${API}/${p.path}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {p.name}
        </Typography>
        <Typography variant="body2" >
             {p.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Rating name="simple-controlled" value={p.rating}/>
      </CardActions>
      <CardActions>
        <Button size="small" onClick={()=>navigate('/TopSelling')}>View More</Button>
      </CardActions>
    </Card>
    </div>
))}
 </div>


{/* for discount products */}
    <Typography className="mt-4" variant="h4">Products With Offers</Typography>
    <div className="row mt-4">
      {/* card 1 */}
        {discount.slice(0,4).map((p)=>(
          <div className="col-6 col-sm-4 col-md-3" key={p._id}>
          <Card sx={{ maxWidth: 345 }} style={{
          background:theme==="light"?"#fff":"#222",
    color:theme==="light"?"#222":"#fff",
        }}
        >
      <CardMedia
        component="img"
        alt="green iguana"
        height="210"
        image={`${API}/${p.path}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {p.name}
        </Typography>
        <Typography variant="body2" >
             {p.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Rating name="simple-controlled" value={p.rating}/>
      </CardActions>
      <CardActions>
        <Button size="small" onClick={()=>navigate('/discount')}>View More</Button>
      </CardActions>
    </Card>
    </div>
))}
    </div>



    {/* footer page starts */}
        <div className=' mt-5 p-4 ' style={{backgroundColor:theme==="light"?"#555":"#fffff7",color:theme==="light"?"#fff":"#222",borderTopLeftRadius:"30px",borderTopRightRadius:"30px"}}>

          {/* 1st row starts */}
          <div className='row'>
             
              <div className='col-md-3'>
                <h4>Grocify</h4>
                <p className='mt-4'>Fresh groceries delivered to your doorstep—quick, easy, and affordable.</p>
              </div>

              <div className='col-md-2'>
                <h5>Quick Links</h5>
                <ul>
                  <li>Home</li>
                  <li>Products</li>
                  <li>Contact Us</li>
                  <li>Login</li>
                </ul>
              </div>

              <div className='col-md-4'>
                <h5>Customer Support</h5>
                <ul>
                  <li>Email: grocify@gmail.com</li>
                  <li>Phone :  9988776655 </li>
                  <li>Working Hours : Mon-sat,9:00 AM to 10:00 PM</li>
                </ul>
              </div>

              <div className='col-md-3'>
                <h5>Folow Us On</h5>
                <ul>
                  <li><InstagramIcon></InstagramIcon> Instagram</li>
                  <li><YouTubeIcon></YouTubeIcon> Youtube </li>
                  <li><FacebookIcon></FacebookIcon> FaceBook</li>
                  <li><LinkedInIcon></LinkedInIcon> Linkedin</li>
                </ul>
              </div>

          </div>
          {/* 1st row ends */}

          {/* 2nd row starts */}
          <div className='row mt-2'>
            
            {/* column starts */}
            <div className='col-md-3'>
              {/* for space at initial */}
            </div>

            <div className='col-md-3'>
              <h5>Payment Methods</h5>
              <ul>
                <li>Credit/Debit Cards</li>
                <li>UPI</li>
                <li>Net Banking</li>
                <li>Wallets</li>
                <li>Cash On Delivery (COD)</li>
              </ul>
            </div>

            <div className='col-md-3'>
              <h5>Address</h5>
              <p>Gandhipuram Coimbatore - 641012<br></br>
              Tamil Nadu, India</p>
            </div>

          </div>
          {/* 2nd row ends */}

          <div className='text-center'>
              <p>© 2025 Grocify. All rights reserved.</p>
        </div>

        </div>
        {/* footer page ends */}
    </div>

  )
}

export default Home
