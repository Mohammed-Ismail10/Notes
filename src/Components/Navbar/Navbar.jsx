import React, { useState } from 'react'
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../Redux/NoteSlice.js';
import { logout } from '../../Redux/LoginSlice.js';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const { userData } = useSelector(({ login }) => login);
  const dispatch = useDispatch();





  return (
    <>
      {userData?<Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ "& .MuiDrawer-paper": { width: 240 } }}
        className='d-block d-sm-none text-center'
      >
        <Link to={`/`} className='py-3 text-decoration-none text-white fs-5 d-block bg-dark'>
          <div className='d-flex align-items-center justify-content-center'>
            <i className="fa-regular fa-note-sticky text-info fs-2 me-2"></i>
            <h2 className='text-white fs-4 m-0'>Notes</h2>
          </div>
        </Link>
        <hr className='m-0 text-white' />
        <ul className="navbar-nav bg-dark h-100">
          <li className="nav-item">
            <Link className="nav-link text-white py-3" to="/">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search..."
                  className="w-75 mx-auto"
                  aria-label="Search"
                  onChange={({ target }) => dispatch(search(target.value))}
                />
              </Form>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white py-3" onClick={() => dispatch(logout())} to="login">
              <i className="fa-solid fa-arrow-right-from-bracket me-2"></i> Logout
            </Link>
          </li>
        </ul>
      </Drawer>:null}

      {userData?<nav className='navbar navbar-expand-lg bg-dark shadow-sm fixed-top navbar-dark'>
        <div className="container-fluid">
          <Toolbar className='ps-0 w-100'>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className='d-sm-none text-white'
            >
              <MenuIcon />
            </IconButton>
            <Link className="navbar-brand text-primary" to="/">
              <div className='d-flex align-items-center '>
                <i className="fa-regular fa-note-sticky text-info fs-2 me-2"></i>
                <h2 className='text-white fs-4 m-0'>Notes</h2>
              </div>
            </Link>
            <div className='d-none d-sm-block w-100 ms-4'>
              <div className='d-flex justify-content-between'>
                <ul className="navbar-nav flex-row">
                  <li className="nav-item">
                    <Form className="d-flex">
                      <Form.Control
                        type="search"
                        placeholder="Search..."
                        className="mx-auto"
                        aria-label="Search"
                        onChange={({ target }) => dispatch(search(target.value))}
                      />
                    </Form>
                  </li>


                </ul>
                <ul className="navbar-nav flex-row">
                  <li className="nav-item">
                    <Link onClick={() => dispatch(logout())} className="nav-link text-white mx-1" to="login">
                      <i className="fa-solid fa-arrow-right-from-bracket me-2"></i> Logout
                    </Link>
                  </li>
                </ul>

              </div>
            </div>
          </Toolbar>
        </div>
      </nav>:null}
    </>
  )
}
