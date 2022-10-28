import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleValidEmail } from "../utils/helpers";
import { clearErrors, RegisterUser } from "../redux/Actions/userActions";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailValidError, setEmailValidError] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const dispatch = useDispatch();

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const handleRegister = () => {
    if (!email || !password || !name || !cpassword)
      return alert("Please fill all the fields");
    if (emailValidError) return alert(emailValidError);
    if (password !== cpassword) {
      return alert("Passwords doesnot match");
    }
    dispatch(RegisterUser({ name, email, password, cpassword }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Home");
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [isAuthenticated, navigation, error]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>User</Text>
        <Text style={styles.heading}>Register</Text>
        <Text style={styles.subHeading}>Welcome to Todo App</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Name</Text>
        <TextInput
          onChangeText={(value) => {
            setName(value);
          }}
          style={styles.input}
          placeholder="Enter your name"
          autoComplete="name"
        />
        <Text style={styles.text}>Email</Text>
        <TextInput
          onChangeText={(value) => {
            setEmail(value);
            handleValidEmail(value, setEmailValidError);
          }}
          style={styles.input}
          placeholder="Enter your email"
          autoComplete="email"
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter your password"
          onChangeText={(value) => {
            setPassword(value);
          }}
        />
        <Text style={styles.text}>Confirm Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Confirm your password"
          onChangeText={(value) => {
            setCpassword(value);
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={{ fontSize: 20, color: "#fff" }}>Sign up</Text>
        </TouchableOpacity>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <Text>Already a user? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ textDecorationLine: "underline", color: "#0000ff" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 0,
    display: "flex",
    flex: 1,
    overflow: "scroll",
  },
  headingContainer: {
    flex: 0.2,
  },
  heading: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  subHeading: {
    textAlign: "center",
  },
  inputContainer: {
    flex: 0.3,
  },
  text: {
    fontSize: 15,
    marginTop: 20,
  },
  input: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
    fontSize: 15,
    borderRadius: 7,
    backgroundColor: "#eeeeee",
    elevation: 1,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 0,
    },
  },
  button: {
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#232323",
    padding: 15,
    borderRadius: 10,
  },
});
