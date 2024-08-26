import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from '@rneui/themed';

const ChatScreen = ({ route } ) => {
  const { userInfo } = route.params;  // Access userInfo passed from TabNavigator
  const [messages, setMessages] = useState('');
  const [messageInput, setMessageInput] = useState('');


  useEffect(() => {
    // Fetch messages initially
    fetchMessages();

    // Set up polling to fetch messages every 2 seconds
    const intervalId = setInterval(() => {
        fetchMessages();
    }, 2000); // 2000 milliseconds = 2 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
}, []);

const fetchMessages = async () => {
  try {
      const response = await fetch('http://192.168.0.55:8089/ATMC/ATMC/Get-Messages');
      const data = await response.json();
      setMessages(data);
  } catch (error) {
      console.error('Error fetching messages:', error);
  }
};

const sendMessage = async () => {
    if (messageInput.trim() === '') return;

    const newMessage = {
        content: messageInput,
        senderId: userInfo.driverID,  // Replace with actual sender ID
        senderType: 'Driver'  // Replace with actual sender type
    };

    try {
      await fetch('http://192.168.0.55:8089/ATMC/ATMC/addMessage', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessage),
      });
      setMessageInput('');  // Clear input field
      fetchMessages();  // Refresh messages
  } catch (error) {
      console.error('Error sending message:', error);
  }
};
const renderItem = ({ item }) => (
  <View style={styles.messageContainer}>
      <Text style={styles.senderName}>{item.senderName}</Text>
      <Text style={styles.messageContent}>{item.content}</Text>
      <Text style={styles.messageTimestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
  </View>
);
  

  return (
    <SafeAreaView style={styles.container}>
       <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item.messageId.toString()}
                style={styles.chatArea}
                inverted  // To display the latest messages at the bottom
                
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={messageInput}
                    onChangeText={setMessageInput}
                    placeholder="Type your message..."
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'space-between',
  },
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 1,
      borderColor: '#ddd',
  },
  input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 4,
      padding: 10,
  },
  messageContainer: {
      padding: 6,
      borderBottomWidth: 1,
      borderColor: '#ddd',
      flexDirection: 'column',
      justifyContent: 'flex-start',
  },
  messageContentContainer: {
      flexDirection: 'column',
  },
  senderName: {
      fontWeight: 'bold',
  },
  messageContent: {
      marginVertical: 5,
  },
  messageTimestamp: {
      fontSize: 12,
      color: '#888',
      textAlign: 'right',  // Align text to the right
      alignSelf: 'flex-end', // Align the text container to the right
  },
});

export default ChatScreen;