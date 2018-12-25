import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Game from '../game/code/Game';
import MapAdapter from './MapAdapter';
import { Font } from 'expo';
import Home from './Home';
import Levels from './Levels';
import LevelComplete from './LevelComplete';

export default class GameAdapter extends React.Component {

  constructor() {
    super();

    this.maps = [];
    this.currentMap = null;
    this.game = new Game();
    this.selectingLevels = false;
    this.game.onUpdateGameState = () => this.handleUpdateGameState();

    this.state = { 
      fontLoaded: false 
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'AbrilFatface': require('../assets/fonts/AbrilFatface-Regular.ttf'),
    });

    this.setState({ 
      fontLoaded: true 
    });
  }

  handleUpdateGameState() {
    this.forceUpdate();
  }

  handleStartGame() {
    this.game.start()

    this.forceUpdate();
  }

  handleMenu() {
    this.game.stop();
    this.selectingLevels = false;

    this.forceUpdate();
  }

  handleLevelSelectMenu() {
    this.selectingLevels = true; 

    this.forceUpdate();
  }

  handleLevelSelected(levelName) {
    this.game.startLevel(levelName);
    this.selectingLevels = false;
    this.forceUpdate();
  }

  handleNext() {
    this.game.nextLevel();
    this.forceUpdate();
  }

  render() {
    if (!this.state.fontLoaded) {
      return (<View></View>)
    }

    if (!this.game.playing) {
      if (this.selectingLevels) {
        return (<Levels levels={this.game.levels} onLevelSelect={(levelName) => this.handleLevelSelected(levelName)} onMenu={() => this.handleMenu()} />)
      }

      if (this.game.levelComplete) {
        return (<LevelComplete onNext={() => this.handleNext()} onMenu={() => this.handleMenu()} />)
      }

      return (<Home onLevelSelectMenu={() => this.handleLevelSelectMenu()} onStartGame={() => this.handleStartGame()} />)
    }

    return (<MapAdapter onMenu={() => this.handleMenu()}  map={this.game.currentMap}/>);
  }
}

const styles = StyleSheet.create({
    gameContainer: {

    }
});
