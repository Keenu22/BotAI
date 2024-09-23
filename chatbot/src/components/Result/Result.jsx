import Avatar from '@mui/material/Avatar';
import React, { useEffect, useState } from 'react';
import image2 from "../assets/image 29.png";
import './Result.css';

export default function Result() {
  const [selectedOption, setSelectedOption] = useState('');
  const [savedRatings, setSavedRatings] = useState({});
  const [savedFeedback, setSavedFeedback] = useState({});
  const [savedConversation, setSavedConversation] = useState([]);

  // Load saved conversation, ratings, and feedback from local storage when the component mounts
  useEffect(() => {
    const conversationData = JSON.parse(localStorage.getItem('savedConversation'));
    const feedbackData = JSON.parse(localStorage.getItem('feedback'));

    if (conversationData) {
      setSavedRatings(conversationData.ratings || {});
      setSavedConversation(conversationData.conversation || []);
    }

    if (feedbackData) {
      setSavedFeedback(feedbackData);
    }
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Selected option: ${selectedOption}`);
  };

  const selectedRating = parseInt(selectedOption);

  return (
    <div className="resultPart">
      <h3 className="resHeading">Bot AI</h3>
      <h2>Conversation History</h2>
      <form className="dropdown" onSubmit={handleSubmit}>
        <select value={selectedOption} onChange={handleChange}>
          <option value="" disabled>
            Select ratings
          </option>
          <option value="1">1-star</option>
          <option value="2">2-star</option>
          <option value="3">3-star</option>
          <option value="4">4-star</option>
          <option value="5">5-star</option>
        </select>
        <button className="smallBtn" type="submit">
          Submit
        </button>
      </form>

      {/* Show the saved conversation, ratings, and feedback based on the selected rating */}
      {savedConversation.length > 0 ? (
        <div className="conversationHistory">
          <h4>Saved Conversation:</h4>
          {savedConversation.map((item, index) => {
            const savedRating = savedRatings[index]; // Get the saved rating for the current conversation
            return (
              selectedRating === savedRating && (
                <div key={index} className="conversation">
                  <p>
                    <Avatar>You</Avatar> {item.question}
                  </p>
                  <p>
                    <Avatar alt="AI" src={image2} /> {item.response}
                  </p>

                  {/* Display saved rating and feedback for this conversation item */}
                  {savedRating && (
                    <p>
                      <strong>Saved Rating:</strong> {savedRating}-star
                    </p>
                  )}
                  {savedFeedback[index] && (
                    <p>
                      <strong>Saved Feedback:</strong> {savedFeedback[index]}
                    </p>
                  )}
                </div>
              )
            );
          })}
          {/* Check if there are no conversations matching the selected rating */}
          {savedConversation.every((_, index) => savedRatings[index] !== selectedRating) && (
            <p>No saved conversation</p>
          )}
        </div>
      ) : (
        <p>No saved conversation</p>
      )}
    </div>
  );
}

