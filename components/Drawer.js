import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import {blue} from '@mui/material/colors'
import functionContext from '../context/functionContext'
import { useContext  , useState} from 'react';
import Link from 'next/link'




export default function SwipeableTemporaryDrawer() {
  const context = useContext(functionContext)
  const {addToCart , decreaseQuantity , cart , open ,setOpen , subTotal , clearCart} = context;
  const cartItems = {};
  const [cartState, setCartState] = useState(cartItems)
  const [subt, setSubt] = useState(0)
  const setCartItems = () => {
    if (localStorage.getItem('cart')){
      cartItems = JSON.parse(localStorage.getItem('cart'));
      setCartState(cartItems)
      const sub_total = localStorage.getItem("subt_final")
       setSubt(JSON.parse(sub_total)); 
    }else{
      setCartState({})
    }
  }
  React.useEffect(()=>{
    setCartItems()
  },[open])

  const addCartQty = (itemCode, name , size , price , qty , variant) => {
    addToCart(itemCode, name , size , price , qty , variant);
    setCartState(JSON.parse(localStorage.getItem('cart')))
    const sub_t = localStorage.getItem('subt_final')
    setSubt(JSON.parse(sub_t))
    console.log(subt)
 } 
  const decreaseCartQty = (itemCode) => {
    decreaseQuantity(itemCode);
    setCartState(JSON.parse(localStorage.getItem('cart')))
    const sub_t = localStorage.getItem('subt_final')
    setSubt(JSON.parse(sub_t))
    console.log(subt)
 } 

 const clearCartItems = () => {
  clearCart()
  setCartState({})
  setSubt(0)
 }
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setOpen(open);
      };

    
      const list = (anchor) => (
        <Box
          sx={{ minWidth: '100vw' , maxWidth: '30vw'  }}
          role="presentation"
        >
          <nav className="relative">
          <ListItem disablePadding>
                <div className="flex justify-between items-center px-5 my-2">
            <div>

          <Typography variant="h6" gutterBottom component="div">
        Shopping Cart
          </Typography>
            </div>

            <div className="absolute right-2">
                <IconButton disablepadding="true" onClick={toggleDrawer(false)}>
          <CloseIcon />
                </IconButton>
            </div>
        </div>
          </ListItem>            
          </nav>
          <Divider/>
          <nav aria-label="main mailbox folders">
        <List>
          <div className="mt-5">
          {Object.keys(cartState).length === 0 && <div className="min-h-[90vh] flex justify-center items-center"><h1 className="text-center text-2xl">No Cart Items Found</h1></div>}
          {Object.keys(cartState).map((k)=>{
            return <ListItem disablePadding key={k}>
            <ListItemButton disableTouchRipple>
                <div className="flex justify-between items-center w-[100%]">
                    <div className="mr-10">
                      {
                        Object.keys(cartState).indexOf(k) + 1
                      }
                    </div>
                    <div className="mr-10">
              <ListItemText primary={k} />
                    </div>
                    <div className="flex items-center justify-center">   
                        <IconButton disablePadding onClick={()=>{addCartQty(k , k , cartState[k].size , cartState[k].price , 1 , cartState[k].variant)}}>
                                    <AddCircleOutlineSharpIcon sx={{backgroundColor: blue[500] , color: 'white' , borderRadius: 100}} />
                        </IconButton>
                        {cartState[k].qty}
                        <IconButton disablePadding onClick={()=>{decreaseCartQty(k)}}>
                                    <RemoveCircleOutlineSharpIcon sx={{backgroundColor: blue[500] , color: 'white' , borderRadius: 100}} />
                        </IconButton>
                    </div>
                </div>
            </ListItemButton>
          </ListItem> }) 
          }
          

          </div>
        </List>
          </nav>
          <div className="absolute bottom-1 w-full flex justify-between items-center pt-4 pb-2 px-2 border-2 border-t-slate-100">
            <div>
            ₹{subt ? subt : 0}
            </div>
            <div className='flex'>
          <Link href={'/checkout'}><button className="flex mx-3 text-white bg-blue-500 border-0 py-3 px-2 focus:outline-none hover:bg-blue-600 rounded disabled:bg-blue-300" disabled={Object.keys(cartState).length === 0 ? true : false} onClick={()=>{setOpen(false)}}>Checkout</button></Link>
          <button className="flex mx-3 text-white bg-blue-500 border-0 py-3 px-2 focus:outline-none hover:bg-blue-600 rounded disabled:bg-blue-300 " onClick={clearCartItems}>Clear Cart</button>

            </div>
          </div>
        </Box>

      );
    

  return (
    <div>
           <Drawer
      anchor={'right'}
      open={open}
      onClose={toggleDrawer(false)}
    >
      {list('right')}
    </Drawer>
    </div>
  );
}
