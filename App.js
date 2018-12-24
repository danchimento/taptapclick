import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import GameAdapter from './components/GameAdapter';
import { Font } from 'expo';

export default class App extends React.Component {

  constructor() {
    super();

    this.state = { fontLoaded: false }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'AbrilFatface': require('./assets/fonts/AbrilFatface-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {

    if (!this.state.fontLoaded) {
      return (<View></View>)
  }

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
    backgroundColor: '#313638',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipped: {
    transform: [{ rotateY: '45deg'}, ]
  }
});
