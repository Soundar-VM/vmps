import React, { useEffect, useState } from "react";
import { Button, Text } from "@radix-ui/themes";
import cartStore from "../store/cartStore";
import productStore from "../store/productsStore";
import categoryStore from "../store/categoryStore";
import { MdClose } from "react-icons/md";
import { Grid, Card, Box, Flex, TextField } from "@radix-ui/themes";
import cartToggle from "../store/cartToggle";

function Cart() {
  const { categories, fetchCategories } = categoryStore();
  const { cartStatus, cartStatusToggle } = cartToggle();
  const { products, fetchProducts } = productStore();
  const { cart, removeSingle, addToCart } = cartStore();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceDiscount, setTotalPriceDiscount] = useState(0);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    // Merge cart items with product details
    const updatedCart = cart.map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      return product ? { ...cartItem, ...product } : null;
    }).filter(Boolean); // Remove null values

    setCartItems(updatedCart);
  }, [cart, products]);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity)-(item.quantity * (item.price*(item.discount/100))), 0);
    const totalDiscount = cartItems.reduce((acc, item) => acc + ((item.price * item.quantity) + (item.quantity * (item.price*(item.discount/100))))-(item.price*item.quantity) , 0);
    setTotalPrice(total);
    setTotalPriceDiscount(totalDiscount);
  }, [cartItems]);

  return (
    <div className="fixed right-0 w-100 h-full bg-black z-[9] shadow-lg" style={{paddingBottom:"100px",display:cartStatus?"block":"none"}}>
      <div className="flex justify-between py-5 px-5" style={{width:"100%"}}>
        <button className="text-white-950 cursor-pointer" onClick={()=>cartStatusToggle()}><MdClose style={{color:"white"}}/></button>
        <h1  className="font-bold">Cart</h1>
      </div>
      <div style={{position:"sticky",top:"0px",overflowY:"scroll",height:"80vh",paddingBottom:'50px'}} className="px-2 pt-0">
      {categories
        .filter((category) => cartItems.some((product) => product.cat_id === category.id))
        .map((category) => {
          
          const categoryProducts = cartItems.filter((product) => product.cat_id === category.id);

          return (
            <div key={category.id}>
              <h2 className="my-5 py-2 ps-5  border-t-1 border-b-1 border-soild border-white bg-sky-900"><b>{category.title}</b></h2>
              <Grid className="list-view" columns={{ initial: "1"}} gap="3">
                {categoryProducts.map((product) => (

                  <Card key={product.id} className="product-card" style={{ padding:'0' }}>
                    <img
                      src={`https://myhitech.digitalmantraaz.com/${product.photo}`}
                      alt={product.title}
                      style={{ objectFit: "cover", height: "100px", width: "100px" }}
                    />
                    <Box className="ms-2">
                      <Text as="p" className="line-clamp-1" size="2" mt="2">
                        {product.title}
                      </Text>
                      <Flex className="mt-2">
                        <Text as="span" className="strike price">
                          MRP ₹{product.price}/-
                        </Text>
                        <Text as="p" className="real price" size="2">
                        ₹{Math.ceil(product.price - (product.price *(product.discount/100)))}/-
                        </Text>
                        <Text as="p" className="sub-total" size="2">
                          ₹{product.quantity * Math.ceil(product.price - (product.price *(product.discount/100)))}/-
                        </Text>
                      </Flex>
                      <Flex className="mt-3 control">
                        <Button
                        className="cursor-pointer"
                          variant="soft"
                          color="red"
                          onClick={() => removeSingle(product.id)}
                          disabled={product.quantity === 0}
                        >
                          -
                        </Button>
                        <TextField.Root
                          className="rounded-none"
                          value={product.quantity}
                          onChange={(e) => {
                            const newQuantity = Math.max(1, parseInt(e.target.value, 10) || 1);
                            addToCart(product.id, newQuantity);
                          }}
                          style={{ width: "40px", textAlign: "center" }}
                        />
                        <Button
                          variant="soft"
                          className="cursor-pointer"
                          color="green"
                          onClick={() => addToCart(product.id, product.quantity + 1)}
                        >
                          +
                        </Button>
                      </Flex>
                    </Box>
                  </Card>
                ))}
              </Grid>
            </div>
          );
        })}
        </div>
        <div className="fixed bottom-0 w-100">
              <p className="text-center bg-white text-black py-1">You saved <span className="text-[13px] text-red-700">₹{totalPriceDiscount}/-</span></p>
          <div className="flex justify-between">
              <button className="bg-[#0090ff] text-white-900 py-3 px-1 font-bold w-50 border-r-2 text-[20px]">Checkout</button>
              <p className="bg-green-600 text-white-900 py-3 px-1 font-bold w-50 text-center">Total<br/><span class="pt-3">₹{totalPrice}/-</span></p>

          </div>
        </div>
    </div>
  );
}

export default Cart;
