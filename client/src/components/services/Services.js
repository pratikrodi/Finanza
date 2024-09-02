import { Container } from "reactstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CA from "../../assets/img/CA2.jpg";

const Services = () => {
  return (
    <div>
      <Container fluid>
        <div className="row m-3 d-flex align-items-center">
          <div className="col-12 col-md-4 p-5">
            <Link to="/financial-advices" style={{ color: "black" }}>
              {/* Updated path */}
              <img src={CA} alt="Financial Advices" width="100%" height="auto" style={{ maxHeight: "160px", maxWidth: "500px"}} />
            </Link>
          </div>
          <div className="col-12 col-md-8 text-center p-5 mr-10">
            <Link to="/financial-advices" style={{ color: "black" }}>
              {/* Updated path */}
              <h3 className="display-4">Financial Advices</h3>
            </Link>
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
          <div className="col-12 col-md-8 text-center p-5">
            <Link to="/financial-management" style={{ color: "black" }}> {/* Added style */}
              <h3 className="display-4">Financial Management</h3>
            </Link>
            <p>
              Financial management is all about monitoring, controlling, 
              protecting, and reporting on a company's financial resources. 
              Companies have accountants or finance teams responsible for 
              managing their finances, including all bank transactions, 
              loans, debts, investments, and other sources of funding.
            </p>
          </div>
          <div className="col-12 col-md-4 p-5">
            <Link to="/financial-management" style={{ color: "black" }}> {/* Added style */}
            <img src={CA} alt="Financial Management" width="100%" height="auto" style={{ maxHeight: "160px", maxWidth: "400px"}} />
            </Link>
          </div>
        </div>
        <div className="row m-3 d-flex align-items-center">
          <div className="col-12 col-md-4 p-5">
            <Link to="/accounting-bookkiping" style={{ color: "black" }}> {/* Added style */}
            <img src={CA} alt="Accounting Bookkiping" width="100%" height="auto" style={{ maxHeight: "160px", maxWidth: "500px"}} />
            </Link>
          </div>
          <div className="col-12 col-md-8 text-center p-5">
            <Link to="/accounting-bookkiping" style={{ color: "black" }}> {/* Added style */}
              <h3 className="display-4">Accounting And Bookkiping</h3>
            </Link>
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
          <div className="col-12 col-md-8 text-center p-5">
            <Link to="/auditing-taxation" style={{ color: "black" }}> {/* Added style */}
              <h3 className="display-4">Auditing and Taxation</h3>
            </Link>
            <p>
              Financial management is all about monitoring, controlling, 
              protecting, and reporting on a company's financial resources. 
              Companies have accountants or finance teams responsible for 
              managing their finances, including all bank transactions, 
              loans, debts, investments, and other sources of funding.
            </p>
          </div>
          <div className="col-12 col-md-4 p-5">
            <Link to="/auditing-taxation" style={{ color: "black" }}> {/* Added style */}
            <img src={CA} alt="Auditing Taxation" width="100%" height="auto" style={{ maxHeight: "160px", maxWidth: "400px"}} />
            </Link>
          </div>
        </div>
        <div className="row m-3 d-flex align-items-center">
          <div className="col-12 col-md-4 p-5">
            <Link to="/business-valuation" style={{ color: "black" }}> {/* Added style */}
              <img src={CA} alt="Business Valuation" width="100%" height="auto" style={{ maxHeight: "160px", maxWidth: "500px"}} />
            </Link>
          </div>
          <div className="col-12 col-md-8 text-center p-5 mr-10"> {/* Added mr-5 for right margin */}
            <Link to="/business-valuation" style={{ color: "black" }}> {/* Added style */}
              <h3 className="display-4">Business Valuation</h3>
            </Link>
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
          <div className="col-12 col-md-8 text-center p-5">
            <Link to="/risk-management" style={{ color: "black" }}> {/* Added style */}
              <h3 className="display-4">Risk Management</h3>
            </Link>
            <p>
              Financial management is all about monitoring, controlling, 
              protecting, and reporting on a company's financial resources. 
              Companies have accountants or finance teams responsible for 
              managing their finances, including all bank transactions, 
              loans, debts, investments, and other sources of funding.
            </p>
          </div>
          <div className="col-12 col-md-4 p-5">
            <Link to="/risk-management" style={{ color: "black" }}> {/* Added style */}
            <img src={CA} alt="Risk Management" width="100%" height="auto" style={{ maxHeight: "160px", maxWidth: "400px"}} />
            </Link>
          </div>
        </div>

        
        {/* Other service components */}
      </Container>
    </div>
  );
};

export default Services;
