import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Text,
  Card,
  TextField,
  Tabs,
  Box,
  Grid,
  Spinner,
} from "@radix-ui/themes";
import FilterBox from "./FilterBox";
import productStore from "../store/productsStore";
import cartStore from "../store/cartStore";

function Products({ rangeRadio, selectedValues }) {
  const { products, fetchProducts } = productStore();
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("grid");

  const { addToCart, removeFromCart, cart } = cartStore(); // Get cart from Zustand store

  useEffect(() => {
    setLoading(true);
    fetchProducts();
    setLoading(false);
  }, []);

  function handleSetCategory(val) {
    setSearchValue("");
    setCategory(val);
  }

  function handleSetSearchValue(val) {
    setCategory("all");
    setSearchValue(val);
  }

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchValue
      ? product.title.toLowerCase().includes(searchValue.toLowerCase())
      : true;

    const matchesCheckboxCategory =
      selectedValues.length > 0 ? selectedValues.includes(product.condition) : true;

    const matchesDropdownCategory = category !== "all" ? String(product.cat_id) === category : true;

    const matchesPrice = rangeRadio
      ? (() => {
          const productPrice = parseFloat(product.price);
          if (rangeRadio === "100") return productPrice <= 100;
          if (rangeRadio === "200") return productPrice > 101 && productPrice <= 200;
          if (rangeRadio === "500") return productPrice > 200 && productPrice <= 500;
          if (rangeRadio === "700") return productPrice > 500 && productPrice <= 700;
          if (rangeRadio === "1000") return productPrice > 700 && productPrice <= 1000;
          if (rangeRadio === "10000") return productPrice > 1000;
          return true;
        })()
      : true;

    return matchesSearch && matchesDropdownCategory && matchesCheckboxCategory && matchesPrice;
  });

  return (
    <Box className="relative min-h-screen">
      <FilterBox
        setValue={handleSetSearchValue}
        selectCategory={handleSetCategory}
        searchValue={searchValue}
        setView={setView}
        category={category}
      />
      <div>
        <Grid
          className={view === "grid" ? "grid-view" : "list-view"}
          columns={
            view === "grid"
              ? { initial: "2", sm: "3", md: "4", lg: "6", xl: "6" }
              : { initial: "1", sm: "1", md: "2", lg: "3" }
          }
          gap="3"
        >
          {filteredProducts.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            const quantity = cartItem ?  cartItem.quantity: 0; // Get quantity from cart

            return (
              <Card key={product.id} className="product-card p-0">
                <img
                  src={`https://myhitech.digitalmantraaz.com/` + product.photo}
                  alt={product.title}
                  style={{
                    objectFit: "cover",
                    height: view === "grid" ? "150px" : "100px",
                    width: view === "grid" ? "100%" : "100px",
                  }}
                />
                <Box className={view === "grid" ? "" : "ms-2"}>
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
                      ₹{quantity * product.price}/-
                    </Text>
                  </Flex>
                  <Flex className="mt-3 control">
                    <Button
                      variant="soft"
                      color="red"
                      onClick={() => removeFromCart(product.id)}
                      disabled={quantity === 0}
                    >
                      -
                    </Button>

                    <TextField.Root
                      className="rounded-none"
                      value={quantity} // Use Zustand cart state
                      onChange={(e) => {
                        const newQuantity = Math.max(1, parseInt(e.target.value, 10) || 1);
                        addToCart(product.id, newQuantity); // Update Zustand store
                      }}
                      style={{ width: "40px", textAlign: "center" }}
                    />

                    <Button variant="soft" color="green" onClick={() => addToCart(product.id, quantity + 1)}>
                      +
                    </Button>
                  </Flex>
                </Box>
              </Card>
            );
          })}
        </Grid>
      </div>

      {loading && <Spinner loading={loading} size="3" className="fixed top-50 left-50" />}
    </Box>
  );
}

export default Products;
