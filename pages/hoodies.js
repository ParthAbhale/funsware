import React from 'react'
import { Container } from '@mui/material'
import ProductItem from '../components/ProductItem'
import {useState} from 'react'
import Product from '../models/productSchema'
import mongoose from 'mongoose'

const Hoodies = ({hoodies}) => {
  const [hoodie, setHoodie] = useState(hoodies)
  return (
    <div className="bg-slate-100">

      <Container maxWidth="2xl">
    <section className="text-gray-600 body-font flex justify-center h-[93vh] items-center">
  <div className="px-5 py-24 mx-auto w-[100vw]">
    <div className="flex flex-wrap justify-center -m-4">
      {
          hoodie.map((elem)=>{return(
            <ProductItem key={elem.id} productName={elem.productName} productPrice={elem.price} productImg={elem.img} path={`/products/${elem._id}`}  color={elem.color} size={elem.size}/>
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
let Hoodies = await Product.find({category: "Hoodie"})

  return {
    props: {hoodies: JSON.parse(JSON.stringify(Hoodies))}, // will be passed to the page component as props
  }
}

export default Hoodies