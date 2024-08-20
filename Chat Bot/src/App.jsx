import { Container, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <>
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center"
      >
        <Row className="mb-4">
          <Col>
            <h1 className="display-4">
              <i className="bi bi-robot mx-2"></i> {/* Bot icon */}
              Welcome to Usaid Rashid's ChatBot
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="primary"
              className="rounded-circle p-4"
              style={{ width: "100px", height: "100px", fontSize: "24px" }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "")}
            >
              <i className="bi bi-mic-fill"></i> {/* Microphone icon */}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
