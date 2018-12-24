import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InventoryItem from './InventoryItem';

export default class Inventory extends React.Component {

    render() {
        return (
            <View style={styles.inventory}>
                <View style={styles.itemList}>
                    {this.props.inventory.items.map(item => {
                        return (
                            <InventoryItem selected={this.props.inventory.selectedItem == item.name} onItemSelected={this.props.onItemSelected} key={item.name} item={item} />
                        )
                    })}
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    inventory: {
        flexDirection: "column",
        height: 100,
        width: "100%"
    },
    itemList: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 100,
        backgroundColor: "#EDECE1",
        alignItems: "center",
        width: "100%"
    },
});
