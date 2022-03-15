import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import { Title } from 'react-native-paper'


const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Dashboard")
      }
    })

    return unsubscribe
  }, [])

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
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
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continue</Text>
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
  backBtn: {
    textAlign: 'center',
    marginTop: 50,
    height: '30%',
    width: '30%',
  },
  teamProHeader: {
    color: '#E8E8E8', 
    fontSize: 30, 
    textAlign: 'center',
    marginTop: 150,
  },
  inputContainer: {
    width: '80%'
  },
  inputHeader: {
    color: '#E8E8E8',
    marginTop: 20,
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
  buttonContainer1: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginRight: '70%' ,
  },
  button: {
    backgroundColor: '#E8E8E8',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#E8E8E8',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    marginTop: 5,
    borderWidth: 2,
  },
  buttonText: {
    color: '#002E27',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonText1: {
    color: '#002E27',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#002E27',
    fontWeight: '700',
    fontSize: 16,
  },
})
