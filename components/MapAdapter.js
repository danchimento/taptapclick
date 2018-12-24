import React from 'react';
import { Alert, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import MapElement from '../game/code/MapElement';

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
      mapElement.imageHeight = this._unitsToPixels(mapElement.image.length) + imageHeightY;
      mapElement.imageRight = this._mapSize - ((mapElement.position.x) * this._gridSquareSize);
      mapElement.imageBottom = this._mapSize - ((mapElement.position.y) * this._gridSquareSize);

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

  _onMapElementPress(tappedElementId) {
      if (!tappedElementId) {
          return;
      }

      this._map.trigger("tap", tappedElementId);
      this.forceUpdate();
  }

  _onItemPress(tappedItemId) {
    if (!tappedItemId) {
        return;
    }

    this._map.pickUpItem(tappedItemId);
    this.forceUpdate();
}

  render() {
    if (!this._map) {
        return (<View />)
    }
        
    var floorElements = this._getFloorElements();
    var mapElements = this._getMapElements();
    var items = []//this._map.getVisibleItems();

    return (
      <View>
            <View style={[styles.mapContainer, {width: this._mapSize, height: this._mapSize}]}>

            {floorElements.map(floorElement => {
                return (
                    <View
                    style={[
                        styles.mapElement, 
                        {width: floorElement.imageWidth},
                        {height: floorElement.imageHeight},
                        {right: floorElement.imageRight}, 
                        {bottom: floorElement.imageBottom}]}  key={floorElement.id} >
                            <TouchableWithoutFeedback 
                                style={[{width: floorElement.imageWidth},{height: floorElement.imageHeight}]}>
                                <Image
                                    style={styles.gridImage}
                                    source={floorElement.image.url} />
                            </TouchableWithoutFeedback>
                    </View>
                )
            })}

            {mapElements.map(mapElement => {
                return (
                    <View
                    style={[
                        styles.mapElement, 
                        {width: mapElement.imageWidth},
                        {height: mapElement.imageHeight},
                        {right: mapElement.imageRight}, 
                        {bottom: mapElement.imageBottom}]}  key={mapElement.id} >
                            <TouchableWithoutFeedback 
                                onPress={() => this._onMapElementPress(mapElement.name)} style={[
                                {width: mapElement.imageWidth},{height: mapElement.imageHeight}]}>
                                <Image
                                    style={styles.gridImage}
                                    source={mapElement.image.url} />
                            </TouchableWithoutFeedback>
                    </View>
                )
            })}

            {items.map(item => {
                return (
                    <View
                    style={[
                        styles.mapElement, 
                        {width: item.imageWidth},
                        {height: item.imageHeight},
                        {right: item.imageRight}, 
                        {bottom: item.imageBottom}]}  key={item.name} >
                            <TouchableWithoutFeedback 
                                onPress={() => this._onItemPress(item.name)} style={[
                                {width: item.imageWidth},{height: item.imageHeight}]}>
                                <Image
                                    style={styles.gridImage}
                                    source={item.image.url} />
                            </TouchableWithoutFeedback>
                    </View>
                )
            })}
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mapContainer: {
        position: "relative",
       transform: [{ rotate: "45deg"}, {translateX: 5}],
    },
    mapElement: {
        position: "absolute"
    },
    gridImage: {
        height: "100%",
        width: "100%"
    }
});
