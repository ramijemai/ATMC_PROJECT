import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, Image, Alert,TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';


const MAX_IMAGE_SIZE = 1 * 800 * 1024; // 1MB in bytes

const TerminerRoute = () => {
  const [numRoute, setNumRoute] = useState('');
  const [EndKM, setEndKM] = useState('');
  const [status] = useState('COMPLETEE');
  const [error, setError] = useState('');
  const [imageUri, setImageUri] = useState(null);


  const compressImage = async (uri) => {
    
    let result = await ImageManipulator.manipulateAsync(
      uri,
      [],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );

    let compressedUri = result.uri;
    let { size } = await FileSystem.getInfoAsync(compressedUri);

    while (size > MAX_IMAGE_SIZE) {
      result = await ImageManipulator.manipulateAsync(
        compressedUri,
        [{ resize: { width: result.width * 0.9 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      compressedUri = result.uri;
      ({ size } = await FileSystem.getInfoAsync(compressedUri));
    }

    return compressedUri;
  };

  // Function to open the camera and capture an image
  const handleCaptureImage = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera access is required to capture images.');
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled && result.assets.length > 0) {
      const compressedUri = await compressImage(result.assets[0].uri);
      setImageUri(compressedUri);
    } else {
      Alert.alert('No Image Captured', 'Please capture an image to proceed.');
    }
  };
  const handleSubmit = async () => {
    // Validate the form fields
    if (!numRoute) {
      setError('Veuillez entrer le numéro du route.');
      return;
    }
    if (!EndKM) {
      setError('Veuillez entrer le KM d arrivé.');
      return;
    }
    if (!imageUri) {
      setError('Veuillez capturer une image.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('newStatus', status);
      formData.append('image', {
        uri: imageUri,
        name: 'route-image.jpg',
        type: 'image/jpeg',
      });
      // Perform API call to start the route
      const response = await fetch(
       `http://192.168.0.55:8089/ATMC/ATMC/update-Route/${numRoute}/${EndKM}/${status}?newStatus=${status}`, 
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );
      if (response.ok) {
      const result = await response.json();
        Alert.alert('Success', 'Route Completed successfully!');
        console.log('API Response:', result);
        // Clear form fields after success
        setNumRoute('');
        setEndKM('');
        setImageUri(null);
      } else {
        setError('Failed to Complete route.');
      }
    } catch (error) {
      console.error('Error Completing route:', error);
      setError('Failed to Complete route.');
    }
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
              keyboardType="default"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Kilometrage</Text>
            <TextInput
              style={[styles.input, styles.flexGrow]}
              value={EndKM}
              onChangeText={setEndKM}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.input}>{status}</Text>
          </View>
          <TouchableOpacity onPress={handleCaptureImage} style={styles.captureButton}>
            <Text style={styles.captureButtonText}>Dechargement</Text>
          </TouchableOpacity>
          
          {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

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
  captureButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    marginTop: 12,
  },
  captureButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
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