import { React } from "react";
import { ethers } from "ethers";

const GetBalance = async (account) => {
    let balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [account[0]],
    });
    return ethers.utils.formatUnits(balance, "ether");
  };

  export default GetBalance;