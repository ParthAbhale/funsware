import { Container } from '@mui/material'
import React,{useState } from 'react'
import Link from 'next/link'
import ProductItem from '../components/ProductItem'
import Product from '../models/productSchema'
import mongoose from 'mongoose'
 
const Tshirts = ({TshirtProduct}) => {
  const [tshirts, setTshirts] = useState(TshirtProduct)
  
  return (
      <div className="bg-slate-100">

      <Container maxWidth="2xl">
    <section className="text-gray-600 body-font flex justify-center h-[93vh] items-center">
  <div className="px-5 py-24 mx-auto w-[100vw]">
    <div className="flex flex-wrap justify-center -m-4">
      {
        Object.keys(tshirts).map((elem)=>{return(
          <ProductItem key={tshirts[elem]._id} productName={tshirts[elem].productName} productPrice={tshirts[elem].price} productImg={tshirts[elem].img} path={`/products/${tshirts[elem]._id}`} color={tshirts[elem].color} size={tshirts[elem].size}/>
      )})
      }
      
    </div>
  </div>
</section>
</Container>
</div>

  )
}


export async function getServerSideProps(context) {

  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGOOSE_URI)
    console.log("Connected to Mongoose")
}
const products = await Product.find({category: 'T-shirt'})
let newProducts = {}
    for(let items of products) {
        if(items.productName in newProducts) {
                if(!newProducts[items.productName].color.includes(items.color) && newProducts[items.productName].productQty > 0){
                    newProducts[items.productName].color.push(items.color)
                }
                if(!newProducts[items.productName].size.includes(items.size) && newProducts[items.productName].productQty > 0){
                    newProducts[items.productName].size.push(items.size)
                }
        }else{
                newProducts[items.productName] = JSON.parse(JSON.stringify(items)) 
                if(newProducts[items.productName].productQty > 0){
                    newProducts[items.productName].color = [items.color];
                    newProducts[items.productName].size = [items.size];
                }
        }
    }

  return {
    props: {TshirtProduct: JSON.parse(JSON.stringify(newProducts))}, // will be passed to the page component as props
  }
}

export default Tshirts