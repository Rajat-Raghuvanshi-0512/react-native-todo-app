import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { updateProfile } from "../redux/Actions/userActions";
import * as FileSystem from "expo-file-system";

const UpdateProfile = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const { userInfo, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      updateProfile({ name, email: userInfo.email, profilePhoto: avatar })
    );
    navigation.navigate("Profile");
  };

  const setImage = async (file) => {
    if (!file) return;
    const base64 = await FileSystem.getContentUriAsync(file);
    setAvatar(base64);
  };

  useEffect(() => {
    setName(userInfo?.name || "");
  }, []);

  useEffect(() => {
    setImage(route?.params?.image);
  }, [route?.params]);

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={200}
        source={{ uri: avatar || userInfo?.profilePhoto?.url }}
        style={{ backgroundColor: "#000" }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <Text style={styles.photobutton}>Change Photo</Text>
      </TouchableOpacity>
      <View style={styles.dataContainer}>
        <Text style={styles.heading}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.heading}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={userInfo.email}
          editable={false}
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

export default UpdateProfile;
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 50,
  },
  photobutton: {
    backgroundColor: "#000000cc",
    borderRadius: 5,
    overflow: "hidden",
    fontSize: 15,
    marginVertical: 30,
    padding: 10,
    color: "#fff",
  },
  input: {
    fontSize: 20,
    fontWeight: "200",
    marginBottom: 40,
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 0.3,
    padding: 10,
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "200",
    marginBottom: 40,
  },
});
