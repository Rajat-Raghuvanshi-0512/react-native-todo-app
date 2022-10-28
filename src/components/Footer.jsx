import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Icon name="home" size={40} color="#000000cc" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Icon name="user" size={40} color="#000000cc" />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#eeeeee",
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowColor: "#000000aa",
  },
});
