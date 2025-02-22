import React from 'react'
import { Flex, Button ,Text} from '@radix-ui/themes'

function CartFooter() {
  return (
    <>
      <Flex>
        <Button> View Cart</Button>
        <Text as="p" className="real price" size="2">₹200/-</Text>
        <Text as="p" className="real price" size="2">₹200/-</Text>
      </Flex>
    
    </>
  )
}

export default CartFooter;