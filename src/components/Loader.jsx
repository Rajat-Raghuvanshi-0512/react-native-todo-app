import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import React from "react";

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator animating={true} size={80} color="#000000ca" />
    </View>
  );
};

export default Loader;
