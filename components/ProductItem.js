import React from "react";
import Link from "next/link";
import { Divider } from "@mui/material";

const ProductItem = (props) => {
  const { productImg, productName, productPrice, path, size , color } = props;
  console.log(`${path}:${color}:${size}`);
  return (
    <Link href={path}>
      <div className="lg:w-1/4 md:w-1/2 p-4 flex flex-col justify-center items-center w-full cursor-pointer bg-white rounded-lg mx-1 my-1">
        <div className="w-full flex justify-center items-center h-[400px]">
          <a className="block relative rounded overflow-hidden">
            <img alt="ecommerce" src={productImg} className="h-[350px]" />
          </a>
        </div>
        <Divider sx={{ width: "100%", mt: 3 }} />
        <div className="mt-4 w-full">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            CATEGORY
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {productName}
          </h2>
          <p className="mt-1">{productPrice}</p>
        </div>
        {color !== undefined && size !== undefined && <div className="w-full mt-5">
        <Divider sx={{mb:1}}/> 
        <div className="flex justify-between w-full">
          <div className="flex w-1/2 justify-start items-center">
            {size.map((elem , index)=>{return <div className="m-1 border-2 border-black bg-slate-100 p-2" key={index}>{elem} </div>})} 
          </div>
          <div className="flex w-1/2 justify-end items-center">
          {color.map((elem , index)=>{return <div className={`m-1 rounded-full  bg-${elem}-${elem !== "white" ? "500" : ""} p-4`} key={index}></div>})}
        </div>
        </div>
      </div>
      }
      </div>
    </Link>
  );
};



export default ProductItem;
