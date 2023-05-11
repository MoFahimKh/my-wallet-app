import { Dropdown, DropdownButton } from "react-bootstrap";
import { React, useContext, useState } from "react";
import { MyContext } from "../contextApi/MyContext";

function SelectTokenDropdown({ typeOfToken }) {
  const {
    inputTokenSelected,
    setInputTokenSelected,
    outputTokenSelected,
    setOutputTokenSelected,
  } = useContext(MyContext);

  const [selectedToken, setSelectedToken] = useState(
    typeOfToken === "input" ? inputTokenSelected : outputTokenSelected
  );

  let titleValue;
  switch (selectedToken) {
    case "WETH":
      titleValue = "Wrapped Ether";
      break;
    case "WMATIC":
      titleValue = "Wrapped Matic";
      break;
    case "LINK":
      titleValue = "Chainlink";
      break;
    default:
      titleValue = "Select a token";
  }

  const handleOptionChange = (eventKey) => {
    if (typeOfToken === "input") {
      setInputTokenSelected(eventKey);
    } else if (typeOfToken === "output") {
      setOutputTokenSelected(eventKey);
    }
    setSelectedToken(eventKey);
  };

  return (
    <DropdownButton
      variant="outline-success"
      title={titleValue}
      value={selectedToken}
      onSelect={handleOptionChange}
    >
      <Dropdown.Item eventKey="WETH">Wrapped Ether</Dropdown.Item>
      <Dropdown.Item eventKey="WMATIC">Wrapped Matic</Dropdown.Item>
      <Dropdown.Item eventKey="LINK">Chainlink</Dropdown.Item>
    </DropdownButton>
  );
}

export default SelectTokenDropdown;
