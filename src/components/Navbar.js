import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { GetAccount, GetBalance } from "../utils/ethereum";
import setNetwork from "../utils/network";
import { Button } from "react-bootstrap";

const MyNavbar = () => {
  const [account, setAccount] = useState(null);
  const [walletAddress, setWalletAddress] = useState("Connect!");
  const [accBalance, setAccBalance] = useState("");
  const [selectedOption, setSelectedOption] = useState("0xaa36a7");

  useEffect(() => {
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(
          accounts[0].substring(0, 6) +
            "..." +
            accounts[0].substring(accounts[0].length - 4, accounts[0].length)
        );
        const etherBalance = await GetBalance(accounts);
        setAccBalance(etherBalance);
        console.log(etherBalance);
        setNetwork(selectedOption);
      } else {
        setWalletAddress("Connect!");
        setAccBalance(null);
      }
    };
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    if (account) {
      (async () => {
        const etherBalance = await GetBalance(account);
        setAccBalance(etherBalance);
      })();
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [account, selectedOption]);

  const handleOptionChange = async (eventKey) => {
    setSelectedOption(eventKey);
    const etherBalance = await GetBalance(account);
    setAccBalance(etherBalance);
    console.log(accBalance);
    console.log("selected!" + selectedOption);
    setNetwork(eventKey);
    console.log(eventKey);
  };

  const connectWalletHandler = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const acc = await GetAccount();
        setAccount(acc);
        //selecting network
        setNetwork(selectedOption);
        //connecting wallet
        if (acc[0]) {
          let trimmedAccount =
            acc[0].substring(0, 6) +
            "..." +
            acc[0].substring(acc[0].length - 4, acc[0].length);
          setWalletAddress(trimmedAccount);
        }
        if (!Error) {
          setWalletAddress("Connect!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
  <Navbar bg="dark" expand="lg" variant="dark">
  <Container fluid>
    <Navbar.Brand>my-wallet-app</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav className="me-auto my-2 my-lg-0" navbarScroll>
        {walletAddress !== "Connect!" && (
          <NavDropdown
            title={
              selectedOption
                ? selectedOption === "0x1"
                  ? "Mainnet"
                  : selectedOption === "0xaa36a7"
                  ? "Sepolia"
                  : selectedOption === "0x13881"
                  ? "Mumbai testnet"
                  : "Select Network"
                : "Select Network"
            }
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
