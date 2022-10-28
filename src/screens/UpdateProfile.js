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

const UpdateProfile = ({ navigation, route }) => {
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Avatar.Image
        size={200}
        source={{ uri: avatar || userInfo?.profilePhoto?.url }}
        style={{ backgroundColor: "#000" }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <Text style={styles.button}>Change Photo</Text>
      </TouchableOpacity>
      <View style={{ width: "70%" }}>
        <TextInput placeholder="Name" value={userInfo.name} />
        <TouchableOpacity>
          <Text>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  icon: {
    overflow: "hidden",
    padding: 15,
  },
});
