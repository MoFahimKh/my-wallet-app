import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SendToken from "../components/SendToken";
import MyNavbar from "../components/Navbar";
import { MyContext } from "../contextApi/MyContext";

const Home = () => {
  const [account, setAccount] = useState(null);
  const [walletAddress, setWalletAddress] = useState("Connect!");
  const [accBalance, setAccBalance] = useState("");
  const [selectedOption, setSelectedOption] = useState("0xaa36a7");
  const [isTransactionComplete, setIsTransactionComplete] = useState(false);

  return (
    <>
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
          setIsTransactionComplete
        }}
      >
        <MyNavbar />
        <SendToken />
      </MyContext.Provider>
    </>
  );
};

export default Home;
