import { ethers } from "ethers";

export const GetAccount = async () => {
  let value = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return value;
};

export const GetBalance = async (account) => {
  let balance = await window.ethereum.request({
    method: "eth_getBalance",
    params: [account[0]],
  });
  return ethers.utils.formatUnits(balance, "ether");
};
