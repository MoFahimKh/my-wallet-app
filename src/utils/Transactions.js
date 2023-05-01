import { React } from "react";
import { ethers } from "ethers";

const SendTransaction = async (amount, receiversAddress) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const receiversAddress = receiversAddress;
    const amount = amount ;
    const transx = {
      to: receiversAddress,
      value: ethers.utils.parseEther(amount),
    };

    const signAndSend = await signer.sendTransaction(transx);
    signAndSend.wait();
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
};

export default SendTransaction;
