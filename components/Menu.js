import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import InventoryItem from './InventoryItem';

export default class Menu extends React.Component {
    render() {
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this.props.onMenu()}>
                    <Text style={styles.title}>Menu</Text>
                </TouchableWithoutFeedback>
            </View>)
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 20,
        color: "#EDECE1",
        fontFamily: "Abril Fatface"
    }
});
