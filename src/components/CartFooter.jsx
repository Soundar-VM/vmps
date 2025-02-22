import React from 'react'
import { Flex, Button ,Text} from '@radix-ui/themes'

function CartFooter() {
  return (
    <>
      <Flex className='fixed bottom-0 justify-between' style={{background:"#fff",width:"100%",padding:"10px",borderTop:"1px solid #ccc"}}>
        <Text as="p" className="real price" size="2">₹200/-</Text>
        <Text as="p" className="real price" size="2">₹200/-</Text>
        <Button> View Cart</Button>
      </Flex>
    
    </>
  )
}

export default CartFooter;