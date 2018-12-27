import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

export default class LevelComplete extends React.Component {

  constructor() {
    super();

  }

  render() {
    return (
      <View style={styles.levelSelect}>
            <View style={styles.header}> 
                <Text style={styles.title}>Nice.</Text>
            </View>
            <View style={styles.content}>
                <TouchableWithoutFeedback onPress={this.props.onNext}>
                    <Text style={styles.continueButton}>Continue</Text>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.menuButtonContainer}>
                <TouchableWithoutFeedback onPress={this.props.onMenu}>
                    <Text style={styles.menuButton}>Menu</Text>
                </TouchableWithoutFeedback>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    levelComplete: {
        height: "100%",
        width: "100%",
        backgroundColor: "#B0733B",
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
    menuButtonContainer: {
        margin: 30
    },
    menuButton: {
        fontSize: 20,
        fontFamily: "Abril Fatface",
        color: "#ffffff",
        textAlign: "center",
    },
    title: {
        fontSize: 50,
        fontFamily: "Abril Fatface",
        color: "#ffffff",
        textAlign: "center"
    },
    content: {
        flex: 1
    },
    continueButton: {
        fontSize: 30,
        fontFamily: "Abril Fatface",
        color: "#ffffff",
        textAlign: "center",
        textDecorationLine: "underline"
    }
});
