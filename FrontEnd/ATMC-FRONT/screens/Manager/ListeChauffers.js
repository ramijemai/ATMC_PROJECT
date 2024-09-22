import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import DriverCard from '../../components/DriverCard';

const ListeChaffeurs = ({ navigation }) => {
  const [driverData, setdriverData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(`http://192.168.1.16:8089/ATMC/ATMC/Get-Drivers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch drivers');
        }

        const data = await response.json();
        setdriverData(data);
      } catch (error) {
        setError(error);
      }
    };

    const intervalId = setInterval(() => {
      fetchDrivers();
    }, 1000); // Fetch every 1 second

    return () => clearInterval(intervalId);
  }, []);




  const handleEdit = (driverID) => {
    // Handle edit logic
    Alert.alert('Edit Driver', `Edit driver with ID: ${driverID}`);
  };

  const handleDelete = async (driverID) => {
    try {
      const response = await fetch(`http://192.168.1.16:8089/ATMC/ATMC/Delete-Driver/${driverID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('Success', 'Driver deleted successfully');
        setdriverData((prevData) => prevData.filter(driver => driver.driverID !== driverID));
      } else {
        throw new Error('Failed to delete driver');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView>
     
           
      <View style={styles.screen}>
        {driverData.map(driver => (
          <DriverCard
            key={driver.driverID}
            title={`Chauffeur numero: ${driver.driverID}`}
            name={`Nom et Prenom: ${driver.name}`}
            assignedTruck={`Camion: ${driver.assignedTruck}`}
            cin={`CIN: ${driver.cin}`}
            onEdit={() => handleEdit(driver.driverID)}
            onDelete={() => handleDelete(driver.driverID)}
          />
        ))}
      </View>
      <Button 
           title="Ajouter"
           buttonStyle={styles.buttonStyle}
           onPress={() => navigation.navigate('Ajouter Chauffeur')}
           containerStyle={styles.buttonContainer}
           titleStyle={styles.buttonTitle} />
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingVertical: 16,
  },
  buttonStyle: {
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
  },
  buttonContainer: {
    width: 130,
    marginVertical: 10,
    marginTop: 15,
    alignSelf: 'center',
  },
  buttonTitle: {
    fontWeight: 'bold',
  },
});

export default ListeChaffeurs;
