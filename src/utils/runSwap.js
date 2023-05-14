import {
  wethContract,
  wmaticContract,
  linkContract,
} from "./alphaRouterService";
import { ethers } from "ethers";

const v3SwaprouterAddress = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
const runSwap = async (transaction, signer, inputTokenSelected) => {
  const approvalAmount = ethers.utils.parseUnits("10", 18).toString();
  let contract0;

  switch (inputTokenSelected) {
    case "WETH":
      contract0 = wethContract();
      break;
    case "WMATIC":
      contract0 = wmaticContract();
      break;
    case "LINK":
      contract0 = linkContract();
      break;
    default:
      contract0 = wethContract();
      break;
  }

  await contract0.connect(signer).approve(v3SwaprouterAddress, approvalAmount);
  signer.sendTransaction(transaction);
};

export default runSwap;
