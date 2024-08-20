import React from 'react';
import { View, StyleSheet,ScrollView } from 'react-native';
import DestinationCard from '../../components/DestinationCard';

const Screen1 = () => {
  return (
    <ScrollView>
    <View style={styles.screen}>
      <DestinationCard
       image={require('./Home/Items/truckImage.jpg')}
        title="Route Actuelle"
        numero="Route numero: 1"
        location="Destination: Paris"
        status="Status: En cours"
      />

<DestinationCard
       image={require('./Home/Items/stats.png')}
       title="Mes performances"
        numero="Total Kilometres parcourus : 540 Km "
       
      />
      <DestinationCard
       image={require('./Home/Items/chats.jpg')}
       title="Profile"
       numero="Nom Prenom: Rami"
       location="CIN : 09634455"


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

