import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Title } from 'react-native-paper'
import { auth } from '../firebase'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const LoginScreen = () => {
    const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const firestore = firebase.firestore();
  const usersRef = firestore.collection('users');

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Dashboard")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        usersRef.add({
            text: name,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: user.uid,
    })
    navigation.replace("Dashboard")
      })
      
      .catch(error => alert(error.message))
  }

  const backScreen = () => {
    navigation.replace("Home")
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
        <View style={styles.buttonContainer1}>
        <TouchableOpacity
          onPress={backScreen}
          style={styles.button1}
        >
          <Text style={styles.buttonText1}>Back</Text>
        </TouchableOpacity>
      </View>
        <Title style={styles.teamProHeader}>TeamPro</Title>
      <View style={styles.inputContainer}>
      <Text style={styles.inputHeader}>Name</Text>
      <TextInput
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <Text style={styles.inputHeader}>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <Text style={styles.inputHeader}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#002E27',
    height: '100%',
  },
  inputHeader: {
    color: '#E8E8E8',
    marginTop: 20,
  },
  teamProHeader: {
    color: '#E8E8E8', 
    fontSize: 30, 
    textAlign: 'center',
    marginTop: 150,
  },
  inputContainer: {
    width: '80%',
    marginTop:20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: '#E8E8E8',
    marginTop: 5,
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#002E27',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonContainer1: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginRight: '70%' ,
  },
 button1: {
    backgroundColor: '#E8E8E8',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
buttonText1: {
    color: '#002E27',
    fontWeight: '700',
    fontSize: 16,
  },
})
