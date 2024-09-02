import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MHome = () => {
  return (  // This is the return statement
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome to MHome!</Text>
        <Text>Some text here</Text>
        <Text>This is another line of text.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default MHome;