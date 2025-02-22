import React from 'react'
import {Flex } from '@radix-ui/themes'
import { Switch } from "radix-ui";
import { BsCart } from "react-icons/bs";
import theme from '../store/theme'
import cartStore from '../store/cartStore';

function Navbar() {
  const {toggleTheme } = theme();
  const {cart} = cartStore
  return (
    <>
        <div className="flex justify-between p-5 sticky top-0 w-full z-10" style={{background:"rgb(0 144 255)"}}>
            <div className="logo">
                <h2>VMPS Crakers</h2>
            </div>
            

            <div className='flex relative'>   
                {/* <Text>
                    {cart}
                </Text> */}
                <Flex style={{fontSize:"20px",marginRight:"10px"}}>
                    <BsCart/>
                </Flex>

            <Switch.Root className="SwitchRoot" onCheckedChange={toggleTheme} >
                <Switch.Thumb className="SwitchThumb" />
            </Switch.Root>
            </div>

        </div>
        
    </>
  )
}

export default Navbar