import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
  Button,
} from "react-native";

//stateSchema
const initialState = {
  photo: "",
  name: "",
  location: "",
};

//icons
const camera = require("../../assets/icon/camera.png");

export default function CreateScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [type, setType] = useState(CameraType.front);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [post, setPost] = useState(initialState);
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
    })();
    requestPermission;
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setdimensions(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      dimensionsHandler.remove();
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [photo]);

  const keyboardHide = () => {
    setKeyboardVisible(false);
    Keyboard.dismiss();
    console.log(post);
    setPost(initialState);
  };

  const submitForm = () => {
    // keyboardHide();
    navigation.navigate("PostsScreen", {
      id: "1",
      image: photo,
      // image: require("../../assets/images/postImg1.png"),
      title: "Test",
      comments: 8,
      location: "Test, Test",
      like: 153,
    });
    setPhoto(null);
  };
  const takePicture = async () => {
    try {
      let { uri } = await camera.takePictureAsync();
      let location = await Location.getCurrentPositionAsync({});
      console.log(
        "location",
        location.coords.latitude,
        location.coords.longitude
      );
      setPhoto(uri);
    } catch (error) {
      console.log(error);
    }
  };
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  if (!permission) {
    // Camera permissions are still loading
    return null;
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.permissionContainer}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {isFocused && (
        <Camera
          skipProcessing={true}
          type={type}
          onCameraReady={onCameraReady}
          onMountError={(error) => {
            154;
            console.log("cammera error", error);
            155;
          }}
          ref={setCamera}
          style={{
            height: "70%",
            borderRadius: "50%",
            marginHorizontal: 10,
            // flex: 1,
            // marginTop: 50,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          {photo && (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                borderColor: "white",
                borderWidth: 1,
              }}
            >
              <Image source={{ uri: photo, height: 200, width: 200 }} />
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 50,
              width: 70,
              height: 70,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={takePicture}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              PHOTO
            </Text>
          </TouchableOpacity>
        </Camera>
      )}
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          marginTop: 50,
          marginLeft: "auto",
          marginRight: "auto",
          borderWidth: 1,
          borderColor: "red",
          borderRadius: 50,
          width: 70,
          height: 70,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={submitForm}
      >
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
    // <TouchableWithoutFeedback onPress={keyboardHide}>
    //   <View style={{ ...styles.container, width: dimensions + 16 * 2 }}>
    //     <TouchableOpacity activeOpacity={0.6} style={{ marginBottom: 8 }}>
    //       {!isKeyboardVisible && (
    //         <>
    //           <View style={styles.addImage}>
    //             <Image source={camera} style={styles.cameraIcon} />
    //           </View>
    //           <View>
    //             <Text style={styles.addTitile}>Загрузите фото</Text>
    //           </View>
    //         </>
    //       )}
    //     </TouchableOpacity>
    //     <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
    //       <View
    //         style={{
    //           ...styles.form,
    //           paddingBottom: isKeyboardVisible ? 10 : 0,
    //         }}
    //       >
    //         <View style={{ marginBottom: 16 }}>
    //           <TextInput
    //             placeholder="Название..."
    //             value={post.name}
    //             style={styles.input}
    //             textAlign={"left"}
    //             onFocus={() => setKeyboardVisible(true)}
    //             onChangeText={(value) =>
    //               setPost((prevState) => ({ ...prevState, name: value }))
    //             }
    //           />
    //         </View>
    //         <View style={{ marginBottom: 32, position: "relative" }}>
    //           <TextInput
    //             placeholder="Местность..."
    //             value={post.location}
    //             style={styles.input}
    //             textAlign={"left"}
    //             onFocus={() => setKeyboardVisible(true)}
    //             onChangeText={(value) =>
    //               setPost((prevState) => ({ ...prevState, location: value }))
    //             }
    //           />
    //         </View>
    //       </View>
    //     </KeyboardAvoidingView>
    //     <TouchableOpacity
    //       activeOpacity={0.6}
    //       style={styles.subBtn}
    //       onPress={() => submitForm()}
    //     >
    //       <Text style={styles.btnTitle}>Опубликовать</Text>
    //     </TouchableOpacity>

    //     {!isKeyboardVisible && (
    //       <TouchableOpacity
    //         activeOpacity={0.6}
    //         style={styles.dellBtn}
    //         onPress={() => submitForm()}
    //       >
    //         <MaterialIcons name="delete-outline" size={24} color="#DADADA" />
    //       </TouchableOpacity>
    //     )}
    //   </View>
    // </TouchableWithoutFeedback>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  addImage: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    height: 240,
  },
  cameraIcon: {},
  addTitile: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "400",
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    marginBottom: 30,
  },
  form: {},
  input: {
    paddingBottom: 16,
    paddingTop: 16,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "400",
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  subBtn: {
    marginBottom: 16,
    paddingBottom: 16,
    paddingTop: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    fontFamily: "Roboto-Regular",
    backgroundColor: "#F6F6F6",
    ...Platform.select({
      ios: {
        borderColor: "#FF6C00",
        backgroundColor: "transparent",
      },
      android: {
        borderColor: "transparent",
        backgroundColor: "#F6F6F6",
      },
      default: {
        borderColor: "transparent",
        backgroundColor: "#F6F6F6",
      },
    }),
  },
  btnTitle: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    ...Platform.select({
      ios: {
        color: "#1B4371",
      },
      android: {
        color: "#BDBDBD",
      },
      default: {
        color: "#BDBDBD",
      },
    }),
  },
  dellBtn: {
    marginTop: "auto",
    marginBottom: 10,
    padding: 12,
    width: 70,
    height: 50,
    marginRight: "auto",
    marginLeft: "auto",
    alignItems: "center",

    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});
