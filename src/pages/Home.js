import { React, useEffect, useState } from "react";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import SendTransactions from "../SendToken";
import GetAccount from "../utils/Account";
import GetBalance from "../utils/Balance";
import SetNetwork from "../utils/Network";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const ConnectButton = () => {
  const [account, setAccount] = useState(null);
  const [walletAddress, setWalletAddress] = useState("Connect!");
  const [accBalance, setAccBalance] = useState("");
  const [selectedOption, setSelectedOption] = useState("0x1");

  useEffect(() => {
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0].slice(0, 10));
        const etherBalance = await GetBalance(accounts);
        setAccBalance(etherBalance);
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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const connectWalletHandler = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const acc = await GetAccount();
        setAccount(acc);
        //selecting network
        SetNetwork(selectedOption);
        //connecting wallet
        if (acc[0]) {
          let trimmedAccount = acc[0].slice(0, 10);
          setWalletAddress(trimmedAccount);
        }
        if (!Error) {
          setWalletAddress("Connect!");
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>my-wallet-assignment</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <NavDropdown title="Select Network" value={selectedOption} onChange={handleOptionChange}>
                <NavDropdown.Item value="0x1">Mainnet</NavDropdown.Item>
                <NavDropdown.Item value="0xaa36a7">Sepolia</NavDropdown.Item>
                <NavDropdown.Item value="0x13881">Mumbai testNet</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav.Link style={{ marginRight: '20px' }}>Balance: {accBalance ? accBalance.slice(0, 7) : "0.0"}</Nav.Link>
            <Button className="ml-5" variant="outline-success" onClick={connectWalletHandler}>
              {walletAddress}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SendTransactions />
    </>
  );
};

export default ConnectButton;
