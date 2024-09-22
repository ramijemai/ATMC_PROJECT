// RoutesScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Alert, StyleSheet,TextInput } from 'react-native';
import { Button } from '@rneui/themed';
import RouteCard from '../../components/RouteCard';


const RoutePage = ({ navigation }) => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
      const fetchRoutes = async () => {
          try {
              const response = await fetch(`http://192.168.1.16:8089/ATMC/ATMC/Get-Routes`);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setRoutes(data);
          } catch (error) {
              console.error('Error fetching routes:', error);
          } finally {
              setLoading(false);
          }
      };

      const intervalId = setInterval(() => {
        fetchRoutes();
      }, 1000); // Fetch every 1 second
  
      return () => clearInterval(intervalId);
    }, []);
  
  const handleDelete = async (routeID) => {
    try {
        const response = await fetch(`http://192.168.1.16:8089/ATMC/ATMC/Delete-Route/${routeID}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete the route');
        }
        // Update state to remove the deleted route
        setRoutes((prevRoutes) => prevRoutes.filter(route => route.routeID !== routeID));
        Alert.alert('Success', 'Route deleted successfully');
    } catch (error) {
        Alert.alert('Error', error.message);
    }
};

   // Filtered routes based on search query
   const filteredRoutes = routes.filter(route =>
    route.routeID.toString().includes(searchQuery)
);

  if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
            <TextInput 
                style={styles.searchBar} 
                placeholder="Search by route number..." 
                value={searchQuery}
                onChangeText={setSearchQuery} // Update search query
            />
            
        </View>
        <FlatList
            data={filteredRoutes} // Use filtered routes
            renderItem={({ item }) => (
                <RouteCard
                    route={item}
                    onDelete={() => handleDelete(item.routeID)}
                />
            )}
            keyExtractor={(item) => item.routeID.toString()}
        />
        <Button 
                title="Ajouter"
                buttonStyle={styles.buttonStyle}
                onPress={() => navigation.navigate('Add Route')}
                containerStyle={styles.buttonContainer}
                titleStyle={styles.buttonTitle} 
            />
    </View>
);
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width:320,
    margin: 20
},
searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
},
  buttonTitle: {
    fontWeight: 'bold',
  },
});


export default RoutePage;