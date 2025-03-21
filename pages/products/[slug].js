import React, { useState, useEffect } from "react";
import { TextField, Backdrop, CircularProgress, MenuItem, ListItemButton } from "@mui/material";
import functionContext from "../../context/functionContext";
import { useContext } from "react";
import mongoose from "mongoose";
import Product from "../../models/productSchema";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/router";

const ProductPage = ({mainProduct,ColorSizeSlug}) => {

  const context = useContext(functionContext);
  const { addToCart , clearCart, buyNowFunction } = context;
  const [pinCode, setPinCode] = useState();
  const [service, setService] = useState();
  const [product, setProduct] = useState(mainProduct);
  const [loding, setloding] = useState(true);
  const [SelectedColor, setSelectedColor] = useState(product.color)
  const keys = Object.keys(ColorSizeSlug)
  // setStat

  const [avlSizes, setAvlSizes] = useState(keys.length > 0 ? Object.keys(ColorSizeSlug[SelectedColor]) : null)
  const [avlColors, setAvlColors] = useState(keys.length > 0 ? Object.keys(ColorSizeSlug) : null)
  const [selectedSize, setSelectedSize] = useState(keys.length > 0 ? Object.keys(ColorSizeSlug[SelectedColor])[0] : null)
  const router = useRouter()
  const checkPincode = async () => {
    const res = await fetch("http://localhost:3000/api/pincode");
    const resData = await res.json();
    console.log(resData);
    if (resData.includes(parseInt(pinCode))) {
      setService(true);
    } else {
      setService(false);
      setPinCode("");
    }
  };

  console.log(avlSizes)

    

  const checkSelectedColor = (color , id) => {
    setSelectedColor(color)
    setAvlSizes(Object.keys(ColorSizeSlug[color]))
      const colorID =  id[Object.keys(ColorSizeSlug[color])[0]].id
      localStorage.setItem('color' ,color)
      window.location.href = `/products/${colorID}`
  }

  const checkSelectedSize = (id , size, color) =>{
    setSelectedSize(size)
      const index = Object.keys(ColorSizeSlug[color]).indexOf(size)
      const colorID =  id[Object.keys(ColorSizeSlug[color])[index]].id
      localStorage.setItem('size' ,size)
      localStorage.setItem('color' ,color)
      window.location.href = `/products/${colorID}`
      console.log(index);
  }
    
  const findProduct = async () =>{
    if(localStorage.getItem('color') && localStorage.getItem('size')){
      const color = localStorage.getItem('color')
      await setAvlSizes(Object.keys(ColorSizeSlug[color]))
      await setSelectedSize(localStorage.getItem('size'))
     await localStorage.removeItem('color')
     await localStorage.removeItem('size')
    }
  }

  console.log(avlSizes);
  
  useEffect(() => {
    console.log(ColorSizeSlug)
    findProduct()
  }, [])

  const chooseSize = (size)=>{
    setSelectedSize(size)
  }
  

  return mainProduct.length < 0 ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loding}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    
  ) : (
    <>
    
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded flex justify-center items-center">
            <img
              alt="ecommerce"
              className="h-[400px] w-[400px]"
              src={product.img}
            />
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {`${product.productName }${product.color ? "/" + product.color + "/" : ""}${selectedSize ? selectedSize  : ""}`}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{product.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">

              <div className={keys.length <= 0 ?  "hidden" : "flex"}>
                <span className="mr-3">Color</span>
                {avlColors.map((color ,index) => {
                return (
                  <div className={color.includes(undefined) ? "hidden" : "w-full"} key={index}>
                  <button className={`border-2 border-gray-300 ml-1 ${SelectedColor === color ? "border-black" : ""} bg-${color}-${color !== "white" ? "500" : ""} rounded-full w-6 h-6 focus:outline-none`} onClick={()=>{checkSelectedColor(color , ColorSizeSlug[color])}}></button>
                  </div>
                )})
                }
              </div>
              <div className={keys.length <= 0 ?  "hidden" : "flex ml-6 items-center"}>
                <span className="mr-3">Size</span>
                <div className="relative flex ">
                  {
                    avlSizes && avlSizes.map((size)=>{
                      
                      return  <div className={`rounded border-2 text-center flex justify-center items-center h-[40px] ${selectedSize === size ? "border-blue-400" : "border-gray-500"} ml-1`} key={size._id}>
                        <ListItemButton onClick={()=>{checkSelectedSize( ColorSizeSlug[SelectedColor], size,SelectedColor)}}>{size}</ListItemButton>
                  </div>
                    })
                    }
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="mt-5">
                <span className="title-font font-medium text-2xl text-black">
                ₹{product.price}
                </span>
              </div>
              <div className="flex mx-5 mt-5">
                <button
                  className="flex mx-3 text-white bg-blue-500 border-0 py-3 px-2 focus:outline-none hover:bg-blue-600 rounded disabled:bg-blue-300 "
                  disabled={service ? false : true}
                  onClick={()=>{
                    buyNowFunction(
                      `${product.productName }${product.color ? "/" + product.color + "/" : ""}${selectedSize ? selectedSize  : ""}`,
                      product.slug,
                      selectedSize,
                      product.price,
                      1,
                      product.color,
                      product._id, 
                      pinCode
                    );
                  }}
                >
                  BUY NOW
                </button>
                <button
                  className="flex text-white bg-blue-500 border-0 py-3 px-2 focus:outline-none hover:bg-blue-600 rounded"
                  onClick={() => {
                    addToCart(
                      `${product.productName }${product.color ? "/" + product.color + "/" : ""}${selectedSize ? selectedSize  : ""}`,
                      product.slug,
                      selectedSize,
                      product.price,
                      1,
                      product.color,
                      product._id
                    );
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <div className="mt-5 w-full flex  items-center">
              <div className="w-full">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="pin-code"
                  label="Pin Code"
                  name="pin-code"
                  autoComplete="pin-code"
                  autoFocus
                  value={pinCode}
                  onChange={(e) => {
                    setPinCode(e.target.value);
                  }}
                />
              </div>
              <button
                className="mx-3 text-white bg-blue-500 border-0 w-[30%] h-[60px] text-xl focus:outline-none hover:bg-blue-600 rounded"
                onClick={checkPincode}
              >
                Check
              </button>
            </div>

            {service !== undefined && !service && (
              <div className="text-red-900 text-sm">
                Sorry the product is out of stock for this pincode
              </div>
            )}
            {service !== undefined && service && (
              <div className="text-green-900 text-sm">
                Yes you can proceed further
              </div>
            )}
          </div>
        </div>
      </div>
    </section></>
  );
};


export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGOOSE_URI)
    console.log("Connected to Mongoose")
}

  let product = await Product.findById(context.query.slug)
  let variant = await Product.find({productName: product.productName})
  let ColorSizeSlug = {}
  for(let item of variant){
      if(Object.keys(ColorSizeSlug).includes(item.color) && item.color !== undefined){
          ColorSizeSlug[item.color][item.size] = {id: item._id}
        }else if(item.color !== undefined){
          ColorSizeSlug[item.color]={}
          ColorSizeSlug[item.color][item.size] = {id: item._id}
      }else{
        ColorSizeSlug = {}
      }
  }
  console.log(ColorSizeSlug)
  return {
    props: {
      mainProduct: JSON.parse(JSON.stringify(product)) , 
      ColorSizeSlug: JSON.parse(JSON.stringify(ColorSizeSlug))
    } // will be passed to the page component as props
  }
}

export default ProductPage;
