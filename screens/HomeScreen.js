import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Title } from 'react-native-paper'

const HomeScreen = () => {
  const navigation = useNavigation()

  const SignUp = () => {
        navigation.replace("Signup")
  }
  const SignIn = () => {
    navigation.replace("Login")
}

  return (
    <KeyboardAvoidingView style={styles.backgroundStuff}>
      <Title style={styles.teamProHeader}>TeamPro</Title>
    <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={SignUp}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={SignIn}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  backgroundStuff: {
    backgroundColor: '#002E27',
    height: '100%',
  },
  teamProHeader: {
    color: '#E8E8E8', 
    fontSize: 30, 
    textAlign: 'center',
    marginTop: 150,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%'
  },
   button: {
    backgroundColor: '#E8E8E8',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#002E27',
    fontWeight: '700',
    fontSize: 16,
  },
})
