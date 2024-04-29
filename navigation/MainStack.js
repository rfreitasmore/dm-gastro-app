import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import RestaurantDetailsScreen from "../screens/RestaurantDetailsScreen";
// import MenuTabs from './MenuTabs';

function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen name="Mapa" component={MapScreen} options={{ title: "" }} />
      <Stack.Screen
        name="RestaurantDetails"
        component={RestaurantDetailsScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}

export { MainStackNavigator };
