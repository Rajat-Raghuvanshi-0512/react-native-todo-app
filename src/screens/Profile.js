import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { loadUser, logout } from "../redux/Actions/userActions";

const Profile = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState("");
  const { userInfo, loading, isUpdated, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const logoutUser = async () => {
    await dispatch(logout());
    dispatch(loadUser());
  };

  useEffect(() => {
    setAvatar(userInfo?.profilePhoto?.url || "");
  }, []);

  useEffect(() => {
    if (route?.params?.image) {
      setAvatar(route.params.image);
    }
    if (isUpdated) {
      dispatch({ type: "UPDATE_PROFILE_RESET" });
      dispatch(loadUser());
    }
    if (message) {
      Alert.alert("Success", message);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [route?.params, isUpdated, message]);

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={200}
        source={{ uri: avatar || userInfo?.profilePhoto?.url }}
        style={{ backgroundColor: "#000" }}
      />
      <View style={styles.dataContainer}>
        <Text style={styles.heading}>Name</Text>
        <TextInput
          style={styles.subheading}
          placeholder="Name"
          value={userInfo.name}
          editable={false}
        />
        <Text style={styles.heading}>Email</Text>
        <TextInput
          style={styles.subheading}
          placeholder="Name"
          value={userInfo.email}
          editable={false}
        />
      </View>
      <View>
        <View style={styles.flexJustify}>
          <TouchableOpacity
            onPress={() => navigation.navigate("UpdateProfile")}
            style={styles.otherButtons}
          >
            <Text style={styles.otherText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChangePass")}
            style={styles.otherButtons}
          >
            <Text style={styles.otherText}>Change Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logoutUser}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
    fontSize: 20,
    marginVertical: 30,
    padding: 10,
  },
  dataContainer: {
    padding: 15,
    width: "80%",
    fontSize: 20,
    marginVertical: 20,
  },
  flexJustify: {
    flexDirection: "row",
    marginBottom: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "200",
    marginBottom: 40,
  },
  otherButtons: {
    backgroundColor: "#000000cc",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  otherText: {
    fontSize: 15,
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "red",
    borderRadius: 5,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    paddingVertical: 15,
    fontSize: 20,
  },
});
