import { React } from "react";
import { ethers } from "ethers";

const GetAccount = async () => {
  let value = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return value;
};

export default GetAccount;
