import React, { useState, useEffect } from "react";
import filterToggle from "../store/filterToggle";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { CiBoxList, CiGrid41 } from "react-icons/ci";
import { Button, TextField, Box, Flex, Select, Tabs } from "@radix-ui/themes";
import { MdClose } from "react-icons/md";
import { CiFilter } from "react-icons/ci";

function FilterBox({ setValue, selectCategory, searchValue, setView, category, tabView }) {
  const { status, toggleStatus } = filterToggle();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
    console.log(tabView);
    
  }, []);

  async function getCategories() {
    try {
      const response = await axios.get(
        "https://myhitech.digitalmantraaz.com/api/categorys"
      );
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  return (
    <div className="mb-5" style={{
        position: "sticky",
        top: "63px",
        zIndex: "2",
        background:"#697284",
        padding:"10px"

      }}>
      <Box
        className="search mb-4"
        width="100%"
        
      >
        <TextField.Root
          placeholder="Search the docs…"
          size="2"
          value={searchValue}
          onChange={(e) => setValue(e.target.value)}
        >
          <TextField.Slot>
            <IoSearch size="14" />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      <div
        className=" flex justify-between"
        
      >
        <Select.Root
          defaultValue={category} // Show "All" by default
          onValueChange={(value) => selectCategory(value)}
        >
          <Select.Trigger /> 
          <Select.Content>
            <Select.Group>
              <Select.Item value="all">All</Select.Item>
              {categories.map((category, index) => (
                <Select.Item value={category.id.toString()} key={index}>
                  {category.title}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>

        <Tabs.Root defaultValue={tabView} className="">
          <Tabs.List>
            <Tabs.Trigger value="list" onClick={() => setView("list")}>
              <CiBoxList className="me-2" /> List
            </Tabs.Trigger>
            <Tabs.Trigger value="grid" onClick={() => setView("grid")}>
              <CiGrid41 className="me-2" /> Grid
            </Tabs.Trigger> 
          </Tabs.List>
        </Tabs.Root>
        <Button className="block md:!hidden" onClick={toggleStatus} >{status ? <MdClose /> : <>Filter <CiFilter /></>}</Button>
      </div>
    </div>
  );
}

export default FilterBox;
