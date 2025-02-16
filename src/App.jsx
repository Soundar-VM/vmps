import { useState } from "react";
import "@radix-ui/themes/styles.css";
import { Theme, CheckboxGroup, Box, DropdownMenu } from "@radix-ui/themes";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Theme
        accentColor="blue"
        radius="rounded-none large"
        scaling="100%"
        appearance="dark"
      >
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="sm:col-span-12 md:col-span-3 lg:col-span-2 md:block sm:hidden  p-4">
            <Box maxWidth="600px" className="sticky top-10">
              <CheckboxGroup.Root defaultValue={["night"]} name="example">
                <CheckboxGroup.Item value="night">Night</CheckboxGroup.Item>
                <CheckboxGroup.Item value="kids">Kids</CheckboxGroup.Item>
                <CheckboxGroup.Item value="day">day</CheckboxGroup.Item>
                <DropdownMenu.Separator />
                <CheckboxGroup.Item value="offer">Offer</CheckboxGroup.Item>
                <CheckboxGroup.Item value="200">₹10 - ₹200</CheckboxGroup.Item>
                <CheckboxGroup.Item value="600">₹201 - ₹600</CheckboxGroup.Item>
                <CheckboxGroup.Item value="1000">
                  ₹601 - ₹1000
                </CheckboxGroup.Item>
                <CheckboxGroup.Item value="1500">
                  ₹1001 - ₹1500
                </CheckboxGroup.Item>
                <CheckboxGroup.Item value="2000">
                  ₹1501 and above
                </CheckboxGroup.Item>

                <DropdownMenu.Separator />
                <CheckboxGroup.Item value="new">
                  New Collection
                </CheckboxGroup.Item>
              </CheckboxGroup.Root>
            </Box>
          </div>
          <div className="sm:col-span-12 md:col-span-9 lg:col-span-10 p-4">
            <Products />
          </div>
        </div>
      </Theme>
    </>
  );
}
export default App;
