import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{ title: 'Camera' }} // Optional: Set screen title
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ title: 'Chat' }} // Optional: Set screen title
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }