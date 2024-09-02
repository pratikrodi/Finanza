import {Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      
      <footer className="bg-dark text-light py-4">
  <Container>
  <Col md={12} className="align-self-start">
  <h3 className="display-4">Finanza</h3>
</Col>


    <Row>
      <Col md={3}>
        <h5>Quick Links</h5>
        <ul className="list-unstyled">
          <li>
            <Link to="/about" className="text-light">About Us</Link>
          </li>
          <li>
            <Link to="/services" className="text-light">Services</Link>
          </li>
          <li>
            <Link to="/contact" className="text-light">Contact Us</Link>
          </li>
        </ul>
      </Col>
      <Col md={3}>
      <h5>Quick Links</h5>
        <ul className="list-unstyled">
          <li>
            <Link to="/about" className="text-light">About Us</Link>
          </li>
          <li>
            <Link to="/services" className="text-light">Services</Link>
          </li>
          <li>
            <Link to="/contact" className="text-light">Contact Us</Link>
          </li>
        </ul>
      </Col>
      <Col md={3}>
      <h5>Quick Links</h5>
        <ul className="list-unstyled">
          <li>
            <Link to="/about" className="text-light">About Us</Link>
          </li>
          <li>
            <Link to="/services" className="text-light">Services</Link>
          </li>
          <li>
            <Link to="/contact" className="text-light">Contact Us</Link>
          </li>
        </ul>
      </Col>
      
      <Col md={3}>
        <p>&copy; {new Date().getFullYear()} Finanza. All Rights Reserved.</p>
      </Col>
    </Row>
  </Container>
</footer>
    </div>
  );
};

export default Footer;
