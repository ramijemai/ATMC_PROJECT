// RouteCard.js
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as FileSystem from 'expo-file-system';
import { Button } from '@rneui/themed';


const RouteCard = ({ route, onDelete }) => {
    const downloadImage = async (base64Image, filename) => {
        const fileUri = `${FileSystem.documentDirectory}${filename}`;
        try {
            await FileSystem.writeAsStringAsync(fileUri, base64Image, {
                encoding: FileSystem.EncodingType.Base64,
            });
            Alert.alert('Download Successful', `Image saved to ${fileUri}`);
        } catch (error) {
            Alert.alert('Download Failed', error.message);
        }
    };
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Converts to local date and time format
      };
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <Text style={styles.title}>Route numero: {route.routeID}</Text>
                <Text style={styles.textfield}>Client: {route.client}</Text>
                <Text style={styles.textfield}>Arrivé à: {formatTimestamp(route.arrivedAT)}</Text>
                <Text style={styles.textfield}>Type: {route.typeVoyage}</Text>
                <Text style={styles.textfield}>Status: {route.status}</Text>

                <View style={styles.buttonContainer}>
                {route.chargement && (
                        <TouchableOpacity
                            style={styles.downloadButton}
                            onPress={() => downloadImage(route.chargement, `chargement_${route.RouteID}.jpg`)}
                        >
                            <AntDesign name="download" size={24} color="black" />
                        </TouchableOpacity>
                    )}
                    {route.chargement && (
                        <Text style={styles.label}>Chargement</Text> // Label for Chargement
                    )}
                    {route.dechargement && (
                        <TouchableOpacity
                            style={styles.downloadButton}
                            onPress={() => downloadImage(route.dechargement, `dechargement_${route.RouteID}.jpg`)}
                        >
                            <AntDesign name="download" size={24} color="black" />
                        </TouchableOpacity>
                    )}
                    {route.dechargement && (
                        <Text style={styles.label}>Dechargement</Text> // Label for Dechargement
                    )}
                </View>

                {/* Edit and Delete Buttons */}
                <View style={styles.buttonContai}>
                  
                <Button 
          title="Supprimer"
           onPress={onDelete}
          buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    textfield: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginVertical: 10,
    },
    buttonStyle: {
        backgroundColor: 'red',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
      },
      buttonContai: {
        width: 130,
        marginVertical: 10,
        alignSelf: 'center',
      },
      buttonTitle: {
        fontWeight: 'bold',
      },
    downloadButton: {
        marginRight: 10,
    },
    label: {
        fontSize: 12,
        color: '#666',
        marginLeft: 5, // Space between icon and text
        alignSelf: 'center', // Center the label vertically
    },
});

export default RouteCard;