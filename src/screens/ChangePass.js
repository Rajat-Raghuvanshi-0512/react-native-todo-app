import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePAssword, clearErrors } from "../redux/Actions/userActions";
import Loader from "../components/Loader";

const ChangePass = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const dispatch = useDispatch();
  const { loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );
  const handleSubmit = () => {
    if (newPass !== confirmPass)
      return Alert.alert("Error", "Passwords do not match");
    dispatch(changePAssword({ oldPass, newPass, confirmPass }));
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      Alert.alert("Error", error);
      dispatch({ type: "CHANGE_PASS_RESET" });
      dispatch(clearErrors());
    }
    if (message) {
      Alert.alert("Success", message);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [error]);

  if (loading) return <Loader />;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Are you sure you wanna change your password ?
      </Text>
      <View style={styles.dataContainer}>
        <Text style={styles.heading}>Current Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter old password"
          onChangeText={setOldPass}
          value={oldPass}
          secureTextEntry={true}
        />
        <Text style={styles.heading}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="New Password (Atleast 6 characters)"
          onChangeText={setNewPass}
          value={newPass}
          secureTextEntry={true}
        />
        <Text style={styles.heading}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={setconfirmPass}
          value={confirmPass}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.button} onPress={handleSubmit}>
          Save Changes
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePass;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 50,
  },
  title: {
    borderRadius: 5,
    overflow: "hidden",
    fontSize: 35,
    marginVertical: 30,
    paddingHorizontal: 30,
    fontWeight: "bold",
    textAlign: "justify",
  },
  input: {
    fontSize: 15,
    fontWeight: "200",
    marginBottom: 40,
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 0.3,
    padding: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#000000cc",
    borderRadius: 5,
    overflow: "hidden",
    fontSize: 20,
    paddingHorizontal: 30,
    paddingVertical: 15,
    color: "#fff",
    fontWeight: "bold",
  },
  dataContainer: {
    padding: 15,
    width: "80%",
    fontSize: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "200",
    marginBottom: 40,
  },
});
