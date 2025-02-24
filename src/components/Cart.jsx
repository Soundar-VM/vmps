import React from 'react'
import { Button, Text } from '@radix-ui/themes'
import cartStore from '../store/cartStore';
import productStore from '../store/productsStore';

function Cart() {
    const {products} = cartStore();
    const {cart, getTotalPrice} = cartStore();
  return (
    <>
        {cart.map((item,index)=>(
            products.map(()=>{
                
            })
            const product = products.find((product) => product.id === item.id);
            <div key={index}>
                <Text as="p" size="1">{item.id}</Text>
                <Text as="p" size="1">{item.quantity}</Text>
            </div>
        ))}
    </>
  )
}

export default Cart