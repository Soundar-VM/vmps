import React from 'react'
import { Flex, Button ,Text} from '@radix-ui/themes'
import cartStore from '../store/cartStore'

function CartFooter() {
  const { getTotalItems,getTotalPrice } = cartStore();
  
  return (
    <>
      <div className='flex md:hidden fixed bottom-0 z-8 w-full justify-between items-center' style={{background:"#000",width:"100%",padding:"10px",borderTop:"1px solid #ccc"}}>
        <Button> View Cart</Button>
        <Text as="p" className="real price" size="1">you saved ₹200/-</Text>
        <Text as="p" className="real price" size="2">₹{getTotalPrice}/-</Text>
      </div>
    
    </>
  )
}

export default CartFooter;