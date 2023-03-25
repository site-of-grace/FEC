import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
import { setQuestionId, setQuestionBody, setQuestionDate, setAskerName, setQuestionHelpfulness, setReported, setAnswers, setQuestionArr } from '../../store/questionsSlice';
const axios = require('axios');

const Questions = () => {
  
  const dispatch = useDispatch();
  const { mainProduct } = useSelector((state) => state.overview); // store.slice
  const questions  = useSelector((state) => state.question); // store.slice
  
  const [loading, setLoading] = useState(true);
  
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
    axios.put(`/answer/helpful/${answerId}`, {})
    .then(() => {
      console.log('Successfull helpful link click');
    })
    .catch((err) => {
      console.log('err on helpful link click: ', err); 
    });
  };
  
    
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
            {console.log('questionS=====>', questions)}

        {/* {questions.questionArr.map((question) => { */}
        {Object.values(questions.questionArr).splice(0, 2).map((question) => {
          return <div key={question.question_id}>
            {console.log('question=====>', question)}
            
            <strong>Q: {question.question_body}</strong>
            {
              console.log('question.answers=====> ', question.answers)}
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
            {/*             
              | FAKE Helpful? Yes ({fakeData.results[0].question_helpfulness}) 
              
              | FAKE Report
              <p>FAKE Yes, as you can see in these photos</p>
              
              <p>FAKE {fakeData.results[0].answers['5892754'].photos[0]}</p> */}
          </div>;
        })}
      </div>

    </div>
  );
};

export default Questions;
