import { React } from "react";
import { ethers } from "ethers";
import {
  MAINNET_PARAMS,
  SEPOLIA_PARAMS,
  MUMBAI_PARAMS,
} from "../utils/NetParams";

const SetNetwork = async (value) => {
  let params = null;
  if (value === "0x1") {
    params = MAINNET_PARAMS;
  } else if (value === "0xaa36a7") {
    params = SEPOLIA_PARAMS;
  } else if(value === "0x13881") {
    params = MUMBAI_PARAMS;
  }
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [params],
  });
};

export default SetNetwork;
