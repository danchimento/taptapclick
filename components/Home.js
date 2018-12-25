import React from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback } from 'react-native';

export default class Home extends React.Component {

  constructor() {
    super();

  }

  render() {
    return (
      <View style={styles.home}>
            <View style={styles.header}> 
                <Text style={styles.title}>Locked</Text>
                <Text style={styles.subtitle}>A puzzle game</Text>
            </View>
            <View style={styles.controls}>
                <TouchableWithoutFeedback onPress={this.props.onStartGame}>
                    <Text style={styles.startButton}>Start</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.props.onLevelSelectMenu}>
                    <Text style={styles.startButton}>Levels</Text>
                </TouchableWithoutFeedback>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    home: {
        height: "100%",
        width: "100%",
        backgroundColor: "#4A4D67",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    header: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    title: {
        fontSize: 75,
        fontFamily: "AbrilFatface",
        color: "#ffffff",
        textAlign: "center"
    },
    subtitle: {
        fontSize: 20,
        fontFamily: "AbrilFatface",
        color: "#ffffff",
        textAlign: "center"
    },
    startButton: {
        fontSize: 50,
        fontFamily: "AbrilFatface",
        color: "#ffffff",
        textDecorationLine: "underline"
    },
    controls: {
        flex: 1,
        alignItems: "center"
    }
});
