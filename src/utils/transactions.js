import { ethers } from "ethers";
import USDT_ABI from "./usdtAbi";

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
    const USDTAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    const USDTContract = new ethers.Contract(USDTAddress, USDT_ABI, signer);
    const amountInWei = ethers.utils.parseEther(amount);
    const signerAdd = await signer.getAddress();
    const balance = await provider.getBalance(signerAdd);
    if (balance > 0) {
      const transx = await USDTContract.transfer(receiversAddress, amountInWei);
      await transx.wait();
    } else {
      console.log("not enough usdt");
      alert("not enough usdt");
    }
  } catch (error) {
    console.log(error);
  }
};
