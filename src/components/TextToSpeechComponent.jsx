// TextToSpeechComponent.js
import React, { useState } from "react";

const TextToSpeechComponent = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);

  // Load available voices
  const loadVoices = () => {
    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices);
  };

  // Speak the text
  const speak = () => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices.find(
      (voice) => voice.name === "Google US English"
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Ensure voices are loaded
  window.speechSynthesis.onvoiceschanged = loadVoices;

  return (
    <div>
      <h2>Text-to-Speech Demo</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to read"
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={speak}>Speak</button>
    </div>
  );
};

export default TextToSpeechComponent;
