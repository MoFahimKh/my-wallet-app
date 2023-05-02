import { React, useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { isValidAddress } from "../utils/ethereum";
import { sendEther, sendUSDT, sendWETH } from "../utils/transactions";
import { MyContext } from "../contextApi/MyContext";

const SendToken = () => {
  const { accBalance, selectedOption } = useContext(MyContext);
  const [amount, setAmount] = useState("");
  const [receiversAddress, setReceiversAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState("ether");

  const handleTokenSelect = async (e) => {
    setSelectedToken(e.target.value);
  };

  const handleSendTransaction = async (selectedToken) => {
    if (selectedToken === "ether") {
      isValidAddress(receiversAddress);
      await sendEther(amount, receiversAddress);
    } else if (selectedToken === "USDT Stablecoin") {
      await sendUSDT(amount, receiversAddress);
    } else if (selectedToken === "WETH") {
      await sendWETH(amount, receiversAddress);
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
            <option value="WETH">WETH</option>
          </Form.Select>
          {selectedToken === "WETH" && selectedOption !== "0xaa36a7" && (
            <Form.Text className="text-danger">
              Please note that WETH transactions only work on Sepolia network.
            </Form.Text>
          )}
          {selectedToken === "USDT Stablecoin" && selectedOption !== "0x1" && (
            <Form.Text className="text-danger">
              Please note that USDT Stablecoin transactions only work on
              Mainnet.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Send token </Form.Label>
          <Form.Control
            type="text"
            id="amount"
            placeholder="enter amount"
            maxLength={10}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {amount > accBalance && (
            <Form.Text className="text-danger">
              Insufficient balance: {accBalance.slice(0, 7)}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-2">
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
          <Form.Text className="text-danger"></Form.Text>
        </Form.Group>

        <Button
          className="ml-5"
          variant="outline-success"
          onClick={() => handleSendTransaction(selectedToken, accBalance)}
          disabled={
            Number(amount) > Number(accBalance) ||
            !isValidAddress(receiversAddress)
          }
        >
          Send
        </Button>
      </Form>
    </div>
  );
};

export default SendToken;
