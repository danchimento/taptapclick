import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ImageLibrary from '../game/code/ImageLibrary';
import GridSquare from '../game/code/GridSquare';

export default class GameAdapter extends React.Component {

  constructor(props) {
    super();
    this._map = props.map;

    this._mapSize = 275;
    this._gridSquaresPerRow = 7;
    this._gridSquareSize = this._mapSize / this._gridSquaresPerRow;
    this._gridSquares = [];
  }

  _unitsToPixels(unit) {
      var pixelsPerUnit = this._gridSquareSize / 5;
      return unit * pixelsPerUnit;
  }

  _setGridSquareImageProperties(gridSquare) {
      let imageHeight = this._unitsToPixels(gridSquare.image.height);
      gridSquare.imageWidth = this._unitsToPixels(gridSquare.image.width) + imageHeight;
      gridSquare.imageHeight = this._unitsToPixels(gridSquare.image.length) + imageHeight;
      gridSquare.imageRight = this._mapSize - (gridSquare.x * this._gridSquareSize);
      gridSquare.imageBottom = this._mapSize - (gridSquare.y * this._gridSquareSize);
  }

  _orderGridForDisplay() {
    var orderedElements = [];
    var rows = this._map.currentRoom.layout;

    // First half of the room
    for (var row = 0; row < rows.length; row++) {
        var j = 0;

        for (var i = row; i >= 0; i --) {
            let image = ImageLibrary[rows[i][j]]
            var gridSquare = new GridSquare(j, i, image);
            this._setGridSquareImageProperties(gridSquare);
            orderedElements.push(gridSquare); 

            j++;
        }
    }

    // Second half of the room
    for (var column = 1; column < rows[0].length; column++) {
        var i = rows.length - 1;

        for (var j = column; j < rows[0].length; j++) {
            let image = ImageLibrary[rows[i][j]]
            var gridSquare = new GridSquare(j, i, image);
            this._setGridSquareImageProperties(gridSquare);
            orderedElements.push(gridSquare); 

            i--;
        }
    }

    return orderedElements;
  }

  render() {
    if (!this._map) {
        return (<View />)
    }
        
    var roomMatrix = this._orderGridForDisplay(this._map.currentRoom);

    return (
      <View style={styles.mapContainer}>
          {roomMatrix.map(gridElement => {
              return (
                  <Image 
                    key={gridElement.id} 
                    style={[
                        styles.gridElement, 
                        {width: gridElement.imageWidth},
                        {height: gridElement.imageHeight},
                        {right: gridElement.imageRight}, 
                        {bottom: gridElement.imageBottom}]} 
                    source={gridElement.image.url} />
              )
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mapContainer: {
        width: 400,
        height: 400,
        position: "relative",
        transform: [{ rotate: "-0deg"}]
    },
    gridElement: {
        position: "absolute"
    }
});
