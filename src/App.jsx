import React,{ useEffect, useState } from "react";
import filterToggle from "./store/filterToggle";
import theme from "./store/theme";
import "@radix-ui/themes/styles.css";
import { Theme, CheckboxGroup, Box, DropdownMenu,RadioGroup } from "@radix-ui/themes";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const {status} = filterToggle();
  const {themeStatus} = theme();
  const [selectedValues, setSelectedValues] = useState(["night"]);
  const [range, setRange] = useState('0');



  return (
    <>
      <Theme
        accentColor="blue"
        radius="rounded-none large"
        scaling="100%"
        appearance={themeStatus}
      >
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sticky top-0">
          <div className="filter-box sm:col-span-12 md:col-span-3 lg:col-span-2 md:block xs:hidden" style={{display:status?"block":"none"}}>
            <Box maxWidth="600px" className="sticky top-10">
              <CheckboxGroup.Root defaultValue={["night"]} name="example">
                <CheckboxGroup.Item value="night">Night</CheckboxGroup.Item>
                <CheckboxGroup.Item value="kids">Kids</CheckboxGroup.Item>
                <CheckboxGroup.Item value="day">day</CheckboxGroup.Item>

                <DropdownMenu.Separator />
                <CheckboxGroup.Item value="new">
                  New Collection
                </CheckboxGroup.Item>
                <CheckboxGroup.Item value="2025">
                  2025 Collections
                </CheckboxGroup.Item>
              </CheckboxGroup.Root>
                <DropdownMenu.Separator />
                <RadioGroup.Root  name="example" onValueChange={(value)=>setRange(value)}>
                  <RadioGroup.Item value="200">below 200</RadioGroup.Item>
                  <RadioGroup.Item value="500">201 - 500</RadioGroup.Item>
                  <RadioGroup.Item value="700">501 - 700</RadioGroup.Item>
                  <RadioGroup.Item value="1000">701 - 1000</RadioGroup.Item>
                  <RadioGroup.Item value="10000">1000 Above</RadioGroup.Item>
                </RadioGroup.Root>
            </Box>
          </div>
          <div className="sm:col-span-12 md:col-span-9 lg:col-span-10">
            <Products range={range} selectedValues={selectedValues}/>
          </div>
        </div>
      </Theme>
    </>
  );
}
export default App;
