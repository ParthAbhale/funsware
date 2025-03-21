import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import { IconButton } from "@mui/material";
import functionContext from "../context/functionContext";
import { useContext, useState } from "react";
import { blue } from "@mui/material/colors";
import Script from "next/script";
import Head from "next/head";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GooglePayButton from "@google-pay/button-react"
import {useRouter} from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Checkout() {
  const context = useContext(functionContext);
  const {
    addToCart,
    decreaseQuantity,
    cart,
    open,
    setOpen,
    subTotal,
    clearCart,
  } = context;

  const [OpenModal, setOpenModal] = React.useState(false);
  const checkPinCode = async ()=>{
    const res = await fetch("http://localhost:3000/api/pincode");
    const resData = await res.json();
    console.log(resData);
    if (resData.includes(parseInt(details.pincode))) {
      setService(true);
    } else {
      setService(false);
      setdetails({pincode: ""})
    }
  }
  const handleModalOpen =() => {
    if(details.name && details.address && details.phone && details.pincode && details.city && details.state && details.email){
    setOpenModal(true);
  }else{
    toast.error(`Please provide all required fields`, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });
  }
  }
  const handleModalClose = () => setOpenModal(false);
  const router = useRouter()
  const [details, setdetails] = useState({
    name:"",
    email:"",
    address:"",
    phone:"",
    city:"",
    state:"",
    pincode:""
  })

  useEffect(() => {
    if(!localStorage.getItem("key")){
      router.push("/login")
    }
      if(localStorage.getItem("pincode")){
        setdetails({pincode: localStorage.getItem("pincode")})
      }
      checkPinCode()

  }, [])
  

  const onChange = (e) =>{
    setdetails({...details , [e.target.name] : [e.target.value]})
  }

  const cartItems = {};
  const [cartState, setCartState] = useState({});
  const [subt, setSubt] = useState();
  const [service, setService] = useState();
  const setCartItems = () => {
    if (localStorage.getItem("cart")) {
      setCartState(JSON.parse(localStorage.getItem("cart")));
      const sub_total = localStorage.getItem("subt_final");
      setSubt(JSON.parse(sub_total));
    } else {
      setCartState({});
    }
  };
  React.useEffect(() => {
    setCartItems();
  }, [open]);

  const initiatOrderCOD = async() => {
      const res = await fetch("http://localhost:3000/api/postOrder",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          userId: localStorage.getItem("key"),
          order: cartState,
          status: "active",
          address: details.address,
          amount: subt
        })
      })

      console.log(cartState)
      const resData = await res.json()
      console.log(resData);
      if(resData.success){
        router.push(`/order/${resData.full_order._id}`)
        localStorage.removeItem("cart")
        setCartState({})
      }
    

  }

  console.log(cartState)

  const addCartQty = (itemCode, name, size, price, qty, variant) => {
    addToCart(itemCode, name, size, price, qty, variant);
    setCartState(JSON.parse(localStorage.getItem("cart")));
    const sub_total = localStorage.getItem("subt_final");
    setSubt(JSON.parse(sub_total));
  };
  const decreaseCartQty = (itemCode) => {
    decreaseQuantity(itemCode);
    setCartState(JSON.parse(localStorage.getItem("cart")));
    const sub_total = localStorage.getItem("subt_final");
    setSubt(JSON.parse(sub_total));
  };

  const clearCartItems = () => {
    clearCart();
    setCartState({});
    const sub_total = localStorage.getItem("subt_final");
    setSubt(JSON.parse(sub_total));
  };
  return (
    <>
    <ToastContainer
position="top-left"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
/>
      <div>
        <Modal
          open={OpenModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] ">
            <div className=" bg-white w-[30vw] h-[70vh] relative">
              <div className="absolute top-2 h-12 w-full">
                <h1 className="font-bold text-center text-2xl uppercase mb-2">
                  Choose A payment method
                </h1>
                <Divider />
              </div>
              <div className="h-full w-full flex flex-col justify-center items-center px-3 bg-slate-100">
                <div className="shadow-lg w-full p-1 flex items-center justify-center min-h-[50px] my-3 py-3 bg-white cursor-pointer">
                  <GooglePayButton
                    environment="TEST"
                    paymentRequest={{
                      apiVersion: 2,
                      apiVersionMinor: 0,
                      allowedPaymentMethods: [
                        {
                          type: "CARD",
                          parameters: {
                            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                            allowedCardNetworks: ["MASTERCARD", "VISA"],
                          },
                          tokenizationSpecification: {
                            type: "PAYMENT_GATEWAY",
                            parameters: {
                              gateway: "example",
                              gatewayMerchantId: "exampleGatewayMerchantId",
                            },
                          },
                        },
                      ],
                      merchantInfo: {
                        merchantId: "12345678901234567890",
                        merchantName: "Demo Merchant",
                      },
                      transactionInfo: {
                        totalPriceStatus: "FINAL",
                        totalPriceLabel: "Total",
                        totalPrice: subt,
                        currencyCode: "INR",
                        countryCode: "IN",
                      },
                    }}
                    onLoadPaymentData={(paymentRequest) => {
                      console.log("load payment data", paymentRequest);
                    }}
                  />
                </div>
                <div className="shadow-lg w-full p-1 flex items-center justify-center min-h-[50px] my-3 py-3 bg-white cursor-pointer" onClick={initiatOrderCOD}>
                  <h1 className="text-center font-sm text-xl ">
                    Cash on Dilevery
                  </h1>
                </div>
              </div>
              <div className="absolute bottom-0 w-full">
                <Divider />
                <div className="flex justify-center p-2">
                  <button
                    className="flex mx-3 text-white bg-blue-500 border-0 py-3 px-2 focus:outline-none hover:bg-blue-600 rounded disabled:bg-blue-300 "
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <div className="w-[99vw] py-2 px-4 flex justify-center items-center overflow-x-hidden">
        <div className="container">
          <div className="flex flex-wrap justify-center flex-col items-center my-8">
            <h1 className="text-center text-3xl font-bold">Checkout</h1>

            <div className="mt-8 w-full">
              <h2 className="text-left font-bold text-3xl">
                1. Dilevery Details
              </h2>
            </div>
            <div className="w-full flex items-center justify-center my-3">
              <div className="w-1/2 mr-2">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus={true}
                  value={details.name}
                  onChange={onChange}
                />
              </div>
              <div className="w-1/2 ml-2">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={details.email}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-center my-3">
              <div className="w-full">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  value={details.address}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-center my-3">
              <div className="w-1/2 mr-2">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  value={details.phone}
                  onChange={onChange}
                />
              </div>
              <div className="w-1/2 ml-2">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  value={details.city}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-center my-3">
              <div className="w-1/2 mr-2">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="state"
                  value={details.state}
                  onChange={onChange}
                />
              </div>
              <div className="w-1/2 ml-2">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="pincode"
                  label="Pin Code"
                  name="pincode"
                  autoComplete="pincode"
                  value={details.pincode}
                  onChange={onChange}
                />
                {!service && <p className="text-sm text-red-500">{"Sorry! We don't deliver at this pincode!"}</p>}
              </div>
            </div>
            <div className="mt-8 w-full">
              <h2 className="text-left font-bold text-3xl">2. Review Cart</h2>
            </div>
            <div className="bg-indigo-200 mt-5 rounded-lg flex  w-full min-h-[30vh] relative">
              <div className="w-full flex flex-col p-3">
                <div className="mt-5 h-[70%] overflow-y-scroll mb-5">
                  {Object.keys(cartState).length === 0 && (
                    <h1 className="text-center text-2xl">
                      No Cart Items Found
                    </h1>
                  )}
                  {Object.keys(cartState).map((k) => {
                    return (
                      <div className="w-full bg-white p-5 rounded-lg mb-5" key={cartState[k]._id}>
                        <div key={k}>
                          <div>
                            <div className="flex items-center justify-between w-full">
                              <div className="mr-10 flex">
                                <p className="font-bold text-xl mr-20">
                                  {Object.keys(cartState).indexOf(k) + 1}
                                </p>
                                <p>{k}</p>
                              </div>
                              <div className="flex items-center justify-center">
                                <IconButton
                                  disablePadding
                                  onClick={() => {
                                    addCartQty(
                                      k,
                                      cartState[k].name,
                                      cartState[k].size,
                                      cartState[k].price,
                                      1,
                                      cartState[k].variant,
                                      cartState[k]._id
                                    );
                                  }}
                                >
                                  <AddCircleOutlineSharpIcon
                                    sx={{
                                      backgroundColor: blue[500],
                                      color: "white",
                                      borderRadius: 100,
                                    }}
                                  />
                                </IconButton>
                                {cartState[k].qty}
                                <IconButton
                                  disablePadding
                                  onClick={() => {
                                    decreaseCartQty(k);
                                  }}
                                >
                                  <RemoveCircleOutlineSharpIcon
                                    sx={{
                                      backgroundColor: blue[500],
                                      color: "white",
                                      borderRadius: 100,
                                    }}
                                  />
                                </IconButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex absolute bottom-2  justify-between w-full h-[8vh]">
                <div className="h-full flex flex-col  justify-end w-full">
                  <div className="flex w-full items-center justify-between">
                    <div>
                      <button
                        className="flex mx-3 text-indigo-500 h-[47px] cursor-pointer bg-white border-0 py-3 px-2 my-2 focus:outline-none hover:bg-slate-100 rounded-lg font-bold shadow-lg shadow-indigo-500/40 disabled:bg-indigo-100 disabled:cursor-not-allowed"
                        disabled={
                          Object.keys(cartState).length === 0 ? true : false
                        }
                        onClick={handleModalOpen}
                      >
                        Pay ₹{subt}
                      </button>
                    </div>
                    <div>
                      <h1 className="font-bold text-xl">Total: ₹{subt}</h1>
                    </div>
                    <div>
                      <button
                        className="flex mx-3 text-indigo-500 h-[47px] bg-white border-0 py-3 px-2 my-2 focus:outline-none hover:bg-slate-100 rounded-lg font-bold shadow-lg shadow-indigo-500/40"
                        onClick={clearCartItems}
                      >
                        Clear Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
