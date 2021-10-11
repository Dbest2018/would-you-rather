import * as questionTypes from "../constants/question";

const initialState = {
  loading: false,
  requesting: false,
  error: null,
  questions: null,
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case questionTypes.GET_QUESTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case questionTypes.GET_QUESTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case questionTypes.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: action.payload,
      };

    case questionTypes.SAVE_QUESTION_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case questionTypes.SAVE_QUESTION_FAILED:
      return {
        ...state,
        requesting: false,
        error: action.payload,
      };

    case questionTypes.SAVE_ANSWER_SUCCESS:
      return {
        ...state,
        requesting: false,
        questions: {
          ...state.questions,
          [action.payload.id]: action.payload,
        },
      };

    default:
      return state;
  }
};

export default questionReducer;
