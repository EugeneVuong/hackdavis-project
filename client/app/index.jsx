import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../src/components/Button';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';


export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  // const takePicture = async () => {
  //   if (cameraRef) {
  //     try {
  //       const data = await cameraRef.current.takePictureAsync();

  //       setImage(data.uri);
  //       console.log(data.uri)
  //       let img = data.uri;
  //       const sendImageForAnalysis = async (img) => {
  //         try {
  //           const response = await axios.post('../utils/predict', { img });

  //           // Handle response from AI (display results etc.)
  //         } catch (error) {
  //           console.error('Error sending image:', error);
  //         }
  //       };
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
        console.log(data.uri);
        let img = data.uri;
  
        // Navigation Logic (assuming you use React Navigation)
        navigation.navigate('Chat', { imageUri: img });
  
        // ... rest of your code (optional: sendImageForAnalysis)
      } catch (error) {
        console.log(error);
      }
    }
  };
  

  const savePicture = async () => {
    if (image) {
      try {
        // Replace with your actual API endpoint URL
        const response = await axios.post('http://localhost:3000/askAI', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set headers if your API expects them
          },
        });
        alert('Picture Sent! Awaiting Response :D ');
        setImage(null);
        console.log('Sent successfully');

        // Prepare image data for API request (adjust based on your API requirements)
        const formData = new FormData();
        formData.append('image', {
          uri: image, // Or you might need to use asset.uri
          type: 'image/jpeg', // Adjust based on your API's expected format
          name: 'chat_image.jpg', // Optional: Set a filename
        });

        // Replace with your actual API endpoint URL

        const data = await response.json();
        console.log(data); // Log the API response

        // Handle successful upload and response data (e.g., navigate to chat screen with image URL)
        if (data.success) {
          const imageUri = data.imageUrl; // Replace with the actual response property name for image URL
          navigation.navigate('Chat', { imageUri }); // Navigate to Chat screen with image URL
        } else {
          console.error('Error uploading image:', data.error); // Handle upload errors
        }
      } catch (error) {
        console.error(error);
      }
    }
  };


  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <Button
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? "gray" : "#fff"}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <Button
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet"
            />
            <Button title="Ask AI" onPress={savePicture} icon="check" />
          </View>
        ) : (
          <Button title="Take a picture" onPress={takePicture} icon="camera" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000",
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#E9730F",
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
});
