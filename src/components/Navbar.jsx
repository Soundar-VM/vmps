import React from 'react'
import {Flex } from '@radix-ui/themes'
import { BsCart } from "react-icons/bs";

function Navbar() {
  return (
    <>
        <div className="flex justify-between p-5">
            <div className="logo">
                {/* <img src="" alt="" /> */}
                <h2>Flipkart</h2>
            </div>
            

            <Flex>
                <BsCart style={{display:"none"}}/>
            </Flex>

        </div>
        
    </>
  )
}

export default Navbar