import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextView, Button } from 'react-native';
import Game from '../game/code/Game';
import MapAdapter from './MapAdapter';
//import { Font } from 'expo';
import Home from './Home';
import Levels from './Levels';
import LevelComplete from './LevelComplete';
import { AsyncStorage } from "react-native"
import Fade from './Fade';

export default class GameAdapter extends React.Component {


  states = {
    HOME: "HOME",
    LEVEL_SELECT: "LEVEL_SELECT",
    LEVEL_COMPLETE: "LEVEL_COMPLETE",
    PLAYING: "PLAYING"
  }

  constructor() {
    super();

    this.maps = [];
    this.currentMap = null;
    this.game = new Game();
    this.game.onUpdateGameState = () => this.handleLevelComplete();

    this.state = {
      fontLoaded: false,
      state: this.states.HOME
    }

    this.init();
  }

  async init() {
    var data = await this._getSaveData();
    this.game.loadData(data);
  }

  async componentDidMount() {
    // await Font.loadAsync({
    //   'AbrilFatface': require('../assets/fonts/AbrilFatface-Regular.ttf'),
    // });

    this.setState({
      fontLoaded: true,
    });
  }

  handleLevelComplete() {

    var saveData = this.game.getSaveData();
    this._saveData(saveData);
    this.setState({ state: this.states.LEVEL_COMPLETE });

    this.forceUpdate();
  }

  handleStartGame() {
    this.game.start()
    this.setState({ state: this.states.PLAYING })

    this.forceUpdate();
  }

  handleMenu() {
    this.game.stop();
    this.setState({ state: this.states.HOME })

    this.forceUpdate();
  }

  handleLevelSelectMenu() {
    this.setState({ state: this.states.LEVEL_SELECT })

    this.forceUpdate();
  }

  handleLevelSelected(levelName) {
    this.game.startLevel(levelName);
    this.setState({ state: this.states.PLAYING })

    this.forceUpdate();
  }

  handleNext() {
    this.game.nextLevel();
    this.forceUpdate();
  }

  
  render() {

    let { state } = this.state;

    if (!this.state.fontLoaded) {
      return (<View></View>)
    }

    return(
          // <Levels levels={this.game.levels} onLevelSelect={(levelName) => this.handleLevelSelected(levelName)} onMenu={() => this.handleMenu()} />

          // <LevelComplete onNext={() => this.handleNext()} onMenu={() => this.handleMenu()} />
        
          <Home onLevelSelectMenu={() => this.handleLevelSelectMenu()} onStartGame={() => this.handleStartGame()} />

          // <MapAdapter onMenu={() => this.handleMenu()}  map={this.game.currentMap}/>
    )
  }
}

const styles = StyleSheet.create({
  gameContainer: {
  },
});
