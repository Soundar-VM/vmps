import React, { useState, useEffect } from "react";
import axios from "axios";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IoSearch } from "react-icons/io5";
import { Button,TextField,Box,Flex,Select } from "@radix-ui/themes";

function Categories({setValue,selectCategory}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const response = await axios.get(
        "https://myhitech.digitalmantraaz.com/api/categorys"
      );
      setCategories(response.data); // Ensure API returns an array
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  return (
    <>
    <div className=" flex justify-between">

 
    <Select.Root defaultValue="Choose Categories" onValueChange={(value) => selectCategory(value)}>
      <Select.Trigger/>
      <Select.Content>
        <Select.Group>
                {
                  categories.map((category,index)=>{
                    return(
                          <Select.Item value={category.id} key={index}>{category.title}</Select.Item>
                        )
                    })
                }
        </Select.Group>
      </Select.Content>
    </Select.Root>



    <Box className="search" maxWidth="200px">
                <TextField.Root placeholder="Search the docs…" size="2" onChange={(e)=>setValue(e.target.value)}>
                    <TextField.Slot>
                        <IoSearch size="14"/>  
                    </TextField.Slot>
                </TextField.Root>
            </Box>
    </div>
    </>
  );
}

export default Categories;
