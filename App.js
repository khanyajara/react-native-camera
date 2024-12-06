import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as VideoPicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsEditing:true,
      quality:1,
      });
  }
  const loadGallery = async () => {
    try {
      const storedImages = await AsyncStorage.getItem("gallery");
      if (storedImages) {
        setGallery(JSON.parse(storedImages));
      }
    } catch (error) {
      console.error("Failed to load images from storage", error);
    }
  };
  const saveGallery = async (images) => {
    try {
      await AsyncStorage.setItem("gallery", JSON.stringify(images));
    } catch (error) {
      console.error("Failed to save images to storage", error);
    }
  };
  useEffect(() => {
    loadGallery();
  }, []);
  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera access is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled && result.assets && result.assets[0].uri) {
      const newGallery = [...gallery, result.assets[0].uri];
      setGallery(newGallery);
      saveGallery(newGallery);
    } else {
      Alert.alert("No image", "No image was captured.");
    }
  };
  const handleUploadPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Media library access is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled && result.assets && result.assets[0].uri) {
      const newGallery = [...gallery, result.assets[0].uri];
      setGallery(newGallery);
      saveGallery(newGallery);
    } else {
      Alert.alert("No image", "No image was selected.");
    }
  };
  const handleRecordVideo = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera access is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      const newGallery = [...gallery, result.assets[0].uri];
      setGallery(newGallery);
      saveGallery(newGallery);
    } else {
      Alert.alert("No video", "No video was captured.");
    }
  };
  const handleUploadVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Media library access is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      const newGallery = [...gallery, result.assets[0].uri];
      setGallery(newGallery);
      saveGallery(newGallery);
    } else {
      Alert.alert("No video", "No video was selected.");
    }
  };
  const handleImagePress = (uri) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gallery</Text>
      <FlatList
        data={gallery}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.galleryContainer}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUploadPhoto}>
          <Ionicons name="image" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRecordVideo}>
          <Ionicons name="videocam" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUploadVideo}>
          <Ionicons name="folder" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close-circle" size={36} color="white" />
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.fullscreenImage} />
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b3f40",
    alignItems: "center",
    paddingVertical: 19,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0ffce9",
    marginBottom: 40,
    textAlign: "center",
  },
  galleryContainer: {
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  imageWrapper: {
    margin: 8,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  image: {
    width: (Dimensions.get("window").width - 60) / 3,
    height: (Dimensions.get("window").width - 60) / 3,
    resizeMode: "cover",
    borderRadius: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    marginTop: 30,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#03eaff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "35%",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.,
    shadowRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  fullscreenImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
    borderRadius: 8,
  },
});