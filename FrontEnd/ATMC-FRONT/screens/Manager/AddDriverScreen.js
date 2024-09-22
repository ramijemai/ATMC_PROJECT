import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert,ScrollView,Text } from 'react-native';
import { Button } from '@rneui/themed';

const AddDriverScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [assignedTruck, setAssignedTruck] = useState('');
  const [cin, setCin] = useState('');
  const [password, setPassword]=useState('');

  const handleAddDriver = async () => {
    try {
      const response = await fetch('http://192.168.1.16:8089/ATMC/ATMC/add-Driver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          password: password,
          assignedTruck: assignedTruck,
          cin: cin,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Driver added successfully!');
        setName('');
        setAssignedTruck('');
        setCin('');
        setPassword('');
        navigation.navigate('Liste des chauffeurs')
      } else {
        Alert.alert('Error', 'Failed to add driver.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while adding the driver.');
    }
  };

  return (
    <ScrollView>
    <View style={styles.screen}>
    <View style={styles.card}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom et prenom</Text>
        <TextInput
          style={[styles.input, styles.flexGrow]}
          value={name}
          onChangeText={setName}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Camion</Text>
        <TextInput
          style={[styles.input, styles.flexGrow]}
          value={assignedTruck}
          onChangeText={setAssignedTruck}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CIN</Text>
        <TextInput
          style={[styles.input, styles.flexGrow]}
          value={cin}
          onChangeText={setCin}
          keyboardType="numeric"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={[styles.input, styles.flexGrow]}
          value={password}
          onChangeText={setPassword}
          keyboardType="password"
        />
      </View>
      </View>
      </View>

      <Button
            title="Ajouter"
            onPress={handleAddDriver}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
          />
        </ScrollView>

  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    marginRight: 8,
    fontWeight: 'bold',
    width: 100,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
  },
  flexGrow: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 25,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  buttonStyle: {
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
  },
  buttonContainer: {
    width: 180,
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonTitle: {
    fontWeight: 'bold',
  },
});

export default AddDriverScreen;
