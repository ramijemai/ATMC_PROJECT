import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ClickableCard = ({ image, title }) => {
  const handlePress = () => {
    // Navigate to the 'DetailsScreen' and pass the title as a parameter
    const url = `https://tc-fleet.com/#!/login`;
    // Open URL
    Linking.openURL(url).catch(err => console.error('Error opening Google Maps', err));    
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 16,
    alignItems: 'center', // Center the title text
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default ClickableCard;
