import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import SettingsScreen from './screens/SettingsScreen';
// import NotificationsScreen from './screens/NotificationsScreen';
// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
import { MainStackNavigator } from "./MainStack";
import BottomTabNavigator from "./TabNavigator";
import RegisterScreen from "../screens/RegisterScreen";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Principal"
        component={BottomTabNavigator}
        options={{ title: "Página Principal", headerTitle: "" }}
      />
      <Drawer.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Registar", headerTitle: "" }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
