import { React, useContext } from "react";
import { ethers } from "ethers";
import USDT_ABI from "./usdtAbi";
import WETH_ABI from "./wethAbi";
import getSigner from "./getSigner";
import { MyContext } from "../contextApi/MyContext";

export const sendEther = async (amount, receiversAddress ) => {
  try {
    let signer = await getSigner();
    const transx = {
      to: receiversAddress,
      value: ethers.utils.parseEther(amount),
    };
    const signAndSend = await signer.sendTransaction(transx);
    signAndSend.wait();
  } catch (error) {
    console.log(error);
  }
};

export const sendUSDT = async (amount, receiversAddress, setTokenBal) => {
  try {
    let signer = await getSigner();
    console.log(signer);
    const USDTAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    const USDTContract = new ethers.Contract(USDTAddress, USDT_ABI, signer);
    const amountInWei = ethers.utils.parseEther(amount);
    const signerAdd = await signer.getAddress();
    const balance = await USDTContract.balanceOf(signerAdd);
    setTokenBal(balance);
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

export const sendWETH = async (amount, receiversAddress, setTokenBal) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const WETHAddress = "0xD0dF82dE051244f04BfF3A8bB1f62E1cD39eED92";
    const WETHContract = new ethers.Contract(WETHAddress, WETH_ABI, signer);
    const amountInWei = ethers.utils.parseEther(amount);
    const signerAdd = await signer.getAddress();
    const balance = await WETHContract.balanceOf(signerAdd);
    const balanceInWei = balance.toString();
    const balActual = ethers.utils.formatEther(balanceInWei)
    setTokenBal(balActual);
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

// export const sendERC20 = async (amount, receiversAddress, address) => {
//   const signer = getSigner();
//   const erc20Address = address;
//   const erc20Contract = new ethers.Contract(erc20Address, WETH_ABI, signer);
//   const amountInWei = ethers.utils.parseEther(amount);
//   const balance = await erc20Contract.balanceOf(signer);
//   if (balance > 0) {
//     const transx = await erc20Contract.transfer(receiversAddress, amountInWei);
//     await transx.wait();
//   } else {
//     console.log(`insufficient balance....`);
//   }
// };
