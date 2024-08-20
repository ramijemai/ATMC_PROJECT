import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput,Image } from 'react-native';
import { Button } from '@rneui/themed';


const TerminerRoute = () => {
  const [numRoute, setNumRoute] = useState('');
  const [EndKM, setEndKM] = useState('');
  const [status, setStatus] = useState('COMPLETEE');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // Validate the form fields
    if (!numRoute) {
      setError('Veuillez entrer le numéro du route.');
      return;
    }
    if (!EndKM) {
      setError('Veuillez entrer le Kilometrage.');
      return;
    }
    if (!status) {
      setError('Veuillez saisir le statut.');
      return;
    }
    

    // Reset the error message and perform the submission logic
    setError('');
    console.log('Form submitted:', { numRoute, EndKM, status, arrivedAT });
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.card}>
        <Image source={require('../Driver/Home/Items/endImg.jpg')} style={styles.image}></Image>
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Num Route</Text>
            <TextInput
              style={[styles.input, styles.flexGrow]}
              value={numRoute}
              onChangeText={setNumRoute}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Kilometrage</Text>
            <TextInput
              style={[styles.input, styles.flexGrow]}
              value={EndKM}
              onChangeText={setEndKM}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Status</Text>
            <TextInput
              style={[styles.input, styles.flexGrow]}
              value={status}
              onChangeText={setStatus}
            />
          </View>
          
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
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
    marginBottom:25,
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
export default TerminerRoute;