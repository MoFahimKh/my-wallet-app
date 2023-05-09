import { AlphaRouter } from "@uniswap/smart-order-router";
import { CurrencyAmount, TradeType, Percent, Token } from "@uniswap/sdk-core";
import { ethers, BigNumber } from "ethers";
import JSBI from "jsbi";
import ERC20_ABI from "../utils/erc20Abi";
import {
  WETH_TOKEN,
  LINK_TOKEN,
  WMATIC_TOKEN,
} from "../utils/tokenInfoConstants";

const v3SwaprouterAddress = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
const chainId = 80001;
const tknDecimal = 18;
const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78"
);
const router = new AlphaRouter({ chainId: chainId, provider: provider });

// const WETH = new Token(
//   chainId,
//   WETH_TOKEN.address,
//   WETH_TOKEN.decimal,
//   WETH_TOKEN.symbol,
//   WETH_TOKEN.name
// );

// const WMATIC = new Token(
//   chainId,
//   WMATIC_TOKEN.address,
//   WMATIC_TOKEN.decimal,
//   WMATIC_TOKEN.symbol,
//   WMATIC_TOKEN.name
// );
// const LINK = new Token(
//   chainId,
//   LINK_TOKEN.address,
//   LINK_TOKEN.decimal,
//   LINK_TOKEN.symbol,
//   LINK_TOKEN.name
// );
export const wethContract = () =>
  new ethers.Contract(WETH_TOKEN.address.toString(), ERC20_ABI, provider);
export const wmaticContract = () =>
  new ethers.Contract(WMATIC_TOKEN.address.toString(), ERC20_ABI, provider);
export const linkContract = () =>
  new ethers.Contract(LINK_TOKEN.address.toString(), ERC20_ABI, provider);

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

export const getPrice = async (
  inputAmount,
  slippageAmount,
  deadline,
  walletAddress,
  inputTokenSelected,
  outputTokenSelected
) => {
  const percentSlippage = new Percent(slippageAmount, tknDecimal);
  const wei = ethers.utils.parseUnits(inputAmount.toString());
  const inputToken = getToken(inputTokenSelected);
  console.log(inputToken);
  const outputToken = getToken(outputTokenSelected);
  console.log(outputToken);
  const currencyAmount = CurrencyAmount.fromRawAmount(
    inputToken,
    JSBI.BigInt(wei)
  );
  const route = await router.route(
    currencyAmount,
    outputToken,
    TradeType.EXACT_INPUT,
    {
      recipient: walletAddress,
      slippageTolerance: percentSlippage,
      deadline: deadline,
    }
  );
  const transaction = {
    data: route.methodParameters.calldata,
    to: v3SwaprouterAddress,
    value: BigNumber.from(route.methodParameters.value),
    from: walletAddress,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(1000000),
  };

  const quoteAmountOut = route.quote.toFixed(6);
  const ratio = (inputAmount / quoteAmountOut).toFixed(3);
  return [transaction, quoteAmountOut, ratio];
};

export const runSwap = async (transaction, signer, inputTokenSelected) => {
  const approvalAmount = ethers.utils.parseUnits("10", 18).toString();
  let contract0;
  if (inputTokenSelected === "WETH") {
    contract0 = wethContract();
  } else if (inputTokenSelected === "WMATIC") {
    contract0 = wmaticContract();
  } else if ((inputTokenSelected = "LINK")) {
    linkContract();
  }
  await contract0.connect(signer).approve(v3SwaprouterAddress, approvalAmount);
  signer.sendTransaction(transaction);
};
