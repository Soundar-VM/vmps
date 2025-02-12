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
  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [avail, setNomore] = useState(false);
  const [buttons,showButtons]=useState([]);
  const [cart,addCart]=useState([]);


// useEffect(()=>{
  
// },[])

  useEffect(() => {
    getUser();
  }, [page]);




  // fetch 
  async function getUser() {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://myhitech.digitalmantraaz.com/api/products?page=${page}`
      );
      if (response.data.data.length === 0) {
        setNomore(true);
      }
      else{
        setTotal(response.data);
        setProducts((prev)=>[...prev,...response.data.data]);

      }
      
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
  // fetch 


  //   backend filter 
// async function searchFilter(){
//   if(search.length>4){
//       console.log('done');
      
//       try {
//         const response = await axios.post(
//           `https://myhitech.digitalmantraaz.com/api/searchproduct`,{search}
//         );
//         console.log(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//   }
// }



//   backend filter 






  // setting Value 
  function setValue(val){
    setSearchValue(val);
    console.log(val);
  }
  // setting Value 



  // filtering 
  const searchFilter = products.filter((prod)=>prod.title.toLowerCase().includes(searchValue.toLowerCase()));

  const categoryFilter = products.filter((prod)=>prod.cat_id === category );
  
  // filtering 

  
  

  return (
    <>
<Container className="relative min-h-screen">
      <Categories setValue={setValue} selectCategory={setCategory}/>
        <Tabs.Root defaultValue="account" className="mb-2">
          <Tabs.List color="cyan">
            <Tabs.Trigger value="account"><CiBoxList /></Tabs.Trigger>
            <Tabs.Trigger value="documents"><CiGrid41 /></Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      <Grid
        columns={{ initial: "2", xs: "3", sm: "4", md: "5", lg: "7", xl: "8" }}
        gap="3"
        >
        {searchFilter.map((product, index) => {
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
      <Spinner loading={loading} size="3" style={{position:"absolute",top:"50%",left:"50%"}} />

      <Flex style={{ justifyContent: "center", margin: "20px" }}>
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
          </Flex>
          
        </Container>
      
    </>
  );
}

export default Products;
