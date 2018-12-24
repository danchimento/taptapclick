import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import GameAdapter from './components/GameAdapter';
import { Font } from 'expo';

export default class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        
        <GameAdapter />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipped: {
    transform: [{ rotateY: '45deg'}, ]
  }
});
