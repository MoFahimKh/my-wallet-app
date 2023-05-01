import { React, useState } from "react";
import { ethers } from "ethers";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import SendTransaction from "./utils/Transactions";

const SendTransactions = () => {
  const [amount, setAmount] = useState("");
  const [receiversAddress, setReceiversAddress] = useState("");

  const handleSendTransaction = () => {
    SendTransaction(amount, receiversAddress);
  };

  return (
    <div className="formContainer">
      <Form>
        <div>
          <div>
            <h4>Send Token </h4>
            <input
              type="text"
              id="amt"
              placeholder="enter amount"
              maxLength={10}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></input>
          </div>
          <h4>Enter Receiver's Address : </h4>
          <input
            type="text"
            id="recAddress"
            required
            placeholder="enter receiver's address"
            value={receiversAddress}
            onChange={(e) => setReceiversAddress(e.target.value)}
          ></input>
        </div>
        <input
          type="button"
          onClick={() => handleSendTransaction()}
          value="Send Transaction"
        />
      </Form>
    </div>
  );
};

export default SendTransactions;
