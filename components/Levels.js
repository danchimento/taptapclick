import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableWithoutFeedback } from 'react-native';

export default class Levels extends React.Component {

  constructor() {
    super();

  }

  render() {
    return (
      <View style={styles.levelSelect}>
            <View style={styles.header}> 
                <Text style={styles.title}>Select a Level</Text>
            </View>
            <ScrollView style={styles.levels}>

                {this.props.levels.map((level) => {
                    return (
                        <View style={styles.level} key={level.name}>
                            <TouchableWithoutFeedback 
                                onPress={() => this.props.onLevelSelect(level.name)}>
                                <Text style={styles.levelName}>{level.name}</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        )
                })}

            </ScrollView>
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
    levelSelect: {
        height: "100%",
        width: "100%",
        backgroundColor: "#638937",
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
        fontFamily: "AbrilFatface-Regular",
        color: "#ffffff",
        textAlign: "center",
    },
    title: {
        fontSize: 50,
        fontFamily: "AbrilFatface-Regular",
        color: "#ffffff",
        textAlign: "center"
    },
    levels: {
    },
    level: {
        margin: 20
    }, 
    levelName: {
        fontSize: 30,
        fontFamily: "AbrilFatface-Regular",
        color: "#ffffff",
        textAlign: "center",
    }
});
