import React from 'react';
import { Alert, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import MapSquare from './MapSquare';

export default class GameAdapter extends React.Component {

  constructor(props) {
    super();
    this._map = props.map;

    this._mapSize = 285;
    this._gridSquaresPerRow = 7;
    this._gridSquareSize = this._mapSize / this._gridSquaresPerRow;
    this._gridSquares = [];
  }

  _unitsToPixels(unit) {
      var pixelsPerUnit = this._gridSquareSize / 5;
      return unit * pixelsPerUnit;
  }

  _setMapElementImageProperties(mapElement) {
      let imageHeightX = this._unitsToPixels(mapElement.image.horizontalOverlap)
      let imageHeightY = this._unitsToPixels(mapElement.image.verticalOverlap);

      mapElement.imageWidth = this._unitsToPixels(mapElement.image.width) + imageHeightX;
      mapElement.imageLength = this._unitsToPixels(mapElement.image.length) + imageHeightY;

      let horizontalSizeDifference = this._gridSquareSize - mapElement.imageWidth;
      let verticalSizeDifference = this._gridSquareSize - mapElement.imageLength;

      let horizontalOffset = horizontalSizeDifference > 0 ? horizontalSizeDifference / 2 : 0;
      let verticalOffset = verticalSizeDifference > 0 ? verticalSizeDifference / 2 : 0;

      mapElement.imageRight = this._mapSize - ((mapElement.position.x) * this._gridSquareSize) + horizontalOffset;
      mapElement.imageBottom = this._mapSize - ((mapElement.position.y) * this._gridSquareSize) + verticalOffset;

      return mapElement;
  }

  _getFloorElements() {
      var floorElements = [];
      
      for (var floorElement of this._map.currentRoom.floorElements) {
          this._setMapElementImageProperties(floorElement);
          floorElements.push(floorElement);
      }

      return floorElements;
  }

  _getMapElements() {
      var mapElements = this._map.currentRoom.mapElements;
      mapElements = mapElements
        .concat(this._map.getVisbleGameObjects());

    mapElements = mapElements
        .sort((a, b) => a.drawOrder - b.drawOrder);
    
    mapElements = mapElements
        .concat(this._map.getVisibleItems());

    mapElements = mapElements
        .map(m => this._setMapElementImageProperties(m));

      return mapElements;
  }

  _getItems() {
    var items = this._map.getVisibleItems();

    items = items
        .map(i => this._setMapElementImageProperties(i));

    return items;
  }

  _onMapElementPress(tappedElementId) {
      if (!tappedElementId) {
          return;
      }

      this._map.trigger("tap", tappedElementId);
      this.forceUpdate();
  }

  _onItemPress(tappedItemId) {
      this._map.pickUpItem(tappedItemId);
      this.forceUpdate();
  }

  render() {
    if (!this._map) {
        return (<View />)
    }
        
    var floorElements = this._getFloorElements();
    var mapElements = this._getMapElements();
    var items = this._getItems();

    return (
      <View>
            <View style={[styles.mapContainer, {width: this._mapSize, height: this._mapSize}]}>
                {floorElements.map(floorElement => {
                    return (<MapSquare key={floorElement.id} mapElement={floorElement} />)
                })}

                {mapElements.map(mapElement => {
                    return (<MapSquare 
                        key={mapElement.id} 
                        onPress={() => this._onMapElementPress(mapElement.name)} 
                        mapElement={mapElement} />)
                })}

                {items.map(item => {
                    return (<MapSquare 
                        style={styles.item}
                        key={item.id} 
                        onPress={() => this._onItemPress(item.name)} 
                        mapElement={item} />)
                })}
            </View>

            <Text style={styles.message}>{this._map.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mapContainer: {
        position: "relative",
       transform: [{ rotate: "45deg"}, {translateX: -100}, {translateY: -100}],
    },
    
    item: {
       transform: [{ rotate: "45deg"}],
    },

    message: {
        textAlign: "center",
        padding: 10,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
    }
});
