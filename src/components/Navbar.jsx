import React from 'react'
import {Flex } from '@radix-ui/themes'
import { Switch } from "radix-ui";
import { BsCart } from "react-icons/bs";
import theme from '../store/theme'

function Navbar() {
  const {toggleTheme } = theme();
  return (
    <>
        <div className="flex justify-between p-5 sticky top-0 w-full z-10" style={{background:"rgb(0 144 255)"}}>
            <div className="logo">
                {/* <img src="" alt="" /> */}
                <h2>Flipkart</h2>
            </div>
            

            <Flex>
                <BsCart/>
            </Flex>

            <Switch.Root className="SwitchRoot" onCheckedChange={toggleTheme}>
                <Switch.Thumb className="SwitchThumb" />
            </Switch.Root>

        </div>
        
    </>
  )
}

export default Navbar