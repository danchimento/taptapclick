import React from 'react';
import { Alert, StyleSheet, Text, View, PanResponder, Animated } from 'react-native';
import Inventory from './Inventory';
import Message from './Message';
import Menu from './Menu';
import GameBoard from './GameBoard';

export default class GameAdapter extends React.Component {

  constructor(props) {
    super();
    this._map = props.map;

    this._mapSize = 285;
    this._gridSquaresPerRow = 7;
    this._gridSquareSize = this._mapSize / this._gridSquaresPerRow;
    this._gridSquares = [];
    this._dropzones = [];
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

  _addItemToDropzone(event) {
      this._dropzones.push(event.nativeEvent.layout)
  }

  _onItemSelected(item) {
      this._map.inventory.selectItem(item);
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
      <View style={styles.map}>

        <GameBoard 
            style={styles.gameBoard} 
            size={this._mapSize} 
            floorElements={floorElements} 
            mapElements={mapElements} 
            items={items} 
            onMapElementPress = {(element) => this._onMapElementPress(element) }
            onItemPress = {(item) => {this._onItemPress(item)}}
            addItemToDropZone={(event) => this._addItemToDropzone(event)} 
            />

        <Message style={styles.messageBoxContainer} message={this._map.message} />

        <Inventory 
            onItemDropped={(item, target) => this._map.dropItem(item, target)} 
            dropzones={this._dropzones} 
            onItemSelected={(item) => this._onItemSelected(item)}
            style={styles.inventoryContainer} inventory={this._map.inventory} />

        <Menu style={styles.menuContainer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
    },

    gameBoard: {
        flex: 1
    },

    messageBoxContainer: {
        flex: 1,
        alignItems: "center"
    },

    inventoryContainer: {
        flex: 2
    },

    menuContainer: {
        flex: 1,
        alignItems: "baseline"
    }
});
