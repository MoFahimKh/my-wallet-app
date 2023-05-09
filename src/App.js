import { Routes, Route } from "react-router-dom";
import { React, useState } from "react";
import { MyContext } from "../src/contextApi/MyContext";
import "./App.css";
import Home from "./pages/Home";
import Swap from "./pages/Swap";

function App() {
  const [account, setAccount] = useState(null);
  const [walletAddress, setWalletAddress] = useState("Connect!");
  const [accBalance, setAccBalance] = useState("");
  const [selectedOption, setSelectedOption] = useState("0xaa36a7");
  const [isTransactionComplete, setIsTransactionComplete] = useState(false);
  const [tokenBal, setTokenBal] = useState(null);
  const [slippageTolerance, setSlippageTolerance] = useState("2");
  const [transactionDeadline, setTransactionDeadline] = useState("10");
  const [swapRatio, setSwapRatio] = useState(null);
  const [swappedPrice, setSwappedPrice] = useState(0);
  const [swapTransaction, setSwapTransaction] = useState(null);
  const [inputTokenSelected, setInputTokenSelected] = useState(null);
  const [outputTokenSelected, setOutputTokenSelected] = useState(null);

  return (
    <div className="main">
      <MyContext.Provider
        value={{
          account,
          setAccount,
          walletAddress,
          setWalletAddress,
          accBalance,
          setAccBalance,
          selectedOption,
          setSelectedOption,
          isTransactionComplete,
          setIsTransactionComplete,
          tokenBal,
          setTokenBal,
          slippageTolerance,
          setSlippageTolerance,
          transactionDeadline,
          setTransactionDeadline,
          swapRatio,
          setSwapRatio,
          swappedPrice,
          setSwappedPrice,
          swapTransaction,
          setSwapTransaction,
          inputTokenSelected,
          setInputTokenSelected,
          outputTokenSelected,
          setOutputTokenSelected,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="swap" element={<Swap />} />
        </Routes>
      </MyContext.Provider>
    </div>
  );
}

export default App;
