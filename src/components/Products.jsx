import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Flex, Text, Card, TextField, Tabs, Box, Grid ,Spinner } from "@radix-ui/themes";
import Categories from "./Categories";
import { CiBoxList, CiGrid41 } from "react-icons/ci";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("grid"); // 'grid' or 'list'

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://myhitech.digitalmantraaz.com/api/allproducts"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchValue
      ? product.title.toLowerCase().includes(searchValue.toLowerCase())
      : true;
    const matchesCategory = category
      ? String(product.cat_id) === String(category)
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box className="relative min-h-screen">
      <Categories setValue={setSearchValue} selectCategory={setCategory} searchValue={searchValue} />

      {/* Tabs for toggling view */}
      <Tabs.Root defaultValue="grid" className="my-5">
        <Tabs.List>
          <Tabs.Trigger value="list" onClick={() => setView("list")}>
            <CiBoxList className="me-2" /> List
          </Tabs.Trigger>
          <Tabs.Trigger value="grid" onClick={() => setView("grid")}>
            <CiGrid41 className="me-2" /> Grid
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>

      {/* Product Container with dynamic classes */}
      <Grid
        className={view === "grid" ? "grid-view" : "list-view"} // Add grid-view or list-view class
        columns={view === "grid" ? { initial: "2", sm: "3", md: "4" } : { initial: "1", sm: "2", md: "3" }}
        gap="3"
      >
        {filteredProducts.map((product, index) => (
          <Card key={index} className="product-card">
            {/* Shared content for both views */}
            <Box>
              <img
                src={`https://myhitech.digitalmantraaz.com/` + product.photo}
                alt={product.title}
                style={{ objectFit: "cover", height: view === "grid" ? "150px" : "100px", width: "100%" }}
              />
              <Text as="p" className="line-clamp-1" size="2" mt="2">
                {product.title}
              </Text>
              <Flex className="mt-2">
                <Text as="p" className="real price">₹{product.price}/-</Text>
                <Text as="span" className="strike price">MRP ₹{Math.ceil(product.price / 0.25)}/-</Text>
              </Flex>
            </Box>
            {/* Buttons */}
            <Flex className="mt-3">
              <Button variant="soft" color="red">-</Button>
              <TextField.Root className="rounded-none mx-2" defaultValue={1} />
              <Button variant="soft" color="green">+</Button>
            </Flex>
          </Card>
        ))}
      </Grid>

      {loading && <Spinner loading={loading} size="3" />}
    </Box>
  );
}

export default Products;
