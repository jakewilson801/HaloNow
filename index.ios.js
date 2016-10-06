import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  StatusBar,
  Text,
  AlertIOS,
  View
} from 'react-native';

var RecentGamesScreen = require('./RecentGamesScreen');

class HaloNow  extends React.Component {
    constructor() {
        super();
        this.state = { gamerTag: '' };
    }
    
    render() {
         return (
            <View style={styles.container}>
              <StatusBar
               barStyle={"light-content"}
               backgroundColor={"rgb(255,45,61)"}/>
             <NavigatorIOS
               backgroundColor={"rgb(255,45,61)"}
               barStyle={"light-content"}
               barTintColor={'rgb(255,45,61)'}
               translucent={true}
               style={styles.container}
               titleTextColor={'white'}
               initialRoute={{
                title: 'Recent Games',
                component: RecentGamesScreen,
                statusBarHidden: true,
                passProps: {gamerTag: 'JakeWilson801'}
              }}/>
            </View>
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
