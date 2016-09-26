import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View
} from 'react-native';

var RecentGamesScreen = require('./RecentGamesScreen');

class HaloNow  extends React.Component {
    render() {
        return (
            <NavigatorIOS
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
        backgroundColor: 'white',
    },
});

AppRegistry.registerComponent('HaloNow', () => HaloNow);
