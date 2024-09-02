import React from "react";
import { Container, Jumbotron, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import CA2 from "../../assets/img/CA2.jpg";
import Booking from "../../components/Booking";

const FinancialAdvices = () => {
  return (
    <div>
      <Container fluid>
        <div className="row m-3 d-flex align-items-center">
          <div className="col-12 col-md-6 p-5">
            <img src={CA2} alt="" width="100%" height="auto" />
          </div>
          <div className="col-12 col-md-6 text-center p-5">
            <h3 className="display-4">Specialist in Critical Financial Help</h3>
            <p>
              A Financial Advisor's Firm is a professional service 
              organization that employs Chartered Accountants to provide 
              financial and accounting expertise to businesses and individuals. 
              These firms offer services such as auditing, tax consultancy, 
              financial planning, and compliance reporting.
            </p>
            <Link to="/services" style={{ color: "black" }}>Back to Services</Link>
          </div>
        </div>
      </Container>

      <Jumbotron fluid className="mb-0">
  <Container>
    <Row>
      <Col md={6}>
        <h3 className="display-4" style={{ fontSize: "4rem" }}>Schedule your meeting now</h3>
      </Col>
      <Col md={6} className="d-flex align-items-center justify-content-center">
        <Booking size="lg" />
      </Col>
    </Row>
  </Container>
</Jumbotron>

    </div>
  );
};

export default FinancialAdvices;
