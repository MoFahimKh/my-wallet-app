import { ethers } from "ethers";
const getTokenContract = (tknAddress, WETH_ABI, provider) =>{
   return new ethers.Contract(tknAddress, WETH_ABI, provider);
};
export default getTokenContract;