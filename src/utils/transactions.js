import { ethers } from "ethers";
import USDT_ABI from "./usdtAbi";
import WETH_ABI from "./wethAbi";

export const sendEther = async (amount, receiversAddress) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const transx = {
      to: receiversAddress,
      value: ethers.utils.parseEther(amount),
    };
    const signAndSend = await signer.sendTransaction(transx);
    signAndSend.wait();
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const sendUSDT = async (amount, receiversAddress) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const USDTAddress = "0xD0dF82dE051244f04BfF3A8bB1f62E1cD39eED92";
    const USDTContract = new ethers.Contract(USDTAddress, USDT_ABI, signer);
    const amountInWei = ethers.utils.parseEther(amount);
    const signerAdd = await signer.getAddress();
    const balance = await provider.getBalance(signerAdd);
    if (balance > 0) {
      const transx = await USDTContract.transfer(receiversAddress, amountInWei);
      await transx.wait();
    } else {
      alert("not enough usdt");
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendWETH = async (amount, receiversAddress) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const WETHAddress = "0x73C4cC8E0699d9205f4Da07cD322E2ae6E9b4eF2";
    const WETHContract = new ethers.Contract(WETHAddress, WETH_ABI, signer);
    const amountInWei = ethers.utils.parseEther(amount);
    const signerAdd = await signer.getAddress();
    const balance = await WETHContract.balanceOf(signerAdd);
    if (balance > 0) {
      const transx = await WETHContract.transfer(receiversAddress, amountInWei);
      await transx.wait();
    } else {
      console.log("insufficient weth....");
    }
  } catch (error) {
    console.log(error);
  }
};
