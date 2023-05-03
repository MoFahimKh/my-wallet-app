import { useContext } from "react";
import useAccountInfo from "../hooks/useAccountInfo";
import { MyContext } from "../contextApi/MyContext";
import Nav from "react-bootstrap/Nav";
import setNetwork from "../utils/network";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { getAccount, getBalance } from "../utils/ethereum";
import { Button } from "react-bootstrap";

const MyNavbar = () => {
  const {
    setAccount,
    walletAddress,
    accBalance,
    setAccBalance,
    setSelectedOption,
  } = useContext(MyContext);

  const { account, setWalletAddress, selectedOption, connectWalletHandler } =
    useAccountInfo();

  const handleOptionChange = async (eventKey) => {
    setSelectedOption(eventKey);
    const etherBalance = await getBalance(account);
    setAccBalance(etherBalance);
    setNetwork(eventKey);
  };
  const onConnectButtonClick = () => {
    setSelectedOption(selectedOption);
    setWalletAddress(walletAddress);
    connectWalletHandler();
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
      titleValue = "Select Network";
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand>My wallet app</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
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
          <Nav.Link style={{ marginRight: "20px" }}>
            Balance: {accBalance ? accBalance.slice(0, 7) : "0.0"}
          </Nav.Link>
          <Button
            className="ml-5"
            variant="outline-success"
            onClick={connectWalletHandler}
          >
            {walletAddress}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
