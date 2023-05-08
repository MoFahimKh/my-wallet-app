import { Form } from "react-bootstrap";
import { useContext } from "react";
import { MyContext } from "../contextApi/MyContext";

const SwapConfigs = () => {
  const {
    slippageTolerance,
    setSlippageTolerance,
    transactionDeadline,
    setTransactionDeadline,
  } = useContext(MyContext);

  const handleSlippageToleranceChange = (e) => {
    setSlippageTolerance(e.target.value);
    console.log("slippage"+slippageTolerance);
  };

  const handleTransactionDeadlineChange = (e) => {
    setTransactionDeadline(e.target.value);
    console.log("deadline"+transactionDeadline);
  };

  return (
    <div>
      <div className="body">
        <div className="gearFormContainer">
          <Form.Group>
            <h8>slippage tolerance</h8>
            <Form.Control
              style={{ fontSize: "10px" }}
              placeholder="Slippage Tolerance %"
              type="text"
              value={slippageTolerance}
              onChange={handleSlippageToleranceChange}
            />
          </Form.Group>
          <Form.Group>
            <h8>transaction Deadline</h8>
            <Form.Control
              style={{ fontSize: "10px" }}
              placeholder="Deadline in minutes"
              type="text"
              value={transactionDeadline}
              onChange={handleTransactionDeadlineChange}
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default SwapConfigs;
