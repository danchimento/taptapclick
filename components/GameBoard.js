import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapSquare from './MapSquare'

export default class GameBoard extends React.Component {
    render() {
        return (

            <View style={[styles.mapContainer, {width: this.props.size, height: this.props.size}]}>
                {this.props.floorElements.map(floorElement => {
                    return (<MapSquare key={floorElement.id} mapElement={floorElement}/>)
                })}

                {this.props.mapElements.map(mapElement => {
                    return (<MapSquare 
                        key={mapElement.id} 
                        onPress={() => this.props.onMapElementPress(mapElement.name)} 
                        mapElement={mapElement} 
                        onLayout={(event) => {
                            this.props.addItemToDropzone(event)
                        }}
                        />)
                })}

                {this.props.items.map(item => {
                    return (<MapSquare 
                        style={styles.item}
                        key={item.id} 
                        onPress={() => this.props.onItemPress(item.name)} 
                        mapElement={item} />)
                })}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        position: "relative",
       transform: [{ rotate: "45deg"}],
    },
    
});
