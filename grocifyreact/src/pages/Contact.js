import NavBar from '../components/NavBar'
import { useTheme } from '../context/ThemeContext'
import TextField from '@mui/material/TextField';

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Button } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import * as emailjs from "emailjs-com";



function Contact() {

  const {theme}=useTheme();


  // for sending feedback

    const contactConfig = {
    YOUR_EMAIL: "sasikumar.e.04@gmail.com",
    YOUR_FONE: "7708354776",
    description: "I’m always open to discussing new opportunities, collaborations, or project ideas.You can contact me via email, LinkedIn, or GitHub, and I’ll get back to you as soon as possible. ",
    YOUR_SERVICE_ID: "service_8cxvtvc",
    YOUR_TEMPLATE_ID: "template_vsie4uw",
    YOUR_USER_ID: "lxbDotlv6uRbZlrrY",
};

  const [formData, setFormdata] = useState({
    email: "",
    name: "",
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormdata({ loading: true });

    const templateParams = {
      from_name: formData.email,
      user_name: formData.name,
      to_name: contactConfig.YOUR_EMAIL,
      message: formData.message,
    };

    emailjs
      .send(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        templateParams,
        contactConfig.YOUR_USER_ID
      )

      .then(
        (result) => {
          console.log(result.text);
          setFormdata({
            loading: false,
            alertmessage: "SUCCESS! ,Thankyou for your messege",
            variant: "success",
            show: true,
          });
        },
        (error) => {
          console.log(error.text);
          setFormdata({
            alertmessage: `Faild to send!,${error.text}`,
            variant: "danger",
            show: true,
          });
          document.getElementsByClassName("co_alert")[0].scrollIntoView();
        }
      );
  };

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className='container-fluid' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
      {/* Navbar starts
       */}
      <NavBar/>
      {/* navbar ends */}

      {/* contact header starts */}
      <div className='container mt-5'>
        <h1>Contact Us</h1>
        <p className='mt-3'>Please Feel free to contact us and we will get back to you as soon as we can </p>
      </div>
      {/* header ends */}

      <div className='container-sm mt-4' style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
           <h6 className={`${  formData.show ? "d-block" : "d-none"}`} variant={formData.variant}onClose={() => setFormdata({ show: false })}
              dismissible >{formData.alertmessage}</h6>
        <div className='row'>

          {/* feedback field starts */}
        <div className='col-md-4 feedback text-center' >
          <TextField id="standard-basic" name='name' className='mt-3 img-fluid' label="Name"  value={formData.name || ""}
                    type="text"
                    required
                    onChange={handleChange} sx={{width:"400px", "& .MuiInputLabel-root": {
      color:theme==="light"?"#222":"#fff"}   }} variant="standard" />
          
          
          <TextField id="standard-basic" name='email' className='mt-3 img-fluid' label="Email"  type="email"
                    value={formData.email || ""}
                    required
                    onChange={handleChange} sx={{width:"400px", "& .MuiInputLabel-root": {
      color:theme==="light"?"#222":"#fff"}       }} variant="standard" />
          
          
          <TextField id="standard-basic" name='message' className='mt-3 img-fluid' label="Feedback"  value={formData.message}
                onChange={handleChange}
                required sx={{width:"400px", "& .MuiInputLabel-root": {
      color:theme==="light"?"#222":"#fff"} }} variant="standard" />

          <Button className='mt-4 ' variant='contained' type='submit' onClick={handleSubmit} style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>{formData.loading ? "Sending..." : "Send"}</Button>
        </div>
        {/* feedback ends */}

        {/* center space */}
        <div className='col-md-3'>
        </div>
        {/* space ends */}

        {/* contact information starts */}
        <div className='col-md-3 mt-2'>
             
             <h5>Visit Us</h5>
             <p>Gandhipuram Coimbatore - 641012 <br></br>
              Tamil Nadu, India</p>

              <h4 className='mt-2'>Talk To US</h4>

              <p>91+ 9988776655 &nbsp;(or)&nbsp; 8811223344</p>
              <p>grocify@gmail.com</p>

              <div className='mt-4 d-flex'>
                <InstagramIcon className='ms-1'></InstagramIcon>
                <TwitterIcon className='ms-4'></TwitterIcon>
                <FacebookIcon className='ms-4'></FacebookIcon>
              </div>
        
        </div>
        {/* contact info ends */}

        </div>

        {/* accordian for help starts */}
        <div className='mt-5'>
          <h4>How Can I Help You ?</h4>

          <div  style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
            <Accordion  style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">1. Where can I track my order?</Typography>
        </AccordionSummary>
        <AccordionDetails>
         Customers want to know how to track the shipment and where to enter the tracking ID.
        </AccordionDetails>
      </Accordion>
      <Accordion  style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">2. How do I start a return or replacement?</Typography>
        </AccordionSummary>
        <AccordionDetails>Steps to initiate returns through the website/app.</AccordionDetails>
      </Accordion >
      <Accordion  style={{backgroundColor:theme==="light"?"#fff":"#333",color:theme==="light"?"#222":"#fff"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">3. My payment failed, but money was deducted. What should I do?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          this usually happens due to temporary banking or network issues. In most cases, the deducted amount is automatically refunded by your bank.
        </AccordionDetails>
      </Accordion>
          </div>
        </div>
        {/* accordian ends */}

      </div>

        {/* footer page starts */}
        <div className='container-fluid mt-5 p-4 ' style={{backgroundColor:theme==="light"?"#555":"#fffff7",color:theme==="light"?"#fff":"#222",borderRadius:"30px"}}>

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

export default Contact
