import React, { useState, useEffect } from "react";
import axios from "axios";
import {Container,Spinner,DropdownMenu,Box,Grid,Inset,Strong,Text,Card,Button,Flex,TextField,Tabs} from '@radix-ui/themes'
import Categories from "./Categories";
import { CiBoxList } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";

function Products() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState();
  const [setList, list] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [avail, setNomore] = useState(false);
  const [buttons,showButtons]=useState([]);
  const [cart,addCart]=useState([]);


// useEffect(()=>{
  
// },[])

  useEffect(() => {
    getUser();
  }, [searchValue]);




  // fetch 
  async function getUser() {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://myhitech.digitalmantraaz.com/api/allproducts`
      );
        // setTotal(response.data);
        setProducts(response.data);
        console.log(response.data);
        
      
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
  // fetch 





  // setting Value 
  function setValue(val){
    setSearchValue(val);
    console.log(val);
  }
  // setting Value 



  // filtering 
  const filteredProducts = products.filter((prod) => prod.title.toLowerCase().includes(searchValue.toLowerCase()));
  
  
  // filtering 

  
  

  return (
    <>
<Container className="relative min-h-screen">
      <Categories setValue={setValue} selectCategory={setCategory}/>
        <Tabs.Root defaultValue="documents" className="mb-2">
          <Tabs.List color="cyan">
            <Tabs.Trigger value="account"></Tabs.Trigger>
            <Tabs.Trigger value="documents"></Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>

        <Tabs.Root defaultValue="documents">
          <Tabs.List>
            <Tabs.Trigger value="account"><CiBoxList className="me-2"/> List</Tabs.Trigger>
            <Tabs.Trigger value="documents"><CiGrid41 className="me-2"/> Grid</Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="documents">
              
            <Grid
        columns={{ initial: "2", xs: "3", sm: "4", md: "5", lg: "7", xl: "8" }}
        gap="3"
        >
        {filteredProducts.map((product, index) => {
          return (
            <Card className="w-full" key={index}>
              <Inset clip="padding-box" className=" pt-2 flex justify-center" side="top" pb="current">
                <img
                  src={`https://myhitech.digitalmantraaz.com/`+product.photo}
                  style={{
                    display: "block",
                    objectFit: "cover",
                    maxWidth: "150px",
                    height: "150px"
                  }}
                  />
              </Inset>  
              <Text as="p" className="line-clamp-1" size={{initial:'1',xs:'2'}}>
                <Strong>
                {product.title}

                </Strong>
              </Text>
              <Flex>
                <Text as="p" className="real price"> ₹{product.price}/- </Text>
                <Text as="span" className="strike price">MRP ₹{Math.ceil(product.price-(product.price * 75/100))}/-</Text>
              </Flex>
              {
                <div className="show flex justify-center mt-3" >
                <Flex className="">
                    <Button variant="soft" radius="full" color="red">-</Button>
                    <TextField.Root className="rounded-none w-[40px] mx-2 border-none bg-gray-200 text-center p-1" defaultValue={1}>
                    </TextField.Root>
                    <Button variant="soft" radius="full" color="green">+</Button>
                  </Flex>
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

            <Tabs.Content value="account">
            <table class="table" style={{width:'100%'}}>
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
                        <Box maxWidth="60px">
                          <TextField.Root size="2" defaultValue={1} />
                        </Box>
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
              </table>
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
