import axios from "axios";

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_USERS_REQUEST" });

  const baseurl = process.env.REACT_APP_BASE_URL;
  try {
    const response = await axios.get(baseurl + "api/users/getallusers");
    console.log(response);
    dispatch({ type: "GET_ALL_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ALL_USERS_FAILED", payload: error });
  }
};

export const setUserData = (userData) => (dispatch) => {
  dispatch({ type: "SET_USER_DATA", payload: userData });
};
