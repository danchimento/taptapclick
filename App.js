import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Game from './code/game/game';
import GameAdapter from './components/GameAdapter';

export default class App extends React.Component {

  constructor() {

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipped: {
    transform: [{ rotateY: '45deg'}, ]
  }
});
