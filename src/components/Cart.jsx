import React, { useEffect, useState } from "react";
import { Button, Text } from "@radix-ui/themes";
import cartStore from "../store/cartStore";
import productStore from "../store/productsStore";
import categoryStore from "../store/categoryStore";
import { Grid, Card, Box, Flex, TextField } from "@radix-ui/themes";

function Cart() {
  const { categories, fetchCategories } = categoryStore();
  const { products, fetchProducts } = productStore();
  const { cart, removeSingle, addToCart } = cartStore();
  const [cartItems, setCartItems] = useState([]);

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

  return (
    <div className="block">
      {categories
        .filter((category) => cartItems.some((product) => product.cat_id === category.id))
        .map((category) => {
          const categoryProducts = cartItems.filter((product) => product.cat_id === category.id);

          return (
            <div key={category.id}>
              <h2 className="my-5 ms-5 text-[20px]"><b>{category.title}</b></h2>
              <Grid className="list-view" columns={{ initial: "1", sm: "1", md: "2", lg: "3" }} gap="3">
                {categoryProducts.map((product) => (
                  <Card key={product.id} className="product-card p-0">
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
                          MRP ₹{Math.ceil(product.price / 0.25)}/-
                        </Text>
                        <Text as="p" className="real price" size="2">
                          ₹{product.price}/-
                        </Text>
                        <Text as="p" className="sub-total" size="2">
                          ₹{product.quantity * product.price}/-
                        </Text>
                      </Flex>
                      <Flex className="mt-3 control">
                        <Button
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
        <div className="flex justify-between">
              <p>₹{}/-</p>
              <button>Checkout</button>
        </div>
    </div>
  );
}

export default Cart;
