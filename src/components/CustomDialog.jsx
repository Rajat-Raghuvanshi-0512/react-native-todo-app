import React from "react";
import { Button, Dialog, TextInput, Text } from "react-native-paper";
import { useState } from "react";
import { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";

const CustomDialog = ({
  visible,
  hideDialog,
  dialTitle,
  onSaveHandler,
  todoData = {},
}) => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");

  const handlePress = () => {
    if (inputTitle.length < 3) {
      Alert.alert("Error", "Title too short");
      setInputTitle(todoData?.title);
      return;
    }
    if (inputDesc.length < 5) {
      Alert.alert("Error", "Description too short");
      setInputDesc(todoData?.desc);
      return;
    }

    onSaveHandler(inputTitle, inputDesc);
    hideDialog();
    setInputTitle("");
    setInputDesc("");
  };

  useEffect(() => {
    setInputTitle(todoData.title || "");
    setInputDesc(todoData.desc || "");
  }, [todoData.title, todoData.desc]);
  return (
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Title style={styles.title}>{dialTitle}</Dialog.Title>
      <Dialog.Content>
        <View style={styles.input}>
          <Text>Title</Text>
          <TextInput
            value={inputTitle}
            onChangeText={setInputTitle}
            placeholder="To-do title"
            style={styles.input}
          />
        </View>
        <View style={styles.input}>
          <Text>Description</Text>
          <TextInput
            value={inputDesc}
            onChangeText={setInputDesc}
            placeholder="To-do description"
            style={styles.input}
          />
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideDialog} style={styles.button} color="#990000">
          Cancel
        </Button>
        <Button onPress={handlePress} style={styles.button}>
          Save
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default CustomDialog;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginTop: 40,
  },
  input: {
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  button: {
    padding: 10,
  },
});
