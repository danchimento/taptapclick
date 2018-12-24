import React from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default class Inventory extends React.Component {
    render() {
        return (<View>
                    <View style={styles.itemList}>
                    {this.props.inventory.items.map(item => {
                        return (
                            <View key={item.name} style={styles.inventoryItem}>
                                <Image
                                    style={styles.gridImage}
                                    source={item.image.url} />
                            </View>)
                    })}
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    itemList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 75,
        backgroundColor: "#fff",
        alignSelf: "stretch",
    },
    inventoryItem: {
        height: 50,
        width: 50,
        padding: 5,
    },
    gridImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        transform: [{ rotate: "45deg"}],
    }
});
