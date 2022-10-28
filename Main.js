import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Profile from "./src/screens/Profile";
import SignUp from "./src/screens/SignUp";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./src/components/Footer";
import Loader from "./src/components/Loader";
import { useEffect } from "react";
import { loadUser } from "./src/redux/Actions/userActions";
import Camera from "./src/screens/Camera";
import UpdateProfile from "./src/screens/UpdateProfile";
import ChangePass from "./src/screens/ChangePass";

const Stack = createNativeStackNavigator();

const Main = () => {
  const { isAuthenticated, userloading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  if (userloading) {
    return <Loader />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Home" : "Login"}
        screenOptions={{
          headerTitleStyle: {
            fontSize: 24,
          },
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#232323",
          },
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: "Home" }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ title: "Profile" }}
            />
            <Stack.Screen
              name="Camera"
              component={Camera}
              options={{ title: "Camera" }}
            />
            <Stack.Screen
              name="UpdateProfile"
              component={UpdateProfile}
              options={{ title: "Update Profile" }}
            />
            <Stack.Screen
              name="ChangePass"
              component={ChangePass}
              options={{ title: "Change Password" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ title: "SignUp" }}
            />
          </>
        )}
      </Stack.Navigator>
      {isAuthenticated && <Footer />}
    </NavigationContainer>
  );
};

export default Main;
