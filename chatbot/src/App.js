import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Center from "../src/components/Center/Center";
import Message from "../src/components/Message/Message";
import Result from "../src/components/Result/Result.jsx";
import Sidebar from "../src/components/Sidebar/Sidebar";
import "./App.css";

export default function App() {
  const [question, setQuestion] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [conversation, setConversation] = useState([]);

  // Load conversation from localStorage on initial render
  /*useEffect(() => {
    const savedConversation = localStorage.getItem("conversation");
    if (savedConversation) {
      setConversation(JSON.parse(savedConversation));
    }
  }, []);
*/
  // Function to generate AI response
  const generateAIResponse = (question) => {
    if (question.toLowerCase().includes("weather")) {
      return "The weather today is sunny with a slight chance of rain.";
    } else if (question.toLowerCase().includes("location")) {
      return "You are currently in New York City, USA.";
    } else if (question.toLowerCase().includes("temperature")) {
      return "The temperature is 22°C.";
    } else if (question.toLowerCase().includes("how are you")) {
      return "I'm an AI, so I don't have feelings, but thanks for asking!";
    } else {
      return "I'm sorry, I don't understand the question. Can you ask something else?";
    }
  };

  // Update question and response, save to localStorage
  const handleSetQuestion = () => {
    setQuestion(inputValue);
    const aiResponse = generateAIResponse(inputValue);
    setResponse(aiResponse);
    const updatedConversation = [
      ...conversation,
      { question: inputValue, response: aiResponse },
    ];
    setConversation(updatedConversation);
    setInputValue(""); // Clear input after question is set

    // Save updated conversation to localStorage (only when conversation changes)
    localStorage.setItem("conversation", JSON.stringify(updatedConversation));
  };

  // Explicitly save the conversation to localStorage
  const handleSaveConversation = () => {
    localStorage.setItem("conversation", JSON.stringify(conversation));
    console.log("Conversation saved to localStorage:", conversation);
  };

  return (
    <Router>
      <div className="App">
        <div className="view">
          <Sidebar />
          <Routes>
            <Route
              path="/"
              element={
                <Center
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  setQuestion={handleSetQuestion}
                  saveConversation={handleSaveConversation}
                />
              }
            />
            <Route
              path="/message"
              element={
                <Message
                  question={question}
                  response={response}
                  conversation={conversation}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  setQuestion={handleSetQuestion}
                  saveConversation={handleSaveConversation}
                />
              }
            />
            <Route  
            path="/result"
            element={
              <Result/>
            }/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
