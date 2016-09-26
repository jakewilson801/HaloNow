import React, { Component} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from 'react-native';

var maps = require("./maps.json");

class GameCell extends Component {
    render() {
        var TouchableElement = TouchableHighlight;
        if(Platform.OS == 'android'){
            TouchableElement = TouchableNativeFeedback;
        }
        return (
            <View>
             <TouchableElement
               onShowUnderlay={this.props.onHighlight}
               onHideUnderlay={this.props.onUnhighlight}
               onPress={this.props.onSelect}>
               <View style={styles.row}>
                <Image
                 source={{uri: this.getMapImage(this.props.game.MapId)}}
                 style={styles.mapImage}
                  />
                <View style={styles.textContainer}>
                <Text style={styles.mapTitle} numberOfLines={1}>
                 {this.getGameResult(this.props.game.Players[0].Result)}                
                </Text>
               </View>
              </View>
            </TouchableElement>
           </View>
        )
    }
    
    getGameResult(i) {
        switch(i) {
        case 0:
            return "Did Not Finish";
        case 1:
            return "Lost";
        case 2:
            return "Tied";
        case 3:
            return "Won";
        default:
            return "Did Not Finish";
        }
    }

    getMapImage(id) {
        for(var x = 0; x < maps.length; x++) {
            if(id === maps[x].id) {
                return maps[x].imageUrl;
            } 
        }
    }
}


var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  mapTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  mapImage: {
    backgroundColor: '#dddddd',
    height: 93,
    marginRight: 10,
    width: 93,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginLeft: 4,
  },
});


module.exports = GameCell
