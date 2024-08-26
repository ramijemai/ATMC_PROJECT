import React from 'react';
import { SafeAreaView } from 'react-native';
import ChatScreen from '../Driver/ChatScreen';

const Chat = ({ route }) => {
  // Get userInfo from route.params
  const { userInfo } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Pass userInfo to ChatScreen */}
      <ChatScreen route={{ params: { userInfo } }} />
    </SafeAreaView>
  );
};

export default Chat;
