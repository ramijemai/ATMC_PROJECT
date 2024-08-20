import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const DestinationCard = ({ image, title,numero, location,status }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.textfield}>{numero}</Text>
        <Text style={styles.textfield}>{location}</Text>
        <Text style={styles.textfield} >{status}</Text>
      </View>
    </View>
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
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  textfield: {
    fontSize: 14,
    color: '#666',
  },
});

export default DestinationCard;