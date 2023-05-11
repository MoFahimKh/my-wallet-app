import { WETH_TOKEN, LINK_TOKEN, WMATIC_TOKEN } from "./tokenInfoConstants";
import { Token } from "@uniswap/sdk-core";

const chainId = 80001;
const getToken = (tokenName) => {
  switch (tokenName) {
    case "WETH":
      return new Token(
        chainId,
        WETH_TOKEN.address,
        WETH_TOKEN.decimal,
        WETH_TOKEN.symbol,
        WETH_TOKEN.name
      );
    case "WMATIC":
      return new Token(
        chainId,
        WMATIC_TOKEN.address,
        WMATIC_TOKEN.decimal,
        WMATIC_TOKEN.symbol,
        WMATIC_TOKEN.name
      );
    case "LINK":
      return new Token(
        chainId,
        LINK_TOKEN.address,
        LINK_TOKEN.decimal,
        LINK_TOKEN.symbol,
        LINK_TOKEN.name
      );
    default:
      return new Token(
        chainId,
        WETH_TOKEN.address,
        WETH_TOKEN.decimal,
        WETH_TOKEN.symbol,
        WETH_TOKEN.name
      );
  }
};
export default getToken;
