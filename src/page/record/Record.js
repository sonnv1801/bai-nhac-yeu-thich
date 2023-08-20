import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./style.css";
export const Record = () => {
  const [spokenText, setSpokenText] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [history, setHistory] = useState([]);

  const { transcript, listening } = useSpeechRecognition({
    languages: ["en-US", "vi-VN"],
  });

  useEffect(() => {
    if (transcript !== "") {
      setSpokenText(transcript);

      if (transcript.endsWith(".")) {
        stopRecording();
      }
    }
  }, [transcript]);

  useEffect(() => {
    if (spokenText !== "") {
      setHistory([spokenText]);
      localStorage.setItem("spokenHistory", JSON.stringify([spokenText]));
    }
  }, [spokenText]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("spokenHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (isPaused && listening) {
      setTimeout(() => {
        setIsPaused(false);
        SpeechRecognition.stopListening();
      }, 2000);
    }
  }, [isPaused, listening]);

  const startRecording = () => {
    setIsPaused(false);
    SpeechRecognition.startListening();
  };

  const stopRecording = () => {
    setIsPaused(true);
  };
  return (
    <div className="background">
      <div className="App">
        <div className="body-app">
          <div className="sub-body">
            <header className="App-header">
              <h1>Ứng dụng Ghi âm Giọng nói</h1>
            </header>
            <main>
              <div className="voice-recording">
                <button
                  onClick={startRecording}
                  className={`record-button ${listening ? "recording" : ""}`}
                  disabled={listening}
                >
                  Bắt đầu Ghi âm
                </button>
                <button onClick={stopRecording} disabled={!listening}>
                  Dừng Ghi âm
                </button>
              </div>
              <div className="spoken-text">
                <div className="current-text">
                  <h2>Văn bản đã nói:</h2>
                  <p style={{ textTransform: "uppercase" }}>{spokenText}</p>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="history-container">
          <div className="sub-history">
            <h2>Lịch Sử Trước Đó</h2>
            <ul>
              {history.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
