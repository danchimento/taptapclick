import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Game from './game/game';

export default class GameAdapter extends React.Component {

    

  constructor() {
    this.currentMap = null;
    this.game = new Game();
  }

  render() {
    return (
      <View style={styles.gameContainer}>
            <MapAdapter  />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    gameContainer: {

    }
});
