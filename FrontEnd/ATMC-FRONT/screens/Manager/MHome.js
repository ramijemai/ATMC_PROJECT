import React, { useEffect, useState } from 'react';
import { View, StyleSheet,ScrollView,Linking ,Text } from 'react-native';
import DestinationCard from '../../components/DestinationCard';
import ClickableCard from '../../components/ClickableCard';
import { Button } from '@rneui/themed';

const MHome = ({ route ,navigation}) => {
  const { userInfo } = route.params; 
  const [temperature, setTemperature] = useState(null);
  const [date, setDate] = useState(new Date());
  
  useEffect(() => {
    // Fetch temperature from OpenWeatherMap API (Free Tier)
    const fetchTemperature = async () => {
      const apiKey = 'e36bb00e51f4cf23471395f92768a480';  // Replace with your OpenWeatherMap free API key
      const city = 'Tunis';            // Replace with your city
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`; // Free tier

      try {
        const response = await fetch(url);
        const data = await response.json();
        setTemperature(data.current.temp_c);  // Celsius temperature
      } catch (error) {
        console.error('Error fetching temperature:', error);
      }
    };

    fetchTemperature();

    // Update date and time every minute
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (  // This is the return statement
    <ScrollView>
    <View style={styles.screen}>
      <Text style={styles.title}>Bienvenue {userInfo.name}</Text>
      <DestinationCard
       image={require('../Driver/Home/Items/TRUCK-IN-NATURE.jpg')}
       title="Date et état de la météo"
       numero={'Date :' + date.toLocaleDateString()}
       client={'Temps :'+date.toLocaleTimeString()}
       location={'Temperature: 31°C'}


      />
        <ClickableCard
        image={require('../Driver/Home/Items/rapport.jpeg')}
        title="Statistiques et Rapports"

        />
        
        <ClickableCard
        image={require('../Driver/Home/Items/TCFLEET.png')}
        title="TC FLEET"

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',  // Centers the text horizontally
    width: '100%', 
    
  },
});

export default MHome;