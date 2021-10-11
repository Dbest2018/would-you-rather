import * as questionTypes from "../constants/question";
import { getUsers } from "./user";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../../api/data";

const getQuestionsRequest = (promise) => {
  return {
    type: questionTypes.GET_QUESTIONS_REQUEST,
    payload: promise,
  };
};

const getQuestionsFailed = (error) => {
  return {
    type: questionTypes.GET_QUESTIONS_FAILED,
    payload: error,
  };
};

const getQuestionsSuccess = (questions) => {
  return {
    type: questionTypes.GET_QUESTIONS_SUCCESS,
    payload: questions,
  };
};

export const getQuestions = () => {
  return (dispatch) => {
    const promise = _getQuestions();
    dispatch(getQuestionsRequest(promise));
    promise
      .then((questions) => {
        dispatch(getQuestionsSuccess(questions));
      })
      .catch((error) => {
        dispatch(getQuestionsFailed(error));
      });
    return promise;
  };
};

const saveQuestionRequest = (promise) => {
  return {
    type: questionTypes.SAVE_QUESTION_REQUEST,
    payload: promise,
  };
};

const saveQuestionFailed = (error) => {
  return {
    type: questionTypes.SAVE_QUESTION_FAILED,
    payload: error,
  };
};

const saveQuestionSuccess = (question) => {
  return {
    type: questionTypes.SAVE_QUESTION_SUCCESS,
    payload: question,
  };
};

const saveUserQuestion = (question) => {
  return {
    type: questionTypes.SAVE_USER_QUESTION_SUCCESS,
    payload: question,
  };
};

export const saveQuestion = (question) => {
  return (dispatch) => {
    const promise = _saveQuestion(question);
    dispatch(saveQuestionRequest(promise));
    promise
      .then((question) => {
        dispatch(saveQuestionSuccess(question));
        dispatch(saveUserQuestion(question));
      })
      .catch((error) => {
        dispatch(saveQuestionFailed(error));
      });
    return promise;
  };
};

const saveAnswerRequest = (promise) => {
  return {
    type: questionTypes.SAVE_ANSWER_REQUEST,
    payload: promise,
  };
};

const saveAnswerFailed = (error) => {
  return {
    type: questionTypes.SAVE_ANSWER_FAILED,
    payload: error,
  };
};

const saveAnswerSuccess = (answer) => {
  return {
    type: questionTypes.SAVE_ANSWER_SUCCESS,
    payload: answer,
  };
};

export const saveAnswer = (answer) => {
  return (dispatch) => {
    const promise = _saveQuestionAnswer(answer);
    dispatch(saveAnswerRequest(promise));
    promise
      .then((questions) => {
        dispatch(saveAnswerSuccess(questions));
        getQuestions()(dispatch);
        getUsers()(dispatch);
      })
      .catch((error) => {
        dispatch(saveAnswerFailed(error));
      });
    return promise;
  };
};
