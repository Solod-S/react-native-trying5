import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import screens from "../";
const { DefaultScreen } = screens;
const NestedScreen = createStackNavigator();

export default function PostScreen() {
  <NestedScreen.Navigator>
    <NestedScreen.Screen name="DefaultScreen" component={DefaultScreen} />
    <NestedScreen.Screen
      name=""
      // component={ }
    />
    <NestedScreen.Screen
      name=""
      // component={ }
    />
  </NestedScreen.Navigator>;
}
