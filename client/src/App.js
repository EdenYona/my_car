import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Car from "./pages/car/Car";
import EditForm from "./pages/editForm/EditForm";
import { ShowEditContext } from "./context/showEditContext copy/showEditContext ";
import { useContext, useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";

function App() {
  const { showEdit } = useContext(ShowEditContext);
  const [account, setAccount] = useState();

  // const connect = async () => {
  //   console.log("connecting..");
  //   try {
  //     const accounts = await sdk?.connect();
  //     console.log(accounts, connected, connecting, provider, chainId);
  //     setAccount(accounts?.[0]);
  //   } catch (err) {
  //     console.warn("failed to connect..", err);
  //   }
  // };

  // const send = async () => {
  //   console.log("sending..");
  //   console.log(account, connected, connecting, provider, chainId);
  //   try {
  //     provider.request({
  //       method: "eth_sendTransaction",
  //       params: [
  //         {
  //           from: `${account?.substring(0, 8)}...`,
  //           to: "0x6B8763cBF3D796E2AC96A39C7ad0D81F3873612E",
  //           value: "0x0",
  //           gasLimit: '0x5028',
  //           // Customizable by the user during MetaMask confirmation.
  //           maxPriorityFeePerGas: '0x3b9aca00',
  //           // Customizable by the user during MetaMask confirmation.
  //           maxFeePerGas: '0x2540be400',
  //         }
  //       ]
  //     }
  //   );
  //   } catch (err) {
  //     console.warn("failed to send request..", err);
  //   }
  // };

  // useEffect(() => {
  //   console.log("initializing");
  //   if (!connected && !connecting) {
  //     connect();
  //   }

  //   if(connected) {
  //     console.log("connected");
  //     send();
  //   }
  // }, [connected, connecting]);

  return (
    // <>
    // {connected  && (<Router>
    //   {showEdit && <EditForm />}
    //   <Routes>
    //     <Route exact path="/" element={<Home />} />
    //     <Route path="/search" element={<Search />} />
    //     <Route path="/car/:id" element={<Car />} />
    //   </Routes>
    // </Router>)}
    // </>

<Router>
{showEdit && <EditForm />}
<Routes>
  <Route exact path="/" element={<Home />} />
  <Route path="/search" element={<Search />} />
  <Route path="/car/:id" element={<Car />} />
</Routes>
</Router>
  );
}

export default App;
