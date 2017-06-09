import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Accelerometer from './src/components/Accelerometer'

export default class App extends React.Component {
  render() {
    return (
      <Accelerometer></Accelerometer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
