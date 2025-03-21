import { Container } from '@mui/material'
import React, {useState , useEffect} from 'react'
import mongoose from 'mongoose'
import Order from '../models/orderSchema'
import Link from 'next/link'

const MyOrder = ({user_orders}) => {
  const [orders, setOrders] = useState([])
  const [Loding, setLoding] = useState(true)
  const fetchUserOrders = (key)=>{
    setLoding(true);
    let order = user_orders.filter(user=>{return user.userId === key})
       setOrders(order)
       console.log(order)
    setLoding(false)
  }
  useEffect(() => {
    if(!localStorage.getItem("key")){
      router.push("/login")
    }
    if(localStorage.getItem("key")){
      let key = localStorage.getItem("key");
      fetchUserOrders(key)
    }
  }, [])
  
  if(!Loding) return (
      <Container maxWidth="xl">
    <div className="flex flex-col h-[90vh] mt-14">
        <div className="flex flex-col items-center jusitfy-center">
        <h1 className="text-center font-bold text-4xl ">Your Orders</h1>
        <h2 className="text-center font-sm mt-5">All your orders will be displayed here.!Thank you so much for order products from us.</h2>
        </div>

  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 mt-14">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-white border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                OrderId
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Amount
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Order Status
              </th>
            </tr>
          </thead>
          <tbody>
           { 
           orders.length > 0 && orders.map((elem)=>{
            return(
           <Link href={`/order/${elem._id}`} key={elem._id}>
           <tr className="bg-white border-b transition duration-300 ease-in-out cursor-pointer hover:bg-gray-100" key={elem._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{orders.indexOf(elem) + 1}</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {elem._id}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              ₹{elem.amount}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {elem.status}
              </td>
            </tr>
            </Link>
           )})
            }
            
            
          </tbody>
        </table>
        {
              orders.length <= 0 && <div className="h-[20vh] w-full flex justify-center items-center"><h1 className="text-4xl font-bold">No Orders</h1></div>
            }
      </div>
    </div>
  </div>
</div>
</Container>
  )
}

export async function getServerSideProps(context) {

  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGOOSE_URI)
    console.log("Connected to Mongoose")
}
  const orders = await Order.find()
  return {
    props: {user_orders: JSON.parse(JSON.stringify(orders))}, // will be passed to the page component as props
  }
}

export default MyOrder