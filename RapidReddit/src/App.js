import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {UserProfile} from './screens/UserProfile'
import {Login} from './screens/Login'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle="dark-content"
      />
      <UserProfile/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
