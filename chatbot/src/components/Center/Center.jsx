import { useNavigate } from "react-router-dom";
import image2 from "../assets/image 29.png";
import "./Center.css";

export default function Center({
  inputValue,
  setInputValue,
  setQuestion,
  saveConversation,
}) {
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAskClick = () => {
    if (inputValue.trim()) {
      setQuestion(inputValue);
    }
    navigate("/message");
  };

  const handleSaveClick = () => {
    saveConversation(); // Save the conversation when clicked
  };

  return (
    <div className="centerfull">
      <h3 className="heading">Bot AI</h3>
      <p className="help">How can I help you Today?</p>
      <img className="helpimg" src={image2} alt="Bot Avatar" />
      <div className="common">
        <div>
          <h5>Hi, How are You?</h5>
          <p>Get AI generated immediate response</p>
        </div>
        <div>
          <h5>Hi, What is the weather</h5>
          <p>Get AI generated immediate response</p>
        </div>
        <div>
          <h5>Hi, What is the temperature</h5>
          <p>Get AI generated immediate response</p>
        </div>
        <div>
          <h5>Hi, What is the location</h5>
          <p>Get AI generated immediate response</p>
        </div>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type your question..."
      />
      <button onClick={handleAskClick}>Ask</button>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
}
