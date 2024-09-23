import CloseIcon from '@mui/icons-material/Close';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const FeedbackModal = forwardRef(({ onFeedbackSubmit }, ref) => {
  const dialogRef = useRef(null);
  const [feedback, setFeedback] = useState('');

  useImperativeHandle(ref, () => ({
    open: () => {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    },
    close: () => {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    },
  }));

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      onFeedbackSubmit(feedback); // Pass feedback to parent
      setFeedback(''); // Reset feedback field
      dialogRef.current.close(); // Close the modal after submission
    } else {
      alert('Feedback cannot be empty!'); // Basic validation
    }
  };

  return (
    <dialog ref={dialogRef} onClose={() => setFeedback('')}>
      <EmojiObjectsIcon />
      <h3>Provide Additional Feedback</h3>
      <button onClick={() => dialogRef.current.close()}>
        <CloseIcon />
      </button>
      <form method="dialog" onSubmit={handleSubmitFeedback}>
        <textarea
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Provide your feedback..."
        />
        <button type="submit">Submit</button>
      </form>
    </dialog>
  );
});

export default FeedbackModal;
