import axios from "axios";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_USER_REQUEST",
    });
    const { data } = await axios.get(
      "https://notes-collector.herokuapp.com/api/aboutme"
    );

    dispatch({
      type: "LOAD_USER_SUCCESS",
      payload: {
        isAuthenticated: data.success,
        userInfo: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "LOAD_USER_FAIL",
      payload: error?.response?.data?.error,
    });
    console.log(error?.response?.data?.error);
  }
};

export const LoginUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });
    const { data } = await axios.post(
      "https://notes-collector.herokuapp.com/api/login",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        isAuthenticated: true,
        userInfo: data,
      },
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error?.response?.data?.error,
    });
    console.log(error?.response?.data?.error);
  }
};

export const RegisterUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "REGISTER_REQUEST",
    });
    const { data } = await axios.post(
      "https://notes-collector.herokuapp.com/api/signup",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: {
        isAuthenticated: true,
        userInfo: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAIL",
      payload: error.response.data.error,
    });
    console.log(error.response.data.error);
  }
};

export const clearErrors = () => async (dispatch) => {
  try {
    dispatch({
      type: "CLEAR_ERRORS",
    });
  } catch (error) {
    console.log(error.response.data.error);
  }
};
