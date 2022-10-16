import axios from "axios";

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
      payload: error.message,
    });
    console.log(error.message);
  }
};
