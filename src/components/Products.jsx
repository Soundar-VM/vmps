import React, { useState, useEffect } from "react";
import axios from "axios";
import {Container,Spinner,DropdownMenu,Box,Grid,Inset,Strong,Text,Card,Button,Flex,TextField,Tabs} from '@radix-ui/themes'
import Categories from "./Categories";
import { CiBoxList } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";

function Products({range,selectedValues}) {
  const [products, setProducts] = useState([]);
  // const [total, setTotal] = useState();
  // const [setList, list] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState();
  // const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // const [avail, setNomore] = useState(false);
  // const [buttons,showButtons]=useState([]);
  // const [cart,addCart]=useState([]);








  // useEffect(() => {
  //   setProducts(overallFilter(range, selectedValues));
  // }, [range, selectedValues]);



  // fetch 
  useEffect(() => {
    async function getUser() {
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
    getUser();
  }, []);
  // fetch 





  // setting Value 
  function setValue(val){
    setSearchValue(val);
    setCategory('');
    console.log(searchValue,category);
  }
  // setting Value 
  
  
  function setCategoryFilter(val){
    setCategory(val);
    setSearchValue('');
    console.log(category,searchValue);
  }


  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchValue
      ? product.title.toLowerCase().includes(searchValue.toLowerCase())
      : true;
  
    const matchesCategory = category
      ? String(product.cat_id) === String(category)
      : true;
  
    return matchesSearch && matchesCategory;
  });
  




  function overallFilter(range, selectedValues) {
    return products.filter(product => 
      product.price < range && selectedValues.includes(product.condition)
    );
  }
  
  // function overallFilter(range,selectedValue){
  //     return filteredProducts.filter(product => prod.price<range && prod.condition===searchValue);
  // }
  
  // filtering 

  
  

  return (
    <>
<Container className="relative min-h-screen">
      <Categories setValue={setValue} selectCategory={setCategoryFilter} searchValue={searchValue}/>
        

        <Tabs.Root defaultValue="list" className="my-5">
          <Tabs.List>
            <Tabs.Trigger value="list"><CiBoxList className="me-2"/> List</Tabs.Trigger>
            <Tabs.Trigger value="grid"><CiGrid41 className="me-2"/> Grid</Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="grid">
              
            <Grid
        columns={{ initial: "2", xs: "3", sm: "4", md: "5", lg: "7", xl: "8" }}
        gap="3"
        >
        {filteredProducts.map((product, index) => {
          return (
            <Card className="w-full" key={index}>
              <Box className="">
                <img
                  src={`https://myhitech.digitalmantraaz.com/`+product.photo}
                  style={{
                    display: "block",
                    objectFit: "cover",
                    maxWidth: "150px",
                    height: "150px",
                    marginRight:'20px'
                  }}
                  />
              </Box>  
              <Text as="p" className="line-clamp-1" size={{initial:'1',xs:'2'}}>
                <Strong>
                {product.title}

                </Strong>
              </Text>
              <Flex className="mt-2">
                <Text as="p" className="real price"> ₹{product.price}/- </Text>
                <Text as="span" className="strike price">MRP ₹{Math.ceil(product.price / 0.25)}/-</Text>
              </Flex>
              {
                <div className="w-full show justify-center flex mt-3" >
                {/* <Flex className="">
                    <Button variant="soft"  color="red">-</Button>
                    <TextField.Root className="rounded-none w-[40px] mx-2 border-none bg-gray-200 center p-1" defaultValue={1}>
                    </TextField.Root>
                    <Button variant="soft"  color="green">+</Button>
                  </Flex> */}
              </div>   
              }
             <Button className="block w-full text-center" color="grass" style={{width:"100%",marginTop:"8px"}} variant="soft" onClick={() => addToCart(product.id)}>
              Add
            </Button>

            </Card>
          );
        })}
      </Grid>
            </Tabs.Content>

            <Tabs.Content value="list">
            <Grid
        columns={{ initial: "1", xs: "1", sm: "2", md: "3", lg: "3", xl: "4" }}
        gap="3"
        >
            {filteredProducts.map((product, index) => {
          return (
            <Card className="w-full" key={index}>
              <Flex justify="around">
              <Inset clip="padding-box" className=" pt-2 flex justify-center" side="top" pb="current">
                <img
                  src={`https://myhitech.digitalmantraaz.com/`+product.photo}
                  style={{
                    display: "block",
                    objectFit: "cover",
                    maxWidth: "100px",
                    height: "100px"
                  }}
                  />
              </Inset>  
              <Box>
              <Text as="p" className="line-clamp-1" size={{initial:'1',xs:'2'}}>
                <Strong>
                {product.title}

                </Strong>
              </Text>
              <Flex className="mt-2">
                <Text as="p" className="real price"> ₹{product.price}/- </Text>
                <Text as="span" className="strike price">MRP ₹{Math.ceil(product.price / 0.25)}/-</Text>
              </Flex>
              {
                <div className="w-full show justify-center flex mt-3" >
                {/* <Flex className="">
                    <Button variant="soft"  color="red">-</Button>
                    <TextField.Root className="rounded-none w-[40px] mx-2 border-none bg-gray-200 center p-1" defaultValue={1}>
                    </TextField.Root>
                    <Button variant="soft"  color="green">+</Button>
                  </Flex> */}
              </div>   
              }
             <Button className="block w-full text-center" color="grass" style={{width:"100%",marginTop:"8px"}} variant="soft" onClick={() => addToCart(product.id)}>
              Add
            </Button>
              </Box>

              </Flex>
              

            </Card>
          );
        })}
        </Grid>

            {/* <table class="table" style={{width:'100%'}}>
                <thead>
                  <th>S.No</th>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qnt</th>
                  <th>Total</th>
                  <th>Add</th>
                </thead>
                <tbody>
                  {
                  filteredProducts.map((product,index)=>{
                    return(
                      <tr style={{border:"1px solid white"}}>
                        <td className="text-center border-1" data-label="S.No">{index+1}</td>
                        <td className="text-center border-1" data-label="Image">
                        <img
                              src={`https://myhitech.digitalmantraaz.com/`+product.photo}
                              style={{
                                display: "block",
                                objectFit: "cover",
                                maxWidth: "40px",
                                height: "40px"
                              }}
                              />
                          </td>
                        <td className="text-center border-1" data-label="Name">{product.title}</td>
                        <td className="text-center border-1" data-label="Price"> <span style={{textDecoration:"line-through",color:'#454545'}}>₹{Math.ceil(product.price-(product.price * 75/100))}/-</span> <span className="ms-2">₹{Math.ceil((product.price))}/-</span></td>
                        <td className="text-center border-1" data-label="Qnt">
                        <div className="show flex justify-center mt-3" >
                          <Flex className="">
                              <Button variant="soft" color="red" className="px-1">-</Button>
                              <TextField.Root className="rounded-none w-[40px] border-none bg-gray-200 text-center p-1" defaultValue={1}>
                              </TextField.Root>
                              <Button variant="soft" color="green" className="px-1">+</Button>
                            </Flex>
                        </div> 
                        </td>
                        <td className="text-center border-1" data-label="Name">{product.price}</td>
                        <td className="text-center border-1" data-label="addtocart">
                          <Button onClick={()=>addToCart(product.id)}>Add</Button>
                        </td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </table> */}
            </Tabs.Content>
          </Box>
        </Tabs.Root>

      
      <Spinner loading={loading} size="3" style={{position:"absolute",top:"50%",left:"50%"}} />

      {/* <Flex style={{ justifyContent: "center", margin: "20px" }}>
            {!avail ? (
              <Button
                className={loading ? "hidden" : "block"}
                onClick={() => setPage((page) => page + 1)}
              >
                {loading ? <Spinner loading={loading} /> : "Load more"}
              </Button>
            ) : (
              "No More Products"
            )}
          </Flex> */}


          
        </Container>
      
    </>
  );
}

export default Products;

