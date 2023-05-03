import React, { useContext } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { MyContext } from "../contextApi/MyContext";
import { getBalance } from "../utils/ethereum";
import setNetwork from "../utils/network";

const NavDropdownValue = () => {
  const { walletAddress, account, selectedOption, setAccBalance, setSelectedOption } =
    useContext(MyContext);

  const handleOptionChange = async (eventKey) => {
    setSelectedOption(eventKey);
    const etherBalance = await getBalance(account);
    setAccBalance(etherBalance);
    setNetwork(eventKey);
  };

  let titleValue;
  switch (selectedOption) {
    case "0x1":
      titleValue = "Mainnet";
      break;
    case "0xaa36a7":
      titleValue = "Sepolia";
      break;
    case "0x13881":
      titleValue = "Mumbai testnet";
      break;
    default:
      titleValue = "Sepolia";
  }
  return (
    <>
      <Nav className="me-auto my-2 my-lg-0" navbarScroll>
        {walletAddress !== "Connect!" && (
          <NavDropdown
            title={titleValue}
            value={selectedOption}
            onSelect={handleOptionChange}
          >
            <NavDropdown.Item eventKey="0x1">Mainnet</NavDropdown.Item>
            <NavDropdown.Item eventKey="0xaa36a7">Sepolia</NavDropdown.Item>
            <NavDropdown.Item eventKey="0x13881">
              Mumbai testnet
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Nav>
    </>
  );
};
export default NavDropdownValue;
