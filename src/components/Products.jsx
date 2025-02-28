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
import categoryStore from "../store/categoryStore";

function Products({ rangeRadio, selectedValues }) {
  const {categories, fetchCategories} = categoryStore();
  const { products, fetchProducts } = productStore();
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(window.innerWidth > 768 ? "grid" : "list");

  const { addToCart, removeFromCart, cart ,removeSingle } = cartStore(); // Get cart from Zustand store

  useEffect(() => {
     fetchData();
  
  }, []);
  
  const fetchData = async () => {
    setLoading(true);
     fetchProducts();
     fetchCategories();
    setLoading(false);
  };

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
        tabView={view}
      />
      <div>
      {categories
    .filter((category) => 
      filteredProducts.some((product) => product.cat_id === category.id) // ✅ Only keep categories with products
    )
    .map((category) => {
      // Get products belonging to this category
      const categoryProducts = filteredProducts.filter(
        (product) => product.cat_id === category.id
      );
      return (
        <div key={category.id}>
          
          <h2 className="my-5 py-2 ps-5 border-t-1 border-b-1 border-soild border-white bg-sky-900"><b>{category.title}</b></h2>
          <Grid
            className={view === "grid" ? "grid-view" : "list-view"}
            columns={view === "grid"
              ? { initial: "2", sm: "3", md: "4", lg: "6", xl: "6" }
              : { initial: "1", sm: "1", md: "2", lg: "3" }}
            gap="3"
          >
            {categoryProducts.map((product) => {
              const cartItem = cart.find((item) => item.id === product.id);
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <Card key={product.id} className="product-card p-0">
                  <img
                    src={`https://myhitech.digitalmantraaz.com/${product.photo}`}
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
                        MRP ₹{product.price}/-
                      </Text>
                      <Text as="p" className="real price" size="2">
                        ₹{Math.ceil(product.price - (product.price *(product.discount/100)))}/-
                      </Text>
                      <Text as="p" className="sub-total" size="2">
                        ₹{quantity * Math.ceil(product.price - (product.price *(product.discount/100)))}/-
                      </Text>
                    </Flex>
                    <Flex className="mt-3 control">
                      <Button
                        variant="soft"
                        className="cursor-pointer"
                        color="red"
                        onClick={() => removeSingle(product.id)}
                        disabled={quantity === 0}
                      >
                        -
                      </Button>

                      <TextField.Root
                        className="rounded-none"
                        value={quantity}
                        onChange={(e) => {
                          const newQuantity = Math.max(1, parseInt(e.target.value, 10) || 1);
                          addToCart(product.id,product.cat_id, newQuantity);
                        }}
                        style={{ width: "40px", textAlign: "center" }}
                      />

                      <Button
                      className="cursor-pointer"
                        variant="soft"
                        color="green"
                        onClick={() => addToCart(product.id,product.cat_id, quantity + 1)}
                      >
                        +
                      </Button>
                    </Flex>
                  </Box>
                </Card>
              );
            })}
          </Grid >
        </div>
      );
    })
    .filter(Boolean)} {/* Remove null values from array */}
</div>


      {loading && <Spinner loading={loading} size="3" className="fixed top-50 left-50" />}
    </Box>
  );
}

export default Products;
