import React from 'react';
import { View, StyleSheet,Image } from 'react-native';

const App = () => {
  return (
<View style={styles.card}>
   
    <Image source={require('../screens/Driver/Home/Items/kilome.jpg')} style={styles.image}></Image>
          

    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  
  content: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  textfield: {
    fontSize: 14,
    color: '#666',
  },
});

export default App;