import React from 'react';
import { View, Image, StyleSheet, Animated, PanResponder, TouchableWithoutFeedback } from 'react-native';

export default class InventoryItem extends React.Component {

    constructor() {
        super();
    }

    isDropZone(gesture){     //Step 2
        for (var dropzone of this.props.dropzones) {
            if (gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height) {
                this.props.itemDropped(this, dropzone.element)
            }
        }
    }

    render() {
        return (
        <TouchableWithoutFeedback 
            onPress={() => this.props.onItemSelected(this.props.item)}
            key={this.props.item.name} 
            style={styles.inventoryItem}>
            <View style={[styles.inventoryItem, this.props.selected ? styles.selected : null]}>
                <Image
                    style={styles.gridImage}
                    source={this.props.item.image.url} />
            </View>
        </TouchableWithoutFeedback>)
                    
    }
}

const styles = StyleSheet.create({
    inventoryItem: {
        height: 70,
        width: 70,
        padding: 5,
    },
    gridImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        transform: [{ rotate: "45deg"}],
    },
    selected: {
        backgroundColor: "#B04A31",
        borderRadius: 1000
    }
});
