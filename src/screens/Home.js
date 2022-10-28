import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Todo from "../components/Todo";
import {
  addNotes,
  clearErrors,
  clearMessage,
  editNote,
  fetchNotes,
} from "../redux/Actions/notesActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import CustomDialog from "../components/CustomDialog";

const Home = () => {
  const [editTodoVisible, setEditTodoVisible] = useState(false);
  const [addTodoVisible, setaddTodoVisible] = useState(false);
  const [todoData, settodoData] = useState({ id: "", title: "", desc: "" });
  const dispatch = useDispatch();
  const { mynotes, loading, isUpdated, isDeleted, error, msg } = useSelector(
    (state) => state.notes
  );

  const showDialog = (data) => {
    setEditTodoVisible(true);
    settodoData(data);
  };

  const hideDialog = () => setEditTodoVisible(false);
  const hideAddDialog = () => setaddTodoVisible(false);

  const addTodo = (title, desc) => {
    dispatch(addNotes(title, desc));
  };
  const editTodo = (title, desc) => {
    dispatch(editNote(todoData.id, title, desc));
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Failed", error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      // Alert.alert("Success", "Note updated successfully");
      dispatch({ type: "EDIT_NOTE_RESET" });
    }
    if (isDeleted) {
      // Alert.alert("Success", "Note deleted");
      dispatch({ type: "DELETE_NOTE_RESET" });
    }
    dispatch(fetchNotes());
  }, [dispatch, isUpdated, isDeleted, error, Alert]);
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>My Todos</Text>
        <TouchableOpacity
          style={styles.todoButton}
          onPress={() => setaddTodoVisible(true)}
        >
          <Text style={styles.todoButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {mynotes?.map((item) => (
            <Todo
              key={item._id}
              id={item._id}
              title={item.title}
              desc={item.desc}
              showDialog={showDialog}
            />
          ))}
        </ScrollView>
      )}
      <CustomDialog
        dialTitle={"Edit todo"}
        visible={editTodoVisible}
        hideDialog={hideDialog}
        todoData={todoData}
        onSaveHandler={editTodo}
      />
      <CustomDialog
        dialTitle={"Add new todo"}
        visible={addTodoVisible}
        hideDialog={hideAddDialog}
        onSaveHandler={addTodo}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  todoButton: {
    backgroundColor: "#00aaff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 7,
  },
  todoButtonText: {
    color: "white",
    fontWeight: "600",
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
