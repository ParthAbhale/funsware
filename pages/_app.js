import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import {useState , useEffect} from 'react'
import functionContext from '../context/functionContext'
import {useRouter} from 'next/router'
import {red} from "@mui/material/colors"
import Script from 'next/script'

const MyApp = ({ Component, pageProps }) =>{
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    try {
      if(localStorage.getItem('cart')){
        setCart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
        console.error(error)
    }
  }, [])
  


  const saveCartToLocalStorage = async(cart) => {

    localStorage.setItem('cart', JSON.stringify(cart))
    const subt = 0;

    const keys = Object.keys(cart);

      for (let index = 0; index < keys.length; index++) {
        subt += cart[keys[index]].price * cart[keys[index]].qty
      } 
      setSubTotal(subt)
      localStorage.setItem('subt_final' , JSON.stringify(subt))
  }

  const buyNowFunction = async(itemCode , name , size , price , qty , variant, id ,pincode) => {
    clearCart()
    setCart({})
    let newCart = {};
    newCart[itemCode]={
      name , size , price , qty: 1 , variant , id}
 setCart(newCart)
      saveCartToLocalStorage(newCart)
      localStorage.setItem('pincode' , pincode)
      router.push('/checkout')
  }

  const addToCart = (itemCode , name , size , price , qty , variant, id) => {
      let newCart = cart;
      if(itemCode in cart){
        newCart[itemCode].qty = newCart[itemCode].qty + qty
      }else{
        newCart[itemCode]={
           name , size , price , qty: 1 , variant , id}
      }

      setCart(newCart)
      saveCartToLocalStorage(newCart)
      
  }
  const decreaseQuantity = (itemCode) => {
    let newCart = cart
    if(newCart[itemCode].qty  === 1){
      delete newCart[itemCode]
    }
    else {
        newCart[itemCode].qty = newCart[itemCode].qty - 1
    }
      setCart(newCart)
      console.log(cart)
      saveCartToLocalStorage(newCart)
  }

  const clearCart = () => {
    setCart({});
    saveCartToLocalStorage({})
  }

  return (
    <functionContext.Provider value={{addToCart , decreaseQuantity , clearCart , saveCartToLocalStorage,buyNowFunction, cart ,subTotal , open , setOpen , subTotal}}>
  <Head>
    <title>Funs Wear</title>
  </Head>
    <Script src="https://cdn.tailwindcss.com"/>
  <Navbar />
    <Component {...pageProps} />
    {/* <Footer/> */}
    </functionContext.Provider>
  )
}

export default MyApp
