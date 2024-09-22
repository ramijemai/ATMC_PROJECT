import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, Image, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import RNPickerSelect from 'react-native-picker-select';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';



const AssignRoute = ({ navigation }) => {
  const [DriverID, setDriverID] = useState('');
  const [numRemorque, setnumRemorque] = useState('');
  const [error, setError] = useState('');
  const [status] = useState('EN_COURS');
  const [typeVoyage, settypeVoyage] = useState('');
  const [typeRemorque, settypeRemorque] = useState(null);
  const [client, setclient] = useState(null);
  const [destination, setdestination] = useState(null);
  const [arrivementEstime, setarrivementEstime] = useState(new Date());

  const handleSubmit = async () => {
    if (!numRemorque || !client || !destination || !arrivementEstime) {
      setError('Veuillez remplir tous les champs requis.');
      return;
    }
  
    const data = {
      arrivementEstime,
      numRemorque,
      status,
      typeVoyage,
      typeRemorque,
      destination,
      client,
    };
  
    try {
      const response = await fetch(
        `http://192.168.1.16:8089/ATMC/ATMC/add-Route/${DriverID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          body: JSON.stringify(data),
        }
      );
  
      if (response.ok) {
        const result = await response.json();
        Alert.alert('Success', 'Route assigned successfully!');
        console.log('API Response:', result);
        // Clear form fields
        setDriverID('');
        setarrivementEstime(new Date());
        setclient('');
        setdestination('');
        setnumRemorque('');
        settypeVoyage('');
        settypeRemorque('');
        navigation.navigate('Routes')
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setError('Failed to assign route.');
      }
    } catch (error) {
      console.error('Error assigning route:', error);
      setError('Failed to assign route.');
    }
  };
  
  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.card}>
          <Image source={require('../Driver/Home/Items/CommT.png')} style={styles.image} />
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Numero chauffeur</Text>
            <TextInput
              style={[styles.input, styles.flexGrow]}
              value={DriverID}
              onChangeText={setDriverID}
              keyboardType="default"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Client</Text>
            <TextInput
              style={[styles.input, styles.flexGrow]}
              value={client}
              onChangeText={setclient}
              keyboardType="default"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Destination</Text>
            <TextInput
              style={[styles.input, styles.flexGrow]}
              value={destination}
              onChangeText={setdestination}
              keyboardType="default"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Arrivée estimée</Text>
            <View style={[styles.input, styles.datePickerContainer]}>
              <DatePicker
                selected={arrivementEstime}
                onChange={date => setarrivementEstime(date)}
                showTimeSelect
                dateFormat="Pp"
                customInput={<Text style={styles.dateText}>{arrivementEstime.toLocaleString()}</Text>}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Numero remorque</Text>
            <TextInput
              style={[styles.input, styles.flexGrow]}
              value={numRemorque}
              onChangeText={setnumRemorque}
              keyboardType="default"
            />
          </View>


          <View style={styles.inputContainer}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.input}>{status}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Type de Voyage</Text>
            <RNPickerSelect
              onValueChange={settypeVoyage}  // Use the state setter function
              items={[
                { label: 'Livraison', value: 'LIVRAISON' },
                { label: 'Enlevement', value: 'ENLEVEMENT' },
              ]}
              style={{
                inputIOS: [styles.input, styles.flexGrow],
                inputAndroid: [styles.input, styles.flexGrow],
              }}
              value={typeVoyage} // Ensure picker value matches state
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Type de Remorque</Text>
            <RNPickerSelect
              onValueChange={settypeRemorque}  // Use the state setter function
              items={[
                { label: 'Tolée', value: 'TOLEE' },
                { label: 'Bachée', value: 'BACHEE' },
              ]}
              style={{
                inputIOS: [styles.input, styles.flexGrow],
                inputAndroid: [styles.input, styles.flexGrow],
              }}
              value={typeRemorque} // Ensure picker value matches state
            />
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
export default AssignRoute;
