import { Token } from "@uniswap/sdk-core";

const getTokenInstance = async (chainId, tknAddress, tknDecimal, tknSymbol, tknName) => {
  let token = new Token(chainId, tknAddress, tknDecimal, tknSymbol, tknName);
  return token;
};
export default getTokenInstance;
