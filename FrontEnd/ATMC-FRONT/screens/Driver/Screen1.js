import React, { useEffect, useState } from 'react';
import { View, StyleSheet,ScrollView,Linking  } from 'react-native';
import DestinationCard from '../../components/DestinationCard';
import { Button } from '@rneui/themed';


const Screen1 = ({ route ,navigation}) => {
  const { userInfo } = route.params; 
  const [routeData, setRouteData] = useState(null);
  const [routesCompData,setRoutesCompData]= useState(null);
  const [KmTraveled,setKmTraveled]= useState(null);
  const [error, setError] = useState(null);
  const CIN= userInfo.cin;

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const response = await fetch(`http://192.168.1.16:8089/ATMC/ATMC/routes/current?CIN=${CIN}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch route');
        }

        const data = await response.json();
        setRouteData(data);
      } catch (error) {
        setError(error);
      }
    };

    const fetchRoutesCompletetd = async () => {
      try {
        const response = await fetch(`http://192.168.1.16:8089/ATMC/ATMC/routes/completed?CIN=${CIN}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch route');
        }

        const data = await response.json();
        setRoutesCompData(data);
      } catch (error) {
        setError(error);
      }
    };

    const fetchKmTraveled = async () => {
      try {
        const response = await fetch(`http://192.168.1.16:8089/ATMC/ATMC/kilometers/traveled?CIN=${CIN}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch route');
        }

        const data = await response.json();
        setKmTraveled(data);
      } catch (error) {
        setError(error);
      }
    };

    const intervalId = setInterval(() => {
      fetchRouteData();
      fetchRoutesCompletetd();
      fetchKmTraveled();
    }, 1000); // Fetch every 1 second

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [CIN]);
  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Converts to local date and time format
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps`;
    // Open URL
    Linking.openURL(url).catch(err => console.error('Error opening Google Maps', err));
  };
   // Access userInfo here
  return (
    <ScrollView>
    <View style={styles.screen}>
      
      {routeData ? (
        <DestinationCard
          image={require('./Home/Items/truckImage.jpg')}
          title="Route Actuelle"
          numero={`Route numero: ${routeData.routeID}`}
          location={`Destination: ${routeData.destination}`}
          status={`Status: ${routeData.status}`}
          arrivementEstime={`Arrivement estimé: ${formatTimestamp(routeData.arrivementEstime)}`}
          numRemorque={`Numero Remorque: ${routeData.numRemorque}`}
          client={`Client: ${routeData.client}`}
          typeRemorque={`Type remorque: ${routeData.typeRemorque}`}
          typeVoyage={`Type Voyage: ${routeData.typeVoyage}`}

        />
        
        
      ) : (
        <DestinationCard
          image={require('./Home/Items/truckImage.jpg')}
          title="Route Actuelle"
          numero={`Aucune Route Associé`}
         
        />
      )}
      <Button title="Maps" 
          onPress={openGoogleMaps}
          buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle} />
<DestinationCard
       image={require('./Home/Items/stats.png')}
       title="Mes performances"
      numero={'Total Kilometres parcourus : '+KmTraveled}
      client={'Routes Completées :'+routesCompData}
       
      />
      <DestinationCard
       image={require('./Home/Items/chats.jpg')}
       title="Profile"
       numero={'Utilisateur :' + userInfo.name}
       client={'CIN :'+userInfo.cin}
       location={'Camion: '+userInfo.assignedTruck}


      />
    </View>
    <Button
            title="Deconnecter"
            onPress={() => navigation.navigate('LoginScreen')}
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

export default Screen1;

