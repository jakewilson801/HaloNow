import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
  BackAndroid,
  ToolbarAndroid
} from 'react-native';

var RecentGamesScreen = require('./RecentGamesScreen');


var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
   return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={[]}
          onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          titleColor="white"
          title={route.name} />
      <RecentGamesScreen/> 
      </View>
    );
  }


class HaloNow  extends React.Component {
    render() {
        return (
            <Navigator
            style={styles.container}
            initialRoute={{name: "Recent Games"}}
            configureScene={() => Navigator.SceneConfigs.FadeAndroid}
            renderScene={RouteMapper}
            />
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

AppRegistry.registerComponent('HaloNow', () => HaloNow);
