import React from 'react'
import { Flex, Button ,Text} from '@radix-ui/themes'

function CartFooter() {
  return (
    <>
      <Flex className='fixed bottom-0 z-10 w-full' style={{background:"#000",width:"100%",padding:"10px",borderTop:"1px solid #ccc"}}>
        <Button> View Cart</Button>
        <Text as="p" className="real price" size="1">you saved ₹200/-</Text>
        <Text as="p" className="real price" size="2">₹200/-</Text>
      </Flex>
    
    </>
  )
}

export default CartFooter;