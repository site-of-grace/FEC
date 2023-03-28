import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
import { setQuestionId, setQuestionBody, setQuestionDate, setAskerName, setQuestionHelpfulness, setReported, setAnswers, setQuestionArr } from '../../store/questionsSlice';
const axios = require('axios');

const Questions = () => {
  
  const dispatch = useDispatch();
  const { mainProduct } = useSelector((state) => state.overview); // store.slice
  const questions  = useSelector((state) => state.question); // store.slice
  
  // console.log('QUESTIONS======>', questions);
  
  const [loading, setLoading] = useState(true);
  const [clickedAnswers, setClickedAnswers] = useState([]);
  const [numQuestions, setNumQuestions] = useState(2);

  
  const getQuestions = (product_id) => {
    return (dispatch) => {
      axios.get('/questions', { 
        params: {
          product_id: product_id
        }
      })
      .then((response) => {
        const questions = response.data.results;
        console.log('questions=====>', questions);
        dispatch(setQuestionArr(questions));
        setLoading(false);
      })
      .catch((err) => {
        console.log('err: ', err); 
      });
    };
  };
  
  const handleAnswerVote = ( answerId ) => {
    if (clickedAnswers.includes(answerId)) { //no click for you
      return; 
    }
    
    axios.put(`/answer/helpful/${answerId}`, {})
    .then(() => {
      console.log('Successfull helpful link click');
      setClickedAnswers([...clickedAnswers, answerId]);
      // console.log('clickedAnswers=====>', clickedAnswers);
      dispatch(getQuestions(mainProduct.id));

    })
    .catch((err) => {
      console.log('err on helpful link click: ', err); 
    });
  };
  
  const handleLoadMore = () => {
    setNumQuestions(numQuestions + 2);
  }
  
    
  useEffect(() => {
    if(mainProduct.id) {
      dispatch(getQuestions(mainProduct.id));
    }
  }, [dispatch, mainProduct.id]);
  
  
  // console.log('mainProduct=====> ', mainProduct);  
  
  if (loading) {
    return <div>Loading questions...</div>;
  }
  
  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  
  return (
    <div className="widget">
      <h1>QUESTIONS & ANSWERS</h1>
      <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." />
      <div>
        {Object.values(questions.questionArr).splice(0, numQuestions).map((question) => {
          return <div key={question.question_id}>
            {console.log('question=====>', question)}
            
            <strong>Q: {question.question_body}</strong>
            {/* {console.log('question.answers=====> ', question.answers)} */}
            {Object.values(question.answers)
              .sort((a, b) => b.helpfulnness - a.helpfulness ? 1 : -1)
              .splice(0, 2)
              .map((answer) => {
                return (
                <div key={answer.id}>
                  <p>
                    A: {answer.body}
                  </p>
                  <div className="qa-left">
                    by {answer.answerer_name === 'seller' ? 
                    (<div>{answer.answerer_name} - <strong>Seller</strong></div>) 
                    :
                    answer.answerer_name}, 
                    {formattedDate(answer.date)}
                  </div>
                  <div className="qa-right">
                    | Helpful?
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      handleAnswerVote(answer.id);
                    }}
                    >
                    Yes 
                    </a>
                    ({answer.helpfulness})
                  </div>
                </div>
                );
              })
            }
              | FAKE Report | <p>FAKE Yes, as you can see in these photos</p>
              <p>FAKE **PHOTOS HERE**</p>
          </div>;
        })}
      </div>
      {(Object.values(questions.questionArr).length > 2) && (Object.values(questions.questionArr).length > numQuestions) && (
        <button onClick={handleLoadMore}>MORE ANSWERED QUESTIONS</button>
      )}
    </div>
  );
};

export default Questions;
