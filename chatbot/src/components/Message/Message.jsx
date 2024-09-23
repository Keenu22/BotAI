import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image2 from "../assets/image 29.png";
import FeedbackModal from './FeedbackModal';
import './Message.css';

export default function Message({
  question,
  response,
  conversation,
  inputValue,
  setInputValue,
  setQuestion,
  saveConversation,
}) {
  const [likeDislike, setLikeDislike] = useState({});
  const [value, setValue] = useState({});
  const [feedback, setFeedback] = useState({});
  const [feedbackPrint, setFeedbackPrint] = useState({});
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(null);

  const feedbackModalRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAskClick = () => {
    if (inputValue.trim()) {
      setQuestion(inputValue);
    }
  };

  const handleSaveClick = () => {
    navigate("/result");
    const savedData = {
      conversation,
      ratings: value,
    };
    localStorage.setItem('savedConversation', JSON.stringify(savedData));
    saveConversation();
  };

  const handleLikeDislike = (index, type) => {
    setLikeDislike((prev) => ({ ...prev, [index]: type }));
    if (type === 'dislike') {
      setFeedbackPrint((prev) => ({ ...prev, [index]: '' }));
      setCurrentFeedbackIndex(index);
      feedbackModalRef.current?.open();
    }
  };

  const handleFeedbackSubmit = (feedbackValue) => {
    if (currentFeedbackIndex !== null) {
      setFeedback((prev) => ({
        ...prev,
        [currentFeedbackIndex]: feedbackValue,
      }));
      const updatedFeedback = { ...feedback, [currentFeedbackIndex]: feedbackValue };
      localStorage.setItem('feedback', JSON.stringify(updatedFeedback));
      console.log('Feedback saved:', feedbackValue);
      setFeedbackPrint((prev) => ({ ...prev, [currentFeedbackIndex]: feedbackValue }));
      setCurrentFeedbackIndex(null);
    }
  };

  useEffect(() => {
    const feedbackVal = JSON.parse(localStorage.getItem('feedback')) || {};
    setFeedbackPrint(feedbackVal);
  }, []);

  return (
    <div className='backdrop'>
      <h3 className="botHeading">Bot AI</h3>
      {conversation.map((item, index) => (
        <div key={index} className="conversation">
          <p>
            <Avatar>You</Avatar> {item.question}
          </p>
          <p>
            <Avatar alt="AI" src={image2} /> {item.response}
          </p>
          <div className="feedbackButtons">
            <button onClick={() => handleLikeDislike(index, 'like')}>👍</button>
            <button onClick={() => handleLikeDislike(index, 'dislike')}>👎</button>
            {likeDislike[index] && <span>{likeDislike[index] === 'like' ? 'Liked' : 'Disliked'}</span>}
          </div>

          {likeDislike[index] === 'like' && (
            <Box sx={{ '& > legend': { mt: 2 } }}>
              <Typography component="legend">Rate the response</Typography>
              <Rating
                name={`simple-controlled-${index}`}
                value={value[index] || 0}
                onChange={(event, newValue) => {
                  setValue((prev) => ({ ...prev, [index]: newValue }));
                }}
              />
            </Box>
          )}

          {likeDislike[index] === 'dislike' && feedbackPrint[index] && (
            <p>Feedback: {feedbackPrint[index]}</p>
          )}
        </div>
      ))}

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type your question..."
      />
      <button onClick={handleAskClick} disabled={!inputValue.trim()}>Ask</button>
      <button onClick={handleSaveClick}>Save</button>

      <FeedbackModal
        ref={feedbackModalRef}
        onFeedbackSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}
