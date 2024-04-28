// import React, { useState } from 'react';
// import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
// import axios from 'axios';
// import { launchImageLibrary } from 'react-native-image-picker';

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]);

//   const onSend = async (messages = []) => {
//     const { text, image } = messages[0];

//     if (text) { // Handle text messages
//       const response = await axios.post('/api/chat', { text });
//       setMessages(prevState => [...prevState, response.data]);
//       return;
//     }

//     if (image) { // Handle image URI
//       const formData = new FormData();
//       formData.append('image', {
//         uri, // Use the captured image URI from state
//         type: 'image/jpeg', // Adjust based on image type
//         name: 'image.jpg', // Adjust filename as needed
//       });
//       const response = await axios.post('/api/chat/image', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessages(prevState => [...prevState, response.data]);
//     }
//   };

//   const handleImagePick = async () => {
//     const options = {
//       mediaType: 'photo',
//       quality: 1,
//     };
//     const result = await launchImageLibrary(options);
//     if (result.didCancel) return;
//     const { uri } = result;
//     setMessages(prevState => [...prevState, { image: uri }]); // Add image preview to chat
//   };

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={onSend}
//       renderInputToolbar={() => (
//         <InputToolbar
//           {...props}
//           containerStyle={{ borderTopWidth: 0 }} // Remove top border
//           accessoryComponent={{
//             type: 'custom',
//             onPress: handleImagePick,
//             content: '', // Optional icon for image selection
//           }}
//         />
//       )}
//       // ... other chat configuration options
//     />
//   );
// };

// const express = require('express');
// const multer = require('multer');
// const fs = require('fs'); // For file system access

// const app = express();
// const upload = multer({ dest: 'uploads/' }); // Configure upload directory

// app.post('/api/chat', async (req, res) => {
//   const { text } = req.body;
//   // Process text message (e.g., saving to database)
//   // Generate response message based on predefined logic
//   const response = "Your message was: " + text;
//   res.json({ text: response });
// });

// app.post('/api/chat/image', upload.single('image'), async (req, res) => {
//   const { file } = req; // Access uploaded image details
//   const { path } = file; // Get temporary file path

//   // Read image data from temporary file
//   const imageData = fs.readFileSync(path);

//   // Clean up temporary file
//   fs.unlinkSync(path);

//   // Now you have the image data in 'imageData' variable
//   // You can pass this data to your AI model for processing
//   // ... (Your AI model integration logic here)

//   const response = "Your image analysis is in progress...";
//   res.json({ text: response });
// });

// app.listen(3000, () => console.log('Server listening on port 3000'));


// export default ChatApp;



// // import { StatusBar } from 'expo-status-bar';
// // import { StyleSheet, Text, View } from 'react-native';
// // import ChatBot from '../src/chatBot';

// // export default function App() {
// //     return (
// //         <View style={StyleSheet.container}>
// //             <ChatBot />
// //         </View>

// //     );
// // }


// // const styles = StyleSheet.create({

// //     container: {
// //         flex: 1,
// //         backgroundColor: '#fff',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //     }
// // })