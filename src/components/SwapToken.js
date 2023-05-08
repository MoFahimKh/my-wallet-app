import { Form, Button, Ratio } from "react-bootstrap";
import { React, useContext, useState } from "react";
import "../App.css";
import { ethers } from "ethers";
import { GearFill } from "react-bootstrap-icons";
import SwapConfigs from "./SwapConfigs";
import { MyContext } from "../contextApi/MyContext";
import getTokenBalance from "../utils/getTokenBalance";
import CoinIcon from "./CoinIcon";
import {
  wethContract,
  wmaticContract,
  getPrice,
  runSwap,
} from "./AlphaRouterService";

const SwapToken =  () => {
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  const [clicked, setClicked] = useState(false);
  const [inputAmount, setInputAmount] = useState();
  const handleChange = (event) => {
    setInputAmount(event.target.value);
  };

  const {
    tokenBal,
    setTokenBal,
    selectedToken,
    slippageTolearnce,
    transactionDeadline,
    swapRatio,
    setSwapRatio,
    swappedPrice,
    setSwappedPrice,
    swapTransaction,
    setSwapTransaction,
  } = useContext(MyContext);

  getPrice(0.05, 2, 10, "0x85392e765680737b29E449FAF37df956f0931f58").then(
    (data) => {
      console.log(data);
      // setSwapTransaction(data[0]);
      // setSwappedPrice(data[1]);
      setSwapRatio(data[2]);
    }
  );

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
            <Form.Control type="text" placeholder="" />
          </Form.Group>
          <Button className="" variant="outline-success">
            Swap
          </Button>
          <Form.Label></Form.Label>
        </Form>
      </div>
    </div>
  );
};

export default SwapToken;
