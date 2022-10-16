import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../redux/Actions/userActions";
import { handleValidEmail } from "../utils/helpers";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailValidError, setEmailValidError] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const handleLogin = () => {
    if (!email || !password) return alert("Please fill both fields");
    if (emailValidError) return alert(emailValidError);
    dispatch(LoginUser({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Home");
    }
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>User</Text>
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.subHeading}>Welcome to Todo App</Text>
      </View>
      <View style={styles.inputContainer}>
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
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={{ fontSize: 20, color: "#fff" }}>Login</Text>
        </TouchableOpacity>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <Text>Not a user? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ textDecorationLine: "underline", color: "#0000ff" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Text>Forgot password? </Text>
          <TouchableOpacity>
            <Text style={{ textDecorationLine: "underline", color: "#0000ff" }}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 50,
    display: "flex",
    flex: 2,
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
    flex: 0.5,
  },
  text: {
    fontSize: 15,
    marginTop: 20,
  },
  input: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
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
