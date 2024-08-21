import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, Image, Alert } from 'react-native';
import { Button } from '@rneui/themed';

const CommencerRoute = () => {
  const [numRoute, setNumRoute] = useState('');
  const [kmDebut, setKmDebut] = useState('');
  const [status] = useState('COMMENCÉE');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Validate the form fields
    if (!numRoute) {
      setError('Veuillez entrer le numéro du route.');
      return;
    }
    if (!kmDebut) {
      setError('Veuillez entrer le KM de départ.');
      return;
    }

    try {
      // Perform API call to start the route
      const response = await fetch(
       `http://192.168.0.55:8089/ATMC/ATMC/start-Route/${numRoute}/${kmDebut}/${status}?newStatus=${status}`, 
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newStatus: status,  // Optional as the status is in the URL path
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        Alert.alert("Success", "Route started successfully!");
        console.log('API Response:', result);
      } else {
        setError('Failed to start route.');
      }
    } catch (error) {
      console.error('Error starting route:', error);
      setError('Failed to start route.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.card}>
          <Image source={require('../Driver/Home/Items/CommT.png')} style={styles.image} />
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Num Route</Text>
            <TextInput
              style={[styles.input, styles.flexGrow]}
              value={numRoute}
              onChangeText={setNumRoute}
              keyboardType="default"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Kilometrage</Text>
            <TextInput
              style={[styles.input, styles.flexGrow]}
              value={kmDebut}
              onChangeText={setKmDebut}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.input}>{status}</Text>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Button
            title="Confirmer"
            onPress={handleSubmit}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
          />
        </View>
      </View>
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

export default CommencerRoute;
