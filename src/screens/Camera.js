import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

const CameraComponent = ({ navigation }) => {
  const [type, setType] = useState(CameraType.front);
  const [camera, setCamera] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const openImagePicker = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    return navigation.navigate("UpdateProfile", { image: data.uri });
  };

  const clickPicture = async () => {
    const data = await camera.takePictureAsync();
    return navigation.navigate("UpdateProfile", { image: data.uri });
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  if (!permission) {
    requestPermission();
    return <View />;
  }
  if (!permission.granted) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ratio="1:1"
        type={type}
        ref={(e) => setCamera(e)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={openImagePicker}>
          <Icon name="image" size={30} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clickPicture}>
          <Icon name="camera" size={30} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <Icon name="rotate-left" size={30} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraComponent;

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
    borderRadius: 40,
  },
  icon: {
    overflow: "hidden",
    padding: 15,
  },
});
