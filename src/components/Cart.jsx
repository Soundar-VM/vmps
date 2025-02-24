import React from 'react'
import { Button, Text } from '@radix-ui/themes'
import cartStore from '../store/cartStore';
import productStore from '../store/productsStore';

function Cart() {
    const {products} = cartStore();
    const {cart, getTotalPrice} = cartStore();
    return (
        <>
        {cartValues.map((product,index)=>( product.id==cart.id) ? (
            <div key={index}>
                <Text>{product.title}</Text>
                <Text>{product.price}</Text>
                <Button onClick={()=>removeFromCart(product.id)}>Remove</Button>
            </div>
            ):null)}
        <Text>{getTotalPrice}</Text>
        <Button onClick={()=>clearCart()}>Clear Cart</Button>   
        </>
    )
}


export default Cart