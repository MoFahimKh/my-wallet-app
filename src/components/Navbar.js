import { useContext } from "react";
import useAccountInfo from "../hooks/useAccountInfo";
import { MyContext } from "../contextApi/MyContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import NavDropdownValue from "./NavDropdownValue";
import PageToggle from "./PageToggle";

const MyNavbar = () => {
  const { walletAddress, accBalance } = useContext(MyContext);

  const { connectWalletHandler } = useAccountInfo();

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand>My wallet app</Navbar.Brand>
        <PageToggle />
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            {walletAddress !== "Connect!" && <NavDropdownValue />}
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
