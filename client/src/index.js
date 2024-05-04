import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CurrentUserContextProvider } from "./context/currentUserContext/currentUserContext";
import { ShowAuthContextProvider } from "./context/showAuthContext/showAuthContext";
import { ShowEditContextProvider } from "./context/showEditContext copy/showEditContext ";
import { ShowSellContextProvider } from "./context/showSellContext/showSellContext";
import { MetaMaskProvider } from "@metamask/sdk-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ShowAuthContextProvider>
    <ShowSellContextProvider>
      <ShowEditContextProvider>
        <CurrentUserContextProvider>
          {/* <App /> */}
          <MetaMaskProvider
            debug={false}
            sdkOptions={{
              dappMetadata: {
                name: "Example React Dapp",
                url: window.location.href,
              },
              // infuraAPIKey: process.env.INFURA_API_KEY,
              // Other options.
            }}
          >
            <App />
          </MetaMaskProvider>
        </CurrentUserContextProvider>
      </ShowEditContextProvider>
    </ShowSellContextProvider>
  </ShowAuthContextProvider>
);
