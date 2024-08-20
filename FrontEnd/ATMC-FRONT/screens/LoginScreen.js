import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import CommonLayout from '../components/CommonLayout.js';

export default function LoginScreen({ navigation }) {
  const [CIN, setCIN] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('driver');

  const handleLogin = () => {
    console.log('CIN:', CIN);
    console.log('Password:', password);
    console.log('Role:', role);
    navigation.navigate('Screen1');
  };

  return (
    <CommonLayout>
      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />

        <TextInput
          style={styles.input}
          placeholder="CIN"
          value={CIN}
          onChangeText={setCIN}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.roleContainer}>
          
          <TouchableOpacity
            style={styles.roleOption}
            onPress={() => setRole('manager')}
          >
            <Text style={role === 'manager' ? styles.selectedRole : styles.roleText}>Manager</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roleOption}
            onPress={() => setRole('driver')}
          >
            <Text style={role === 'driver' ? styles.selectedRole : styles.roleText}>Driver</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="LOG IN"
          onPress={handleLogin}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonTitle}
        />
      </View>
    </CommonLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    color: "#fff",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  roleOption: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  roleText: {
    color: '#000',
  },
  selectedRole: {
    color: 'red',
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
  },
  buttonContainer: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  buttonTitle: {
    fontWeight: 'bold',
  },
});