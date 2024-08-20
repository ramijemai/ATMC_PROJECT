import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Header = ({ title, onSidebarToggle }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onSidebarToggle}>
        
         
      </TouchableOpacity>
      <Image
          source={require('../assets/logo.png')} // Replace with your icon
          style={styles.logo}
        />
      <Text style={styles.headerText}>{title}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 15,
    backgroundColor: '#202466',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
  },
  icon: {
    width: 30,
    height: 30,
  },
  logo:{
    width: 100,
    height:70
  }
});

export default Header;