import { AlphaRouter } from "@uniswap/smart-order-router";
import { CurrencyAmount, TradeType, Percent, Token } from "@uniswap/sdk-core";
import { ethers, BigNumber } from "ethers";
import JSBI from "jsbi";
import ERC20_ABI from "../utils/erc20Abi";
import getTokenInstance from "../utils/getTokenInstance";
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

const WETH = new Token(
  chainId,
  WETH_TOKEN.address,
  WETH_TOKEN.decimal,
  WETH_TOKEN.symbol,
  WETH_TOKEN.name
);

const WMATIC = new Token(
  chainId,
  WMATIC_TOKEN.address,
  WMATIC_TOKEN.decimal,
  WMATIC_TOKEN.symbol,
  WMATIC_TOKEN.name
);

export const wethContract = () =>
  new ethers.Contract(WETH_TOKEN.address.toString(), ERC20_ABI, provider);
export const wmaticContract = () =>
  new ethers.Contract(WMATIC_TOKEN.address.toString(), ERC20_ABI, provider);

export const getPrice = async (
  inputAmount,
  slippageAmount,
  deadline,
  walletAddress
) => {
  const percentSlippage = new Percent(slippageAmount, tknDecimal);
  const wei = ethers.utils.parseUnits(inputAmount.toString());
  console.log(wei.toString());
  console.log(WETH_TOKEN.address.toString());
  const currencyAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei));
  const route = await router.route(
    currencyAmount,
    WMATIC,
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

export const runSwap = async (transaction, signer) => {
  const approvalAmount = ethers.utils.parseUnits("10", 18).toString();
  const contract0 = wethContract();
  await contract0.connect(signer).approve(v3SwaprouterAddress, approvalAmount);
  signer.sendTransaction(transaction);
};
