import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Font } from 'expo';

export default class Message extends React.Component {

    constructor() {
        super();

        this.state = { fontLoaded: false }
    }

    async componentDidMount() {
        await Font.loadAsync({
          'AbrilFatface': require('../assets/fonts/AbrilFatface-Regular.ttf'),
        });

        this.setState({ fontLoaded: true });
      }

    render() {
        if (!this.state.fontLoaded) {
            return (<View></View>)
        }
        return (<View style={styles.message}>
                <Text style={styles.messageText}>{this.props.message}</Text>                
            </View>)
    }
}

const styles = StyleSheet.create({
    message: {
        padding: 10,
    },
    
    messageText: {
        textAlign: "center",
        fontSize: 25,
        color: "#FFF",
       fontFamily: "AbrilFatface"
    }
});
