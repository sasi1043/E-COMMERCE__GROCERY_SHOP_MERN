import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

// theme
import Switch from '@mui/material/Switch';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate} from 'react-router-dom';

// drawer
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useCart } from '../context/CartContext';
import Badge from '@mui/material/Badge';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function NavBar() {
  const navigate=useNavigate();


  const {cart}=useCart();

  const { theme, toggletheme } = useTheme();


  // drawer state
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleNavigate=(path)=>{
    navigate(path)
  }

  return (
    <div className="container-fluid">
      <Navbar expand="lg" bg={theme === "light" ? "light" : "dark"}
  variant={theme === "light" ? "light" : "dark"} style={{ borderRadius: '10px' }}>
        <Container 
          fluid
          className="d-flex align-items-center justify-content-between"
        >
          {/* Brand (left) */}
          <Navbar.Brand href="/" >
            Grocify
          </Navbar.Brand>

          {/* Nav links (only desktop) */}
          <Nav className="d-none d-lg-flex align-items-center" style={{ flex: 1 }}>
            <Link to="/" className="nav-link" >
              Home
            </Link>

            <NavDropdown
              title={<span >Products</span>}
              id="desktopProductsDropdown"
            >
              <NavDropdown.Item href="#action3">Daily Essentials</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleNavigate("/AllTimeBest")} >Cooking Ingredients</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Kids Favorites</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Gifting Products</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Products with discount</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link >Kids Item</Nav.Link>
            <Nav.Link >Contact</Nav.Link>
          </Nav>

          {/* Search bar (always center, fixed in navbar) */}
           <Form
    className="d-flex flex-grow-1 mx-2"
    style={{ minWidth: 0 }}  // important: prevents overflow
  >
    <Form.Control
      type="search"
      placeholder="Search"
      className="me-2 d-flex"
      aria-label="Search"
      style={{ flex: 1, minWidth: 0 }}
    />
    <Button
      variant="outline-dark"
      style={{
        whiteSpace: 'nowrap',
        flexShrink: 0,
        color:theme==="light"?"#222":"#fff"
      }}
    >
      Search
    </Button>
  </Form>

          {/* Icons (desktop only) */}
          <div className="d-none d-lg-flex align-items-center ms-auto">
            <Link to="/login">
              <Button variant="outline" style={{color:theme==="light"?"#222":"#fff", marginRight: '10px' }}>
                Login
              </Button>
            </Link>
            <Switch {...label} title="theme" onClick={toggletheme} />
            <IconButton component={Link} to='/cartView'>
            <Badge badgeContent={cart.length} color='primary'>
              <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton>
              <PersonIcon />
            </IconButton>
          </div>

          {/* Drawer Toggle (only small/medium screens) */}
          <Navbar.Toggle
            className="d-lg-none ms-2"
            onClick={toggleDrawer(true)}
          />
        </Container>
      </Navbar>

      {/* Drawer for small screens */}
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
              <NavDropdown
                title="Products"
                id="drawerProductsDropdown"
                drop="end"
              >
                <NavDropdown.Item href="#action3">New Releases</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>handleNavigate("/AllTimeBest")} >All time best</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Top 10 Sales</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Upcoming Products</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Products with discount</NavDropdown.Item>
              </NavDropdown>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Kids Item" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Contact" />
            </ListItem>
          </List>

          {/* Icons inside Drawer (mobile only) */}
          <div className="d-flex flex-column align-items-start mt-4">
            <Link to="/login">
              <Button variant="outline" className="mb-2">
                Login
              </Button>
            </Link>
            <Switch {...label} title="theme" checked={theme === "dark"} onClick={toggletheme} />
            <div className="d-flex mt-2">

              <IconButton component={Link} to='/cartView' sx={{ color: theme === "light" ? "#000" : "#fff" }}>
                <Badge badgeContent={cart.length} color='primary'><ShoppingCartIcon /></Badge>
              </IconButton>

              <IconButton sx={{ color: theme === "light" ? "#000" : "#fff" }}>
                <PersonIcon  />
              </IconButton>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default NavBar;
