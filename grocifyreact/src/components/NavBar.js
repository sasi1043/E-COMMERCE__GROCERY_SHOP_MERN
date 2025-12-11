import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
import * as React from 'react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginVerify } from '../context/LoginContext';
import SearchList from './SearchList';
import axios from 'axios';

const API=process.env.REACT_APP_BACKEND_URL;
const label = { inputProps: { 'aria-label': 'Switch demo' } };

function NavBar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { logout } = useLoginVerify();
  const { theme, toggletheme } = useTheme();

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const [input, setInput] = useState("");
  const [result, setResults] = useState([]);

  const fetchResults = async (value) => {
    const query = value;
    const res = await axios.post(`${API}/api/search`, { query });
    setResults(res.data.prod);
  };

  const handleChange = (value) => {
    setInput(value);
    if (value.trim().length === 0) {
      setResults(null);
      return;
    }
    fetchResults(value);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const op = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleNavigate = (path) => navigate(path);

  return (
    <div className="container-fluid">
      <Navbar
        expand="lg"
        bg={theme === "light" ? "light" : "dark"}
        variant={theme === "light" ? "light" : "dark"}
        style={{ borderRadius: '10px' }}
      >
        <Container fluid className="d-flex align-items-center justify-content-between">
          {/* Brand */}
          <Navbar.Brand href="/">Grocify</Navbar.Brand>

          {/* Desktop nav links */}
          <Nav className="d-none d-lg-flex align-items-center" style={{ flex: 1 }}>
            <Link to="/" className="nav-link">Home</Link>
            <NavDropdown title="Products" id="desktopProductsDropdown">
              <NavDropdown.Item onClick={() => handleNavigate("/DailyEssentials")}>Daily Essentials</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigate("/CookingIngredients")}>Cooking Ingredients</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigate("/KidsFavourites")}>Kids Favorites</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigate("/discount")}>Products with discount</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={()=>handleNavigate('/contactpage')}>Contact</Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex flex-grow-1 mx-2" style={{ minWidth: 0 }} onSubmit={(e)=>e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ flex: 1, minWidth: 0 }}
              value={input}
              onChange={(e) => {handleChange(e.target.value)
                e.preventDefault()
              }}
            />

            {/* Search + Cart (mobile inline) */}
            <div className="d-flex align-items-center">
              <Button
                variant="outline-inherit"
                style={{
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  color: theme === "light" ? "#222" : "#fff",
                }}
                onClick={(e) => {navigate('/searchProducts', { state: { result } });
                     e.preventDefault()}}
              >
                Search
              </Button>

              {/* Cart icon (mobile only) */}
              <IconButton
                component={Link}
                to='/cartView'
                className="d-lg-none ms-2"
                style={{ color: theme === "light" ? "#222" : "#fff" }}
              >
                <Badge badgeContent={cart.length} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>

            <center><SearchList result={result} /></center>
          </Form>

          {/* Desktop Icons */}
          <div className="d-none d-lg-flex align-items-center ms-auto">
            <Link to="/login">
              <Button
                variant="outline"
                style={{ color: theme === "light" ? "#222" : "#fff", marginRight: '10px' }}
              >
                Login
              </Button>
            </Link>
            <Switch {...label} title="theme" onClick={toggletheme} />
            <IconButton component={Link} to='/cartView' style={{ color: theme === "light" ? "#6e6a6aff" : "#fff" }}>
              <Badge badgeContent={cart.length} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Profile Menu */}
            <IconButton
              id="basic-button"
              aria-controls={op ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={op ? 'true' : undefined}
              onClick={handleClick}
              style={{ color: theme === "light" ? "#6e6a6aff" : "#fff" }}
            >
              <PersonIcon />
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={op}
              onClose={handleClose}
              slotProps={{
                list: { 'aria-labelledby': 'basic-button' },
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={()=>navigate('/myorders')}>My Orders</MenuItem>
              <MenuItem onClick={() => {
                handleClose();
                localStorage.removeItem('token');
                logout();
              }}>Logout</MenuItem>
            </Menu>
          </div>

          {/* Drawer Toggle (mobile) */}
          <Navbar.Toggle className="d-lg-none ms-2" onClick={toggleDrawer(true)} />
        </Container>
      </Navbar>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div
          style={{
            width: 250,
            padding: '1rem',
            backgroundColor: theme === 'light' ? '#fff' : '#222',
            height: '100%',
            color: theme === 'light' ? '#222' : '#fff',
          }}
        >
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem>
              <NavDropdown title="Products" id="drawerProductsDropdown" drop="end">
                <NavDropdown.Item onClick={() => handleNavigate("/DailyEssentials")}>Daily Essentials</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavigate("/CookingIngredients")}>Cooking Ingredients</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavigate("/KidsFavourites")}>Kids Favorites</NavDropdown.Item>
                <NavDropdown.Item href="#discount">Products with discount</NavDropdown.Item>
              </NavDropdown>
            </ListItem>
            <ListItem button><ListItemText primary="Contact" /></ListItem>
          </List>

          <div className="d-flex flex-column align-items-start mt-4">
            <Link to="/login">
              <Button variant="outline" className="mb-2">Login</Button>
            </Link>
            <Switch {...label} title="theme" checked={theme === "dark"} onClick={toggletheme} />
            <div className="d-flex mt-2">
              <IconButton component={Link} to='/cartView' sx={{ color: theme === "light" ? "#000" : "#fff" }}>
                <Badge badgeContent={cart.length} color='primary'><ShoppingCartIcon /></Badge>
              </IconButton>
              <IconButton
                id="basic-button"
                aria-controls={op ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={op ? 'true' : undefined}
                onClick={handleClick}
                style={{ color: theme === "light" ? "#6e6a6aff" : "#fff" }}
              >
                <PersonIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default NavBar;
