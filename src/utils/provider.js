import { ethers } from "ethers";

export const getPolygonMumbaiProvider = () => {
  return new ethers.providers.JsonRpcProvider("https://rpc-mumbai.matic.today");
};
