import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  StatusBar,
  Text,
  View
} from 'react-native';

var RecentGamesScreen = require('./RecentGamesScreen');

class HaloNow  extends React.Component {
    render() {
        return (
            <NavigatorIOS
              backgroundColor={"rgb(230,45,61)"}
              barStyle={"light-content"}
              barTintColor={'rgb(255,45,61)'}
              translucent={true}
              titleTextColor={'white'}
              style={styles.container}
              initialRoute={{
                title: 'Recent Games',
                component: RecentGamesScreen,
              }}
            />
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
         backgroundColor: 'black',
    },
});

AppRegistry.registerComponent('HaloNow', () => HaloNow);
