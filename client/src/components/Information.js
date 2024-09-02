import { Container } from "reactstrap";
import CA from "../assets/img/CA.jpg";
import CA2 from "../assets/img/CA2.jpg";

const Information = () => {
  return (
    <div>
      <Container fluid>
        <div className="row m-3 d-flex align-items-center">
          <div className="col-12 col-md-6 p-5">
            <img src={CA} alt="" width="100%" height="auto" />
          </div>
          <div className="col-12 col-md-6 text-center p-5">
            <h3 className="display-4">Specialist in Critical Financial Help</h3>
            <p>
            A Financial Advisor's Firm is a professional service 
            organisation that employs Chartered Accountants to provide 
            financial and accounting expertise to businesses and individuals. 
            These firms offer services such as auditing, tax consultancy, 
            financial planning, and compliance reporting.
            </p>
          </div>
        </div>
        <div className="row m-3 d-flex align-items-center">
          <div className="col-12 col-md-6 text-center p-5">
            <h3 className="display-4">Financial management</h3>
            <p>
            Financial management is all about monitoring, controlling, 
            protecting, and reporting on a company's financial resources. 
            Companies have accountants or finance teams responsible for 
            managing their finances, including all bank transactions, 
            loans, debts, investments, and other sources of funding.
            </p>
          </div>
          <div className="col-12 col-md-6 p-5">
            <img src={CA2} alt="" width="100%" height="auto" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Information;
