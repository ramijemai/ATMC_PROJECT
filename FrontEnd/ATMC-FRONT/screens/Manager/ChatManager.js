import React from 'react';
import { SafeAreaView } from 'react-native';
import ChatScreenManager from '../Manager/ChatScreenManager.js';

const ChatManager = ({ route }) => {
  // Get userInfo from route.params
  const { userInfo } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Pass userInfo to ChatScreen */}
      <ChatScreenManager route={{ params: { userInfo } }} />
    </SafeAreaView>
  );
};

export default ChatManager;
