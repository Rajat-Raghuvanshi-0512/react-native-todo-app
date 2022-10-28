import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const Profile = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState("");
  const { userInfo, loading } = useSelector((state) => state.user);

  useEffect(() => {
    setAvatar(userInfo?.profilePhoto?.url || "");
  }, []);

  useEffect(() => {
    if (route?.params?.image) {
      setAvatar(route.params.image);
    }
  }, [route?.params]);

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
        />
        <Text style={styles.heading}>Email</Text>
        <TextInput
          style={styles.subheading}
          placeholder="Name"
          value={userInfo.email}
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
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  camera: {
    flex: 1,
  },
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
