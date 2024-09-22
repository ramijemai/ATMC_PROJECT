import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';

const DriverCard = ({ title, assignedTruck, name, cin, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.textfield}>{name}</Text>
        <Text style={styles.textfield}>{assignedTruck}</Text>
        <Text style={styles.textfield}>{cin}</Text>

        <View style={styles.buttonContainer}>
          <Button 
          title="Supprimer"
           onPress={onDelete}
          buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle} />
        </View>
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
    marginBottom: 8,
  },
 buttonStyle: {
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
  },
  buttonContainer: {
    width: 130,
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonTitle: {
    fontWeight: 'bold',
  },
});

export default DriverCard;
