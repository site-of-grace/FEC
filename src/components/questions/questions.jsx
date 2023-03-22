import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProduct, setStyles, setMainPhotos } from '../../store/overviewSlice';
import { setQuestionId, setQuestionBody, setQuestionDate, setAskerName, setQuestionHelpfulness, setReported, setAnswers, setQuestionArr } from '../../store/questionsSlice';
const axios = require('axios');

const Questions = () => {
  
  const dispatch = useDispatch();
  const { mainProduct } = useSelector((state) => state.overview); // store.slice
  const questions  = useSelector((state) => state.question); // store.slice

  
  //fake data for skeleton
  const fakeData = {
    product_id: '71706',
    results: [
      {
        question_id: 631421,
        question_body: 'Where is this product made?',
        question_date: '2018-02-28T00:00:00.000Z',
        asker_name: 'funnygirl',
        question_helpfulness: 15,
        reported: false,
        answers: {
          5892754: {
            answerer_name: "sillyguy",
            body: "China",
            date: "2018-03-28T00:00:00.000Z",
            helpfulness: 11,
            id: 5897275,
            photos: [
              "IM A PHOTO!"
            ]
          }
        }
      },
      {
        question_id: 631422,
        question_body: 'What fabric is the top made of?',
        question_date: '2019-09-12T00:00:00.000Z',
        asker_name: 'l33tgamer',
        question_helpfulness: 6,
        reported: false,
        answers: {
          5999754: {
            answerer_name: "secondguy",
            body: "Mexico",
            date: "2099-03-28T00:00:00.000Z",
            helpfulness: 5,
            id: 5897275,
            photos: []
          }
        }
      }
    ]
  };
    
  
  
  
  
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
  }

  
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
            
            <p>Q: {question.question_body}</p>
            A: {
            Object.values(question.answers).sort((a, b) => 
              b.helpfulnness - a.helpfulness).splice(0, 2).map((answer) => {
              return <div key={answer.id}>
                <p>{answer.body}</p>
                <p>by {answer.isSeller ? <strong>Seller</strong> : answer.answerer_name}, {formattedDate(answer.date)}</p>

              </div>;
            })
            }
            
            {/* <p>FAKE A: {fakeData.results[0].answers['5892754'].body}</p>
            FAKE by {fakeData.results[0].answers['5892754'].answerer_name}, 
            {Date(fakeData.results[0].answers['5892754'].date)} 
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
