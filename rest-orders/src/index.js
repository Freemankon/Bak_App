import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Wallet } from "wallets/near";
import { NearContext } from "helpers/context";
import { CONTRACT_ID, NETWORK_ID } from "helpers/nearHelper";
import "./index.css";
import App from "./App";

const wallet = new Wallet({
  createAccessKeyFor: CONTRACT_ID,
  networkId: NETWORK_ID,
});

const RestOrdersApp = () => {
  const [signedAccountId, setSignedAccountId] = useState("");

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  useEffect(() => {
    if (!signedAccountId) {
      wallet.signIn();
    }
  }, [signedAccountId]);

  return (
    <React.StrictMode>
      <NearContext.Provider value={{ wallet, signedAccountId }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NearContext.Provider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RestOrdersApp />);
