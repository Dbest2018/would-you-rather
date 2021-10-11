import * as loginTypes from "../constants/login";

const initialState = {
  loading: false,
  error: null,
  user: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case loginTypes.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case loginTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case loginTypes.LOG_OUT:
      return {
        ...state,
        laoding: false,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default loginReducer;
