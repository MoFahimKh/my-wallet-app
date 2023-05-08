import { AlphaRouter } from "@uniswap/smart-order-router";
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";
import { ethers, BigNumber } from "ethers";
import JSBI from "jsbi";
import WETH_ABI from "../utils/wethAbi";

const v3SwaprouterAddress = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
const chainId = 80001;
const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78");
const router = new AlphaRouter({ chainId: chainId, provider: provider });

const tknName = "Wrapped Ether";
const tknSymbol = "WETH";
const tknDecimal = 18;
const tknAddress = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa";

const tkn1Name = "Wrapped Matic";
const tkn1Symbol = "WMATIC";
const tkn1Decimal = 18;
const tkn1Address = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889";

const WETH = new Token(chainId, tknAddress, tknDecimal, tknSymbol, tknName);
const WMATIC = new Token(
  chainId,
  tkn1Address,
  tkn1Decimal,
  tkn1Symbol,
  tkn1Name
);

export const wethContract = () =>
  new ethers.Contract(tknAddress, WETH_ABI, provider);
export const wmaticContract = () =>
  new ethers.Contract(tkn1Address, WETH_ABI, provider);

export const getPrice = async (
  inputAmount,
  slippageAmount,
  deadline,
  walletAddress
) => {
  const percentSlippage = new Percent(slippageAmount, tknDecimal);
  const wei = ethers.utils.parseUnits(inputAmount.toString());
  console.log(wei.toString());
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
