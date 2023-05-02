import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { sendEther, sendUSDT } from "../utils/transactions";

const SendToken = () => {
  const [amount, setAmount] = useState("");
  const [receiversAddress, setReceiversAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState("ether");

  const handleTokenSelect = async (e) => {
    setSelectedToken(e.target.value);
  };

  const handleSendTransaction = async (selectedToken) => {
    if (selectedToken === "ether") {
      await sendEther(amount, receiversAddress);
    } else if (selectedToken === "USDT Stablecoin") {
      await sendUSDT(amount, receiversAddress);
    }
  };
  return (
    <div className="formContainer">
      <Form>
        <Form.Group className="mb-3">
          <Form.Select
            as="select"
            onChange={handleTokenSelect}
            aria-label="Default select example"
          >
            <option>Select token</option>
            <option value="ether">ether</option>
            <option value="USDT Stablecoin">USDT Stablecoin</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Send token </Form.Label>
          <Form.Control
            type="text"
            id="amount"
            placeholder="enter amount"
            maxLength={10}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter receiver's address :</Form.Label>
          <Form.Control
            type="text"
            id="recAddress"
            pattern="[0-9a-fA-F]{40}"
            required
            placeholder="enter receiver's address"
            value={receiversAddress}
            onChange={(e) => setReceiversAddress(e.target.value)}
          />
        </Form.Group>
        <Button
          className="ml-5"
          variant="outline-success"
          onClick={() => handleSendTransaction(selectedToken)}
        >
          Send
        </Button>
      </Form>
    </div>
  );
};

export default SendToken;
