import logo from './logo.svg';
import './App.css';
import React from "react";
import Entry from "./components/Entry";
import {ChakraProvider, theme } from "@chakra-ui/react";

function App() {
  return (
   <div>
       <ChakraProvider theme={theme}>
           <Entry />
       </ChakraProvider>
   </div>
  );
}

export default App;
