import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
import { setQuestionId, setQuestionBody, setQuestionDate, setAskerName, setQuestionHelpfulness, setReported, setAnswers, setQuestionArr } from '../../store/questionsSlice';




const QuestionForm = ({ onClose, showModal, title, handleCloseModal}) => {
  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  // const dispatch = useDispatch();


  // const { mainProduct } = useSelector((state) => state.overview); 


  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("WE ARE GETTING HERE")
    
    //reset
    setQuestion('');
    setNickname('');
    setEmail('');
    // setIsOpen(false);
    onClose();
  };

  return (
    <div>
        {showModal && (
          <>
            <div>
              <label>Ask Your Question</label>
              <p>{title}</p>
              <label>
                Your Question:
                <textarea
                  value={question}
                  onChange={handleQuestionChange}
                  placeholder="What do you want to know about this product?"
                  rows={5}
                  maxLength={1000}
                />
              </label>
              <p>
              <label>
                What is your nickname:
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  placeholder="Example: jackson11!"
                />
                
                <p>For privacy reasons, do not use your full name or email address.</p>
              </label>
              </p>
              <label>
                Your email:
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Please enter your email"
                />
                <p>For authentication reasons, you will not be emailed.</p>
              </label>
              <button type="submit" onClick={(e) => {handleSubmit(e); handleCloseModal();}}>Submit Question</button>
              </div>
          </>
        )}

    </div>
  );
};

export default QuestionForm;
