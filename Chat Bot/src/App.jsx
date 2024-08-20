import React, { useState } from "react";
import { Container, Button, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleMicClick = () => {
    setIsListening(true);
    startSpeechRecognition();
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  const sendTranscriptToBackend = async (text) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/process-speech",
        {
          text: text,
        }
      );
      console.log("Response from backend: ", response.data.response);
      setResponseText(response.data.response);
      speakText(response.data.response);
    } catch (error) {
      console.error("Error sending transcript to backend: ", error);
    } finally {
      setLoading(false);
    }
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
      sendTranscriptToBackend(speechToText);
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
        {loading ? (
          <Alert variant="info">Fetching Response, Please wait...</Alert>
        ) : (
          <>
            <Row>
              <Col>
                <Button
                  variant="primary"
                  className="rounded-circle p-4"
                  style={{ width: "100px", height: "100px", fontSize: "24px" }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#0056b3")
                  }
                  onMouseOut={(e) => (e.target.style.backgroundColor = "")}
                  onClick={handleMicClick}
                  disabled={isListening}
                >
                  <i className="bi bi-mic-fill"></i>
                </Button>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  className="rounded-circle p-4"
                  style={{ width: "100px", height: "100px", fontSize: "24px" }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#0056b3")
                  }
                  onMouseOut={(e) => (e.target.style.backgroundColor = "")}
                  onClick={stopSpeaking}
                  disabled={!isSpeaking}
                >
                  <i className="bi bi-stop-fill"></i>
                </Button>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <p>{transcript && `You said: "${transcript}"`}</p>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <div
                  className="bg-dark text-white p-3"
                  style={{
                    height: "400px",
                    width: "1000px",
                    maxHeight: "400px",
                    overflowY: "auto",
                    borderRadius: "0.25rem",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                  }}
                >
                  {responseText}
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}

export default App;
