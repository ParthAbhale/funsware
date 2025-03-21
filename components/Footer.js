import { Avatar } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className="text-white body-font bg-blue-600 fixed bottom-0 w-[100vw]">
    <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
      <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
        <span className="ml-3 text-xl">Funs-Wear</span>
      </a>
      <p className="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2022 Funs-Wear —
        <a href="https://twitter.com/knyttneve" className="text-white ml-1" rel="noopener noreferrer" target="_blank">@FunsWear</a>
      </p>
      {/* <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            
           <div className="mx-1 cursor-pointer">
               <Link href="/">
                <Avatar>
            <FacebookIcon/>
            </Avatar>
               </Link>
            </div>

           <div className="mx-1 cursor-pointer">
               <Link href="/">
                <Avatar>
        <InstagramIcon/>
            </Avatar>
               </Link>
            </div>

           <div className="mx-1 cursor-pointer">
               <Link href="/">
                <Avatar>
<TwitterIcon/>
            </Avatar>
               </Link>
            </div>

           <div className="mx-1 cursor-pointer">
               <Link href="/">
                <Avatar>
        <LinkedInIcon/>
            </Avatar>
               </Link>
            </div>

      </span> */}
    </div>
  </footer>
  )
}

export default Footer