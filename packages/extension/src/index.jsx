import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import TransactionProvider from "./contexts/TransactionContext";
import Popup from "./Popup";

import "./index.css";

const container = window.document.querySelector("#app-container");
const root = createRoot(container);

// get tabId of the tab that opened the popup to establish connection with FCL
const fclTabId = Number(
  new URLSearchParams(window.location.search).get("tabId")
);

console.log("fclTabId AAA =>", fclTabId, new URLSearchParams(window.location.search))

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <TransactionProvider>
        <Popup fclTabId={fclTabId}/>
      </TransactionProvider>
    </ChakraProvider>
  </React.StrictMode>
);
