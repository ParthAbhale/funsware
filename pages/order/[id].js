import React, { useEffect, useState } from 'react'
import mongoose from 'mongoose'
import Order from '../../models/orderSchema'
import Product from '../../models/productSchema'

const Orders = ({product_details}) => {
    const [orderDetails, setOrderDetails] = useState(product_details)
    console.log(orderDetails);
    
    
    
  return (
    orderDetails.map((elem)=>{
      console.log(elem)
      return(
      <section className="text-gray-600 body-font overflow-hidden mt-24" key={elem._id}>
  <div className="container px-5 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap-reverse">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">FunsWear</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{`${elem.productName }${elem.color ? "/" + elem.color + "/" : ""}${elem.size ? elem.size  : ""}`}</h1>
        <div className="flex mb-4">
          <a className="flex-grow text-blue-500 border-b-2 border-blue-500 py-2 text-lg px-1">Description</a>
        </div>
        <p className="leading-relaxed mb-4">{elem.desc}</p>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Color</span>
          <span className="ml-auto text-gray-900">{elem.color ? elem.color : "N/A"}</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Size</span>
          <span className="ml-auto text-gray-900">{elem.size ? elem.size : "N/A"}</span>
        </div>
        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
          <span className="text-gray-500">Quantity</span>
          <span className="ml-auto text-gray-900">{elem.productQty}</span>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">₹{elem.price}</span>
          <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Track Order</button>
        </div>
      </div>
      <div className="lg:w-1/2 w-full flex h-[50vh] justify-center items-center ">
      <img alt="ecommerce" className="w-[300px] h-[300px] rounded" src={elem.img}/>
      </div>
    </div>
  </div>
</section>
    )})
  )
}


export async function getServerSideProps(context) {
    if(!mongoose.connections[0].readyState){
      await mongoose.connect(process.env.MONGOOSE_URI)
      console.log("Connected to Mongoose")
  }

  const order_details = await Order.findById(context.query.id)
  
  const products_ordered = order_details.product.map((product)=>{return ( product.productId)})
  
  let product_details;
  let product_array = [];
  for (let index = 0; index < products_ordered.length; index++) {
    product_details = await Product.findById(products_ordered[index])
    product_array.push(product_details)
  }
  console.log(product_array)


    return {
      props: {product_details:JSON.parse(JSON.stringify(product_array))} // will be passed to the page component as props
    }
  }

export default Orders