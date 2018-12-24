import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InventoryItem from './InventoryItem';

export default class Menu extends React.Component {
    render() {
        return (
            <View>
                <Text style={styles.title}>Menu</Text>
            </View>)
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 20,
        color: "#EDECE1",
        fontFamily: "AbrilFatface"
    }
});
