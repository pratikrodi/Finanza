import { Jumbotron, Container } from "reactstrap";

const Greeting = (props) => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Welcome</h1>
          <p className="lead">
            To the world's best Chartered Accountant's Firm <br /> Just go through our Services and find your all financial problem's solution here
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Greeting;
