import { ethers } from "ethers";
import WETH_ABI from "./wethAbi";

const getTokenBalance = async (setTokenBal) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const WETHAddress = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa";
  const WETHContract = new ethers.Contract(WETHAddress, WETH_ABI, signer);
  const signerAdd = await signer.getAddress();
  const balance = await WETHContract.balanceOf(signerAdd);
  const balanceInWei = balance.toString();
  const balActual = ethers.utils.formatEther(balanceInWei);
   setTokenBal(balActual.slice(0,7));
};

export default getTokenBalance;
