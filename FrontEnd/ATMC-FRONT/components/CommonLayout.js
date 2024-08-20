// components/CommonLayout.js
import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

export default function CommonLayout({ children }) {
  return (
    <ImageBackground
      source={require('../assets/Back.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
});
