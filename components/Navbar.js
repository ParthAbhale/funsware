import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, Button, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import functionContext from "../context/functionContext";
import { IconButton } from "@mui/material";
import SwipeableTemporaryDrawer from "./Drawer";
import Menu from "@mui/material/Menu";

const Navbar = () => {
  const context = useContext(functionContext);
  const { setOpen, open } = context;
  const [UserStatus, setUserStatus] = useState()

  useEffect(() => {
      if(localStorage.getItem('key')){
          setUserStatus(true)
        }else{
        setUserStatus(false)

      }
  }, [])
  

  const handleLogout = () => {
    if(localStorage.getItem('key')){
      localStorage.removeItem('key')
      setUserStatus(false)
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={open ? "" : "hidden"}>
        <SwipeableTemporaryDrawer />
      </div>
      <header className="text-white body-font bg-blue-600 shadow-xl">
        <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center">
          <Link href="/">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <span className="ml-3 text-2xl font-bold text-white">
                Funs-Wear
              </span>
            </a>
          </Link>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href={"/t-shirts"}>
              <MenuItem>
                <a className="mr-5 hover:text-gray-100">T-Shirts</a>
              </MenuItem>
            </Link>
            <Link href={"/hoodies"}>
              <MenuItem>
                <a className="mr-5 hover:text-gray-100">Hoodies</a>
              </MenuItem>
            </Link>
            <Link href={"/mugs"}>
              <MenuItem>
                <a className="mr-5 hover:text-gray-100">Mugs</a>
              </MenuItem>
            </Link>
            <Link href={"/stickers"}>
              <MenuItem>
                <a className="mr-5 hover:text-gray-100">Stickers</a>
              </MenuItem>
            </Link>
          </nav>
          <div className="flex items-center">
            {!UserStatus && (
              <Link href={"/login"}>
                <Button variant="outlined" color="inherit">
                  LOGIN
                </Button>
              </Link>
            )}
            {UserStatus && (
              <div>
                <div
                  className="cursor-pointer"
                  id="basic-button"
                  aria-controls={menuOpen ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Avatar sx={{ backgroundColor: "black" }}>
                    <AccountCircleIcon />
                  </Avatar>
                </div>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <Link href=""><MenuItem onClick={handleClose}>Account</MenuItem></Link>
                  <Link href="/myOrders"><MenuItem onClick={handleClose}>My Orders</MenuItem></Link>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
            <IconButton
              onClick={() => {
                setOpen(true);
              }}
            >
              <Avatar sx={{ backgroundColor: "black" }}>
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Avatar>
            </IconButton>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
