import React, { useEffect, useState } from 'react';
import { View, StyleSheet,ScrollView,Text  } from 'react-native';
import DestinationCard from '../../components/DestinationCard';

const Screen1 = ({ route }) => {
  const { userInfo } = route.params; 
  const [routeData, setRouteData] = useState(null);
  const [routesCompData,setRoutesCompData]= useState(null);
  const [KmTraveled,setKmTraveled]= useState(null);
  const [error, setError] = useState(null);
  const CIN= userInfo.cin;

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const response = await fetch(`http://192.168.0.55:8089/ATMC/ATMC/routes/current?CIN=${CIN}`, {
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
        const response = await fetch(`http://192.168.0.55:8089/ATMC/ATMC/routes/completed?CIN=${CIN}`, {
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
        const response = await fetch(`http://192.168.0.55:8089/ATMC/ATMC/kilometers/traveled?CIN=${CIN}`, {
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

    fetchRouteData();
    fetchRoutesCompletetd();
    fetchKmTraveled();
  }, [CIN]);


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
        />
      ) : (
        <DestinationCard
          image={require('./Home/Items/truckImage.jpg')}
          title="Route Actuelle"
          numero={`Aucune Route Associé`}
         
        />
      )}

<DestinationCard
       image={require('./Home/Items/stats.png')}
       title="Mes performances"
      numero={'Total Kilometres parcourus : '+KmTraveled}
      location={'Routes Completées :'+routesCompData}
       
      />
      <DestinationCard
       image={require('./Home/Items/chats.jpg')}
       title="Profile"
       numero={'Utilisateur :' + userInfo.name}
       location={'CIN :'+userInfo.cin}
       status={'Camion: '+userInfo.assignedTruck}


      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingVertical: 16,
  },
});

export default Screen1;

