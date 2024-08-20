import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const ChatScreen = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (name && message) {
      const newMessage = { id: messages.length.toString(), name, message };
      setMessages([...messages, newMessage]);
      setMessage(''); // Clear the message input after sending
    }
  };

  const renderMessageItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.name}>{item.name}:</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  return (
    
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        style={styles.chatArea}
      />

      <View style={styles.inputContainer}>
        <TextInput
          
          value={"Rami"}
          
        />
        <TextInput
          style={styles.input}
          placeholder="Message"
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  
  chatArea: {
    flex: 1,
    backgroundColor:'#fff',
    margin:15

    
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    
  },
  name: {
    fontWeight: 'bold',
    marginRight: 5,
    marginLeft:15,
    marginTop : 10

  },
  message: {
    flex: 1,
    marginTop : 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginLeft: 10
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin:15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
