import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class Message extends React.Component {

    constructor() {
        super();

    }

    

    render() {
        
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
        color: "#EDECE1",
       fontFamily: "Abril Fatface"
    }
});
