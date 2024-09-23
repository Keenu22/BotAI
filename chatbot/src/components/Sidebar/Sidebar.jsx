import MenuIcon from '@mui/icons-material/Menu'; // Import the hamburger icon
import { Drawer, IconButton } from '@mui/material';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import image1 from "../assets/image 29.png";
import image2 from "../assets/image 31.png";
import './Sidebar.css';

export default function Sidebar() {
  const [click, setClick] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for the drawer
  const navigate = useNavigate();

  function handleClick() {
    setClick((prev) => !prev);
    if (!click) {
      navigate("/result");
    } else {
      navigate("/");
    }
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const drawerContent = (
    <div className="drawer-content">
      <div className="chat">
        <img className="circle" src={image1} alt="first" />
        <p>New Chat</p>
        <img className="edit" src={image2} alt="second" />
      </div>
      <button onClick={handleClick} className="history">
        Past Conversation
      </button>
    </div>
  );

  return (
    <>
    <div className="sideview">
      <IconButton onClick={toggleDrawer} className="hamburger">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        {drawerContent}
      </Drawer>
      </div>

      <div className='sideview2'>
     <div className="chat">
        <img className="circle" src={image1} alt="first" />
        <p>New Chat</p>
        <img className="edit" src={image2} alt="second" />
      </div>
      <button onClick={handleClick} className="history">
        Past Conversation
      </button>
    </div>

      </>
  );
}
