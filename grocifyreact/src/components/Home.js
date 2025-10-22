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

//card 
import chappathi from '../images/Images/chappthi.webp'
import sevenup from '../images/Images/7up.webp';
import sunfloweroil from '../images/Images/oils.webp';
import apple from '../images/Images/apple.webp';
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



const API=process.env.REACT_APP_BACKEND_URL;

function Home() {
 
  const navigate= useNavigate();
   //getting home images::
   const[image,setImage]=useState([])

   async function load(){
    try{
      const res = await axios.get(`${API}/api/products/homeimageget`);
      setImage(res.data)
    }
    catch(e){
      console.error(e);
    }
   }

   useEffect(()=>{
    load()
   },[])


   const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  }

  // for rating stars
  const [value, setValue] = React.useState(2);

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
        <IconButton onClick={() => scroll("left")} style={{height:"20px",width:"20px"}}>
          <ArrowBackIosIcon />
        </IconButton>

        {/* Scrollable Products */}
        <div ref={scrollRef}
          className="d-flex overflow-auto"
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
        <IconButton onClick={() => scroll("right")}  style={{height:"20px",width:"20px"}}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
        
         
        {/* products display ends */}

      {/* carousel starts */}
      <Carousel className="mt-4" activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <img src={caroimg1} alt="carosel " width={1500} height={300}></img>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={caroimg} alt="carosel " width={1500} height={300}></img>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={caroimg} alt="carosel "width={1500} height={300} ></img>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    {/* carousel ends */}
    {/* card starts */}
    
    <Typography className="mt-4" variant="h4">Top Selling Products</Typography>
    <div className="row mt-3">

      {/* card 1 */}
      <div className="col-12 col-sm-6 col-md-3">
        <Card sx={{ maxWidth: 345 }} style={{
          background:theme==="light"?"#fff":"#222",
    color:theme==="light"?"#222":"#fff",
        }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={apple}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Apple
        </Typography>
        <Typography variant="body2" >
          Apples are one of the most popular and healthy fruits enjoyed all over the world. They are rich in vitamins, fiber, and antioxidants, making them a perfect choice for maintaining good health.
        </Typography>
      </CardContent>
      <CardActions>
        <Rating name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue); }}/>
      </CardActions>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      </div>

      {/* card 2 */}
      <div className="col-12 col-sm-6 col-md-3">
        <Card sx={{ maxWidth: 345 }} style={{
          background:theme==="light"?"#fff":"#222",
    color:theme==="light"?"#222":"#fff",
        }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={sunfloweroil}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" >
          Sunflower Oil
        </Typography>
        <Typography variant="body2" >
          Sunflower oil is a light and healthy cooking oil extracted from sunflower seeds. It is rich in Vitamin E, healthy fats, and antioxidants, which help boost immunity and keep the heart strong
        </Typography>
      </CardContent>
      <CardActions>
        <Rating name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue); }}/>
      </CardActions>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      </div>

      {/* card 3 */}
      <div className="col-12 col-sm-6 col-md-3">
        <Card sx={{ maxWidth: 345 }}  style={{
          background:theme==="light"?"#fff":"#222",
    color:theme==="light"?"#222":"#fff",
        }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={sevenup}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          7-Up Fresh Juice
        </Typography>
        <Typography variant="body2" >
          7UP is a refreshing, lemon-lime flavored soft drink that is loved around the world for its crisp and clean taste. Free from caffeine, it offers a light and bubbly experience, making
        </Typography>
      </CardContent>
      <CardActions>
        <Rating name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue); }}/>
      </CardActions>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      </div>

      {/* card 4 */}
      <div className="col-12 col-sm-6 col-md-3">
        <Card sx={{ maxWidth: 345 }}  style={{
          background:theme==="light"?"#fff":"#222",
    color:theme==="light"?"#222":"#fff",
        }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={chappathi}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          chappathi
        </Typography>
        <Typography variant="body2">
         Chapathi, also called Roti, is a soft and healthy Indian flatbread made from whole wheat flour. It is a staple food in many households and is enjoyed with a variety of curries, vegetables.
        </Typography>
        
      </CardContent>
      <CardActions>
        <Rating name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue); }}/>
      </CardActions>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      </div>
    </div>
    </div>

  )
}

export default Home
