import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { DefaultScreen } from "../nestedScreens";
import { CommentsScreen } from "../nestedScreens";
import { MapScreen } from "../nestedScreens";
const NestedScreen = createStackNavigator();

import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

export default function PostScreen({}) {
  return (
    // <Text>!!</Text>
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="DefaultScreen" component={DefaultScreen} />
      <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
    </NestedScreen.Navigator>
  );
}
