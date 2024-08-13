// VoiceCommandComponent.js
import React, { useEffect, useState } from "react";

const VoiceCommand = () => {
  const [recognition, setRecognition] = useState(null);
  const [feedback, setFeedback] = useState("Say something...");
  const [userCommand, setUserCommand] = useState(null);


  useEffect(() => {
    // Check for browser support
    if ("webkitSpeechRecognition" in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";
      setRecognition(recognitionInstance);
    } else {
      setFeedback("Speech Recognition not supported in this browser.");
    }
  }, []);

  useEffect(() => {
    if (recognition) {
      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        setFeedback(`You said: ${command}`);
        handleVoiceCommand(command);
      };

      recognition.onerror = (event) => {
        setFeedback(`Error: ${event.error}`);
      };

      recognition.onend = () => {
        setFeedback("Speech recognition ended.");
      };

      // Start recognition
      recognition.start();
    }
  }, [recognition]);

  const handleVoiceCommand = (command) => {
    if (command.includes("open story")) {
      const storyTitle = command.replace("open story", "").trim();
      console.log(`Opening story: ${storyTitle}`);
       setUserCommand(`your command was${command}`);
      // Add your logic to open the story
    } else if (command.includes("read story")) {
      const storyTitle = command.replace("read story", "").trim();
      console.log(`Reading story: ${storyTitle}`);
      // Add your logic to read the story
    } else {
      setFeedback("Command not recognized.");
    }
  };

  return (
    <div>
      <p>{feedback}</p>
      <p>{userCommand}</p>
      <button onClick={() => recognition && recognition.start()}>
        Start Listening
      </button>
    </div>
  );
};

export default VoiceCommand;
