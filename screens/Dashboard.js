import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect, useRef, Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Button, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import { auth } from '../firebase'
import { ListItem } from 'react-native-elements';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBpmTzHzO_-S1NmLtYZGT_wnI05-9go_UA",
    authDomain: "teampro-ccb5d.firebaseapp.com",
    projectId: "teampro-ccb5d",
    storageBucket: "teampro-ccb5d.appspot.com",
    messagingSenderId: "135141015556",
    appId: "1:135141015556:web:d78bdd1b4dab7d1bb4b551"
};

firebase.firestore();

const Dashboard = () => {

    
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  class FetchListScreen extends Component {

    constructor() {
        super();
        this.docs = firebase.firestore().collection('messages').orderBy('createdAt').limit(25);
        this.state = {
          isLoading: true,
          messages: []
        };
      }
    
      componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getMessageData);
      }
    
      componentWillUnmount(){
        this.unsubscribe();
      }
    
      getMessageData = (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((res) => {
          const { text, uid } = res.data();
          messages.push({
            key: res.id,
            text,
            uid
          });
        });
        this.setState({
          messages,
          isLoading: false
       });
      }
    
    
    
      render() {
        if(this.state.isLoading){
          return(
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="red"/>
            </View>
          )
        }    
        return (
          <ScrollView style={styles.wrapper}>
              {
                this.state.messages.map((res, i) => {
                  return (
                    <ListItem 
                       key={i}           
                       bottomDivider >
                      <ListItem.Content style={styles.msgtext}>
                        <ListItem.Title >{res.text}</ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  );
                })
              }
          </ScrollView>
        );
      }
    }


  return (
    <View>
    <View style={styles.container}>
      <View style={styles.msgcontainer}>
        <Text style={styles.messagesText}>Messages</Text>
        </View>
        <FetchListScreen/>
    </View>
    <TouchableOpacity
    onPress={handleSignOut}
    style={styles.button}
  >
    <Text style={styles.buttonText}>Sign out</Text>
  </TouchableOpacity>
  </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '90%',
    padding: 15,
    borderRadius: 10,
    left: '5%',
    justifyContent: 'center',
    marginTop: 40,
  },
  msgcontainer: {
    borderBottomColor: '#002E27',
    borderBottomWidth: 2,
  },
  messagesText: {
    fontSize: 30,
    color: "#002E27",
  },
   button: {
    backgroundColor: '#002E27',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    left: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  msgtext: {
    backgroundColor: "#E8E8E8",
    padding: 15,
    borderRadius: 10,
  },

})
