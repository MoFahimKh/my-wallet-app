import { Form, Button } from "react-bootstrap";
import { React, useContext, useState, useEffect } from "react";
import "../App.css";
import { GearFill } from "react-bootstrap-icons";
import SwapConfigs from "./SwapConfigs";
import { MyContext } from "../contextApi/MyContext";
import getTokenBalance from "../utils/getTokenBalance";
import CoinIcon from "./CoinIcon";
import getSigner from "../utils/getSigner";
import { getPrice, runSwap } from "./AlphaRouterService";

const SwapToken = () => {
  const [clicked, setClicked] = useState(false);
  const [inputAmount, setInputAmount] = useState("");

  const handleChange = (event) => {
    setInputAmount(event.target.value);
  };

  const {
    tokenBal,
    setTokenBal,
    slippageTolerance,
    transactionDeadline,
    swapRatio,
    setSwapRatio,
    swappedPrice,
    setSwappedPrice,
    swapTransaction,
    setSwapTransaction,
  } = useContext(MyContext);

  useEffect(() => {
    getPrice(
      inputAmount,
      slippageTolerance,
      Math.floor(Date.now() / 1000 + transactionDeadline * 60),
      "0x85392e765680737b29E449FAF37df956f0931f58"
    ).then((data) => {
      console.log(data);
      setSwapTransaction(data[0]);
      console.log("trans " + swapTransaction);
      setSwappedPrice(data[1]);
      console.log("s price " + swappedPrice);
      setSwapRatio(data[2]);
      console.log("ratio " + swapRatio);
    });
  }, [inputAmount]);
  

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
            <Form.Label>WETH {<CoinIcon coinId="weth" />}</Form.Label>{" "}
            <Form.Control
              type="text"
              placeholder="Enter amount"
              value={inputAmount}
              onChange={handleChange}
            />
            {getTokenBalance(setTokenBal) && (
              <Form.Label className="">{"Weth bal: " + tokenBal}</Form.Label>
            )}
          </Form.Group>
          <div>1 WMATIC = {swapRatio} WETH </div>
          <Form.Group>
            <Form.Label>
              WMATIC {<CoinIcon coinId="matic-network" />}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              readOnly
              value={inputAmount / swapRatio}
            />
            <Form.Label></Form.Label>
          </Form.Group>
          <Button
            className=""
            variant="outline-success"
            onClick={async () => {
              const signer = await getSigner();
              runSwap(swapTransaction, signer);
            }}
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
