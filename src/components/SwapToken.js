import { Form, Button } from "react-bootstrap";
import { React, useContext, useState, useEffect } from "react";
import "../App.css";
import { GearFill } from "react-bootstrap-icons";
import SwapConfigs from "./SwapConfigs";
import { MyContext } from "../contextApi/MyContext";
import getTokenBalance from "../utils/getTokenBalance";
import CoinIcon from "./CoinIcon";
import getSigner from "../utils/getSigner";
import { getPrice } from "../utils/alphaRouterService";
import { getAccount } from "../utils/ethereum";
import SelectTokenDropdown from "./SelectTokenDropdown";
import runSwap from "../utils/runSwap";
import { BeatLoader } from "react-spinners";

const SwapToken = () => {
  const [clicked, setClicked] = useState(false);
  const [inputAmount, setInputAmount] = useState(0);
  const [inputFieldFilled, setInputFieldFilled] = useState(false);
  const [priceFetched, setPriceFetched] = useState(false);
  let signerAddress;
  const getSignerAddress = async () => {
    const signerAddressArray = await getAccount();
    signerAddress = signerAddressArray[0];
  };
  const handleChange = (event) => {
    setInputAmount(event.target.value);
    setInputFieldFilled(true);
  };

  const {
    tokenBal,
    setTokenBal,
    slippageTolerance,
    transactionDeadline,
    swapRatio,
    setSwapRatio,
    setSwappedPrice,
    swapTransaction,
    setSwapTransaction,
    inputTokenSelected,
    outputTokenSelected,
  } = useContext(MyContext);

  useEffect(() => {
    if (inputFieldFilled) {
      getPrice(
        inputAmount,
        slippageTolerance,
        Math.floor(Date.now() / 1000 + transactionDeadline * 60),
        signerAddress,
        inputTokenSelected,
        outputTokenSelected
      ).then((data) => {
        console.log(data);
        setSwapTransaction(data[0]);
        setSwappedPrice(data[1]);
        setSwapRatio(data[2]);
        setInputFieldFilled(false);
        setPriceFetched(true);
      });
    }
    getSignerAddress();
  }, [inputAmount, inputTokenSelected, outputTokenSelected, inputFieldFilled]);

  return (
    <div className="body">
      <div className="formContainer">
        <Form>
          <span
            className="gear-icon"
            onClick={() => {
              clicked === false ? setClicked(true) : setClicked(false);
            }}
          >
            <GearFill /> Settings
          </span>
          {clicked === true && <SwapConfigs />}
          <Form.Group>
            <SelectTokenDropdown typeOfToken="input" />
            <Form.Label>
              {inputTokenSelected}{" "}
              {
                <CoinIcon
                  coinId={
                    inputTokenSelected === "WMATIC"
                      ? "matic-network"
                      : inputTokenSelected === "LINK"
                      ? "chainlink"
                      : "weth"
                  }
                />
              }
            </Form.Label>{" "}
            <Form.Control
              type="text"
              placeholder="Enter amount"
              value={inputAmount}
              onChange={handleChange}
            />
            {getTokenBalance(setTokenBal, inputTokenSelected) && (
              <Form.Label className="">{`${inputTokenSelected} balance : ${tokenBal}`}</Form.Label>
            )}
          </Form.Group>
          <SelectTokenDropdown typeOfToken="output" />
          <div>{`1 ${outputTokenSelected} = ${swapRatio} ${inputTokenSelected} `}</div>
          <Form.Group>
            <Form.Label>
              {outputTokenSelected}{" "}
              {
                <CoinIcon
                  coinId={
                    outputTokenSelected === "WMATIC"
                      ? "matic-network"
                      : outputTokenSelected === "LINK"
                      ? "chainlink"
                      : "weth"
                  }
                />
              }
            </Form.Label>{" "}
            <div>
              {inputAmount &&
                (priceFetched ? (
                  <Form.Control
                    type="text"
                    placeholder=""
                    readOnly
                    value={inputAmount / swapRatio}
                  />
                ) : (
                  <BeatLoader />
                ))}
            </div>
            <Form.Label></Form.Label>
          </Form.Group>
          <Button
            className=""
            variant="outline-dark"
            onClick={async () => {
              const signer = await getSigner();
              runSwap(swapTransaction, signer);
            }}
            disabled={!priceFetched} // disable the button if priceFetched is false
          >
            Swap
          </Button>

          <Form.Label></Form.Label>
        </Form>
      </div>
    </div>
  );
};

export default SwapToken;
