import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  question_id: 0,
  question_body: '',
  question_date: '',
  asker_name: '',
  question_helpfulness: 0,
  reported: false,
  answers: {}
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestionId: (state, action) => {
      state.question_id = action.payload;
    },
    setQuestionBody: (state, action) => {
      state.question_body = action.payload;
    },
    setQuestionDate: (state, action) => {
      state.question_date = action.payload;
    },
    setAskerName: (state, action) => {
      state.asker_name = action.payload;
    },
    setQuestionHelpfulness: (state, action) => {
      state.question_helpfulness = action.payload;
    },
    setReported: (state, action) => {
      state.reported = action.payload;
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
  }
});

export const { setQuestionId, setQuestionBody, setQuestionDate, setAskerName, setQuestionHelpfulness, setReported, setAnswers } = questionsSlice.actions;

export default questionsSlice.reducer;