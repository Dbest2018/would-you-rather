import * as loginTypes from "../constants/login";

export const loginUserRequest = (userId) => {
  return {
    type: loginTypes.LOGIN_SUCCESS,
    payload: userId,
  };
};

export const loginUser = (userId) => {
  return (dispatch, getState) => {
    const user = getState().users.users[userId];
    return new Promise((resolve, reject) => {
      if (userId) {
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(loginUserRequest(user));
        resolve(userId);
      } else {
        reject("User not found");
      }
    });
  };
};

export const logOutRequest = () => {
  return {
    type: loginTypes.LOG_OUT,
    payload: null,
  };
};

export const logOut = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      localStorage.removeItem("user");
      dispatch(logOutRequest());
      resolve();
    });
  };
};
