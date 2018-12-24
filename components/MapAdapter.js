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
        .concat(this._getVisbleGameObjects());

    mapElements = mapElements
        .sort((a, b) => a.drawOrder - b.drawOrder);
    
    mapElements = mapElements
        .map(m => this._setMapElementImageProperties(m));

    //   for (var baseElement of baseElements) {
    //     var gameObjectsInTheSameSpace = gameObjects.filter(go => go.position.x == baseElement.position.x && go.position.y == baseElement.position.y);

    //     if (gameObjectsInTheSameSpace.length) {
    //         for (var gameObject of gameObjectsInTheSameSpace) {
    //             this._setMapElementImageProperties(gameObject);
    //             mapElements.push(gameObject);
    //         }
    //     } else {
    //         this._setMapElementImageProperties(baseElement);
    //         mapElements.push(baseElement);
    //     }
    //   }

    //   for (var gameObject in gameObjects) {
    //     this._setMapElementImageProperties(gameObject);
    //     mapElements.push(gameObject);
    //   }

      return mapElements;
  }

  _getVisbleGameObjects() {
      var visibleGameObjects = [];

      for (var gameObject of this._map.gameObjects) {
          if (gameObject.position.room == this._map.currentRoom.name) {
              visibleGameObjects.push(gameObject);
          }
      }

      return visibleGameObjects;
  }

  _onMapElementPress(tappedElementId) {
      if (!tappedElementId) {
          return;
      }

      this._map.trigger("tap", tappedElementId);
      this.forceUpdate();
  }

  render() {
    if (!this._map) {
        return (<View />)
    }
        
    var floorElements = this._getFloorElements();
    var mapElements = this._getMapElements();

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
