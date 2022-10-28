import axios from "axios";

export const fetchNotes = () => async (dispatch) => {
  //
  try {
    dispatch({
      type: "GET_ALL_NOTES_REQUEST",
    });
    const { data } = await axios.get(
      "https://notes-collector.herokuapp.com/api/fetchnote"
    );

    dispatch({
      type: "GET_ALL_NOTES_SUCCESS",
      payload: data.notes,
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_NOTES_FAIL",
      payload: error?.response?.data?.error,
    });
  }
};

export const addNotes = (title, desc) => async (dispatch) => {
  try {
    dispatch({
      type: "ADD_NOTE_REQUEST",
    });
    const { data } = await axios.post(
      `https://notes-collector.herokuapp.com/api/addnote`,
      { title, desc },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    dispatch({
      type: "ADD_NOTE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ADD_NOTE_FAIL",
      payload: error?.response?.data?.errors[0].msg,
    });
  }
};

export const deleteNote = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_NOTE_REQUEST",
    });
    const { data } = await axios.delete(
      `https://notes-collector.herokuapp.com/api/delete/${id}`
    );

    dispatch({
      type: "DELETE_NOTE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_NOTE_FAIL",
      payload: error?.response?.data?.error,
    });
  }
};

export const editNote = (id, title, desc) => async (dispatch) => {
  try {
    dispatch({
      type: "EDIT_NOTE_REQUEST",
    });
    const { data } = await axios.put(
      `https://notes-collector.herokuapp.com/api/update/${id}`,
      { title, desc }
    );

    dispatch({
      type: "EDIT_NOTE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "EDIT_NOTE_FAIL",
      payload: error?.response?.data?.error,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  try {
    dispatch({
      type: "CLEAR_ERRORS",
    });
  } catch (error) {}
};
