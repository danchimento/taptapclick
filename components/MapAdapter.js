import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ImageLibrary from '../game/code/ImageLibrary';
import GridSquare from '../game/code/MapElement';

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
  }

  _getMapElements() {
      var mapElements = [];  
      var baseElements =  this._map.currentRoom.mapElements;
      var gameObjects = this._getVisbleGameObjects();
      
      for (var baseElement of baseElements) {
        var gameObjectsInTheSameSpace = gameObjects.filter(go => go.position.x == baseElement.position.x && go.position.y == baseElement.position.y);

        if (gameObjectsInTheSameSpace.length) {
            for (var gameObject of gameObjectsInTheSameSpace) {
                this._setMapElementImageProperties(gameObject);
                mapElements.push(gameObject);
            }
        } else {
            this._setMapElementImageProperties(baseElement);
            mapElements.push(baseElement);
        }
      }

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

  render() {
    if (!this._map) {
        return (<View />)
    }
        
    var mapElements = this._getMapElements();

    return (
      <View>
        <View style={[styles.mapContainer, {width: this._mapSize, height: this._mapSize}]}>
            {mapElements.map(mapElement => {
                return (
                    <View
                    style={[
                        styles.mapElement, 
                        {width: mapElement.imageWidth},
                        {height: mapElement.imageHeight},
                        {right: mapElement.imageRight}, 
                        {bottom: mapElement.imageBottom}]}  key={mapElement.id} >
                            <Image
                                style={styles.gridImage}
                                source={mapElement.image.url} />
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
