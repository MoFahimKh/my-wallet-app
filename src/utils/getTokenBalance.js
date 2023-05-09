import { ethers } from "ethers";
import ERC20_ABI from "./erc20Abi";
import { WETH_TOKEN, WMATIC_TOKEN, LINK_TOKEN } from "./tokenInfoConstants";

const getTokenBalance = async (setTokenBal, inputTokenSelected) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let tokenContract;
  if (inputTokenSelected === "WETH") {
    tokenContract = new ethers.Contract(
      WETH_TOKEN.address.toString(),
      ERC20_ABI,
      signer
    );
  } else if (inputTokenSelected === "WMATIC") {
    tokenContract = new ethers.Contract(
      WMATIC_TOKEN.address.toString(),
      ERC20_ABI,
      signer
    );
  } else if (inputTokenSelected === "LINK") {
    tokenContract = new ethers.Contract(
      LINK_TOKEN.address.toString(),
      ERC20_ABI,
      signer
    );
  } else {
    throw new Error("error occured in above else-if!");
  }

  const signerAdd = await signer.getAddress();
  const balance = await tokenContract.balanceOf(signerAdd);
  const balanceInWei = balance.toString();
  const balActual = ethers.utils.formatEther(balanceInWei);
  setTokenBal(balActual.slice(0, 7));
};

export default getTokenBalance;
