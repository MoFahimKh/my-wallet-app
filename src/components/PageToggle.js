import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

function PageToggle() {
  const location = useLocation();
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {location.pathname === "/swap" ? "Swap Token" : "Send Token"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/swap">
          Swap Tokens
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/">
          Send Tokens
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default PageToggle;
