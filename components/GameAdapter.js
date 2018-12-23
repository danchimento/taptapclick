import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Game from '../game/code/Game';
import MapAdapter from './MapAdapter';

export default class GameAdapter extends React.Component {

  constructor() {
    super();

    this.currentMap = null;
    this.game = new Game();

    var map1 = require('../game/maps/map1.json');

    this.game.addMap(map1);

    this.game.startMap(map1.name);
  }

  render() {
    return (
      <View style={styles.gameContainer}>
            <MapAdapter  map={this.game.currentMap}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    gameContainer: {

    }
});
