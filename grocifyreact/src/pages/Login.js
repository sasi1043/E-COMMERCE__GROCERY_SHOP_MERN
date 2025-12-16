import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography } from '@mui/material';
import Form from 'react-bootstrap/Form';
import {jwtDecode} from 'jwt-decode'

//register model starts
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

//form
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';
import API from '../Api';
import { useLoginVerify } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

//register model
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

function Login() {
  // for register model
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //for register user
  const[data,setData]=useState({name:"",email:"",mobile:"",password:""})
  const[error,setError]=useState("")

 const registerhandlechange=(e)=>{
  setData((prev)=>({...prev,[e.target.name]:e.target.value}));
 }


 //logiinContext
 const {loginuser,loginemail,loginmobile,loginuserID}=useLoginVerify() || {};

 const registerhandlesubmit=async(e)=>{
   e.preventDefault();

   setError('')
   try{
    await API.post('/api/register',data);
    handleClose();
   }
   catch(err){
    const msg=err?.response?.data || err?.response?.message || 'signup failed'
    setError(typeof msg ==='string'?msg:'signup failed')  
   }
 }
 //register a user ends

 const navigate=useNavigate();

 //login user
 const [login,setLogin]=useState({email:"",password:""})

 const loginhandlechange=(e)=>{
  setLogin((prev)=>({...prev,[e.target.name]:e.target.value}));
 }

  // function after clicking login button
 const loginbutton=async(e)=>{
  e.preventDefault();
  setError('');
  try {
    const{data:res}=await API.post('/api/login',login)
    localStorage.setItem("token",res.token);
  console.log(res.token)
     const decode=jwtDecode(res.token)

    loginuser(decode.name)
    loginemail(decode.email);
    loginmobile(decode.mobile);
    loginuserID(decode.id);
    navigate('/');
    console.log(decode)
  } catch (error) {
    const msg=error?.response?.data || error?.response?.message ||'sign in failed'
    setError(typeof msg==='string'?msg:'sign in failed')
  }
 }

 
    return (

      // login welcome division
    <div className='contaiter mt-5'>
        {/* login divisions start */}
       <div className='row'>
       <div className='col-md-3'></div>
        
      <div className='col-md-3 justify-content-center' style={{height:error?"650px":"600px",backgroundColor:'black'}}>
       <p  style={{alignItems:'center',color:'white',fontSize:'40px',marginTop:'30%',fontWeight:'bolder'}}>
       "Good to see you again...!<br></br>The future of groceries begins with your login</p>
      </div>

      {/* login division */}
      <div className='col-md-3' style={{height:error?"650px":"600px",border:'2px groove black'}}>
        <Typography variant='h4' style={{fontWeight:'bolder',marginTop:'20%'}}>Login</Typography>
        <div style={{marginTop:'15%'}}>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={loginbutton}>
        <Form.Control name='email'  style={{border:'1px solid black'}} size="md" type='email' placeholder="Enter your email" onChange={loginhandlechange} required/>
      <br />
      <Form.Control name='password' style={{marginTop:'5%',border:'1px solid black'}} type='password' placeholder="Enter your password"  onChange={loginhandlechange} required/>
      <br />
      <hr></hr>
      <p>Forgot Password?</p>

      <center>
      <Button type='submit' variant="contained" style={{backgroundColor:'black'}} onClick={loginbutton}>Login</Button>
      
      <br></br>
      or
      <br></br>
      <Button className='mt-2' variant="contained" style={{backgroundColor:'black'}} onClick={handleOpen}>Sign Up</Button>
      </center>
      </Form>
      
      </div>
        
      </div>
      <div className='col-md-3'></div>
      </div>
      {/* login divisions ends */}

      {/*register model starts */}

       <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h4" component="h2">
            REGISTER
          </Typography>
          {error && <div className='alert alert-danger'>{error}</div>}
          <hr></hr>
          {/* register form */}
          <Form  >
            <FloatingLabel
            
        controlId="floatingInput"
        label="name"
        className="mb-3"
      >
        <Form.Control name='name' style={{border:'1px solid black'}} type="text" placeholder="Enter your name" onChange={registerhandlechange} required/>
      </FloatingLabel>
       
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check 
          
            inline
            label="Male"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />
          <Form.Check
          
            inline
            label="Female"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
          />
          
        </div>
      ))}


      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control name='email' style={{border:'1px solid black'}} type="email" placeholder="name@example.com" onChange={registerhandlechange} required/>
      </FloatingLabel>


      <FloatingLabel
        controlId="floatingInput"
        label="Mobile Number"
        className="mb-3"
      >
        <Form.Control name='mobile' style={{border:'1px solid black'}} type="tel" placeholder="Mobile number" onChange={registerhandlechange}  required/>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Password"
        className="mb-3"
      >
        <Form.Control name='password' style={{border:'1px solid black'}} type="password" placeholder="Password" onChange={registerhandlechange} required/>
      </FloatingLabel>
  

            <Button className='mt-2' variant="contained" style={{backgroundColor:'black'}} onClick={registerhandlesubmit}>Submit</Button>
            <Button className='mt-2' variant='outlined' style={{color:'black',marginLeft:'15px'}}  onClick={handleClose}>Close</Button>


          </Form>


        </Box>
      </Modal>
      
    

      </div>
  )
}

export default Login

