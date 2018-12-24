import React from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default class GameAdapter extends React.Component {
    render() {
        return (<View
            style={[
                styles.mapElement, 
                {width: this.props.mapElement.imageWidth},
                {height: this.props.mapElement.imageLength},
                {right: this.props.mapElement.imageRight}, 
                {bottom: this.props.mapElement.imageBottom}]}  
                key={this.props.mapElement.id} >
                <TouchableWithoutFeedback 
                    onPress={this.props.onPress} 
                    style={[{width: this.props.mapElement.imageWidth},{height: this.props.mapElement.imageLength}]}>
                    
                    <Image
                        style={styles.gridImage}
                        source={this.props.mapElement.image.url} />
                </TouchableWithoutFeedback>
            </View>)
    }
}

const styles = StyleSheet.create({
    mapElement: {
        position: "absolute"
    },
    gridImage: {
        height: "100%",
        width: "100%"
    }
});
