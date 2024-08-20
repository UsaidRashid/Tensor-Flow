import React, { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleMicClick = () => {
    setIsListening(true);
    startSpeechRecognition();
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      console.log("Speech recognition started.");
    };

    recognition.onspeechend = () => {
      console.log("Speech recognition ended.");
      recognition.stop();
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      console.log("Speech recognized: ", speechToText);
    };

    recognition.start();
  };

  return (
    <>
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center"
      >
        <Row className="mb-4">
          <Col>
            <h1 className="display-4">
              <i className="bi bi-robot mx-2"></i>
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
              onClick={handleMicClick}
              disabled={isListening}
            >
              <i className="bi bi-mic-fill"></i>
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <p>{transcript && `You said: "${transcript}"`}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
