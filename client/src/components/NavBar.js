import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
} from "reactstrap";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" fixed="top">
        <NavbarBrand href="/">Finanza</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <Link to="/listAll">
              <Button color="primary" className="mx-2">
                List All events
              </Button>
            </Link>
            <Link to="/services">
              <Button color="primary" className="mx-2">
                Services
              </Button>
            </Link>
            <Link to="/signup">
              <Button color="primary" className="mx-2">
                Sign Up
              </Button>
            </Link>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
