import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { deleteNote } from "../redux/Actions/notesActions";
import { useDispatch } from "react-redux";

const Todo = ({ title, desc, showDialog, id }) => {
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.flexBetween}>
          <Text style={styles.title}>{title}</Text>
          <View style={{ flexDirection: "row", flex: 0.3 }}>
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Icon
                name="pen"
                size={30}
                color="#000099ca"
                onPress={() => showDialog({ id, title, desc })}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="delete"
                size={30}
                color="#990000ca"
                onPress={() => dispatch(deleteNote(id))}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </>
  );
};

export default Todo;

const styles = StyleSheet.create({
  mainContainer: {
    elevation: 1,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "100%",
    marginVertical: 10,
  },
  flexBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "500",
    fontSize: 24,
    flex: 1,
  },
  desc: {
    fontSize: 13,
    paddingVertical: 10,
    textAlign: "justify",
  },
});
