import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Game from '../game/code/Game';
import MapAdapter from './MapAdapter';
import { Font } from 'expo';
import Home from './Home';

export default class GameAdapter extends React.Component {

  constructor() {
    super();

    this.maps = [];
    this.currentMap = null;
    this.game = new Game();

    this.game.addMap(require('../game/maps/map3.json'));
    this.game.addMap(require('../game/maps/map2.json'));
    this.game.addMap(require('../game/maps/map1.json'));

    this.state = { 
      isPlaying: false,
      fontLoaded: false 
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'AbrilFatface': require('../assets/fonts/AbrilFatface-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  handleStartGame() {
    this.game.startMap(this.maps[0])

    this.setState({
      isPlaying: true
    })
  }

  handleMenu() {
    this.setState({
      isPlaying: false
    })
  }


  render() {
    if (!this.state.fontLoaded) {
      return (<View></View>)
    }

    if (!this.state.isPlaying) {
      return (<Home onStartGame={() => this.handleStartGame()} />)
    }

    return (<MapAdapter onMenu={() => this.handleMenu()}  map={this.game.currentMap}/>);
  }
}

const styles = StyleSheet.create({
    gameContainer: {

    }
});
