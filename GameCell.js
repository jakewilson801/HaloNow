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
var playlists = require("./playlists.json")

class GameCell extends Component {
    render() {
        var TouchableElement = TouchableHighlight;
        if(Platform.OS == 'android'){
            TouchableElement = TouchableNativeFeedback;
        }
        return (
         <TouchableElement
               background={TouchableNativeFeedback.Ripple("red", false)}
               onShowUnderlay={this.props.onHighlight}
               onHideUnderlay={this.props.onUnhighlight}
               underlayColor={'white'}
               onPress={this.props.onSelect} 
               > 
               <View style={styles.row}>
                <Image
                  source={{uri: this.getMapImage(this.props.game.MapId)}}
                  style={styles.mapImage} />
                <View style={styles.textContainer}>
                <Text style={styles.mapTitle} numberOfLines={1}>
                 {this.getTitle(this.props.game)}
                </Text>
                <Text style={{color: 'white', fontSize: 12}}>
                  {this.getKDLabel(this.props.game)}
                </Text>
               </View>
              </View>
            </TouchableElement>
        )
    }

    getTitle(game){
        return `${this.getPlayListTitle(game)} ${this.getScore(game)} ${this.getGameResult(this.props.game.Players[0].Result)}`
    }
    
    getKDLabel(game){
        var isPositive = false;
        var kd = game.Players[0].TotalKills - game.Players[0].TotalDeaths;
        if(kd > 0){
            kd = `+${kd}`
        }
        return `K/D ${kd} A ${game.Players[0].TotalAssists}`;
    }
    
    getPlayListTitle(game){
        for(var x = 0; x < playlists.length; x++) {
            if(playlists[x].id === game.HopperId){
                return playlists[x].name;
            }
        }
    }

    getScore(game){
        return `${game.Teams[0].Score}-${game.Teams[1].Score}`
    }
    
    getGameResult(i){
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

    getMapImage(id){
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
    flexDirection: 'column'
  },
  mapTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 2,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'rgb(0, 0, 0)',
    flexDirection: 'row',
    padding: 5,
  },
  mapImage: {
    height: 93,
    marginRight: 10,
    width: 93,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.001)',
    height: StyleSheet.hairlineWidth,
    marginLeft: 4,
  },
});


module.exports = GameCell
