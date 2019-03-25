import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import GameAdapter from './components/GameAdapter';
import Home from './components/Home'
import Levels from './components/Levels'
import { createStackNavigator, createAppContainer} from 'react-navigation';
import SaveManager from './game/code/SaveManager';
import Game from './game/code/Game';


let game = new Game();

const AppNavigator = createStackNavigator({
  Levels: { screen: Levels, game: game },
  Home: { screen: Home },
}, { initialRouteName: "Home" });

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {

  constructor() {
    super();

    this.maps = [];
    this.currentMap = null;
    this.game = game;
    this.saveManager = new SaveManager();
    this.game.onUpdateGameState = () => this.handleLevelComplete();

    this.state = {
      fontLoaded: true,
    }

    this.init();
  }

  async init() {
    this.gameData = await this.saveManager.getSaveData();
    this.game.loadData(data);
  }

  someEvent() {
    // call navigate for AppNavigator here:
    this.navigator &&
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: someRouteName })
      );
  }
  render() {
    return (
      <AppContainer
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}


export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#313638',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipped: {
    transform: [{ rotateY: '45deg'}, ]
  }
});
