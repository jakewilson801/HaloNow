import React, { Component } from 'react';

import {
  ActivityIndicatorIOS,
  ListView,
  Platform,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
} from 'react-native';


var API_URL = 'https://www.haloapi.com/stats/h5/players/JakeWilson801/matches';

var API_ARGS = { method: 'GET',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Ocp-Apim-Subscription-Key': 'd0bd8c751592467cbaea09e72f64dc19',
                 }
               };


var GameCell = require('./GameCell')

class RecentGamesScreen extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            refreshing: false,
            isLoading: false,
            dataSource: ds.cloneWithRows([]),
        };
    }
    
    componentDidMount() {
        this.loadGames();
    }
    
    loadGames() {
        this.setState({isLoading: true, refreshing: true, dataSource: this.getDataSource([])})
        fetch(API_URL, API_ARGS)
          .then((response) => {
              this.setState({refreshing: false})
              var res = response.json()
              return res;
          })
          .catch((error) => {
            this.setState({isLoading: false, refreshing: false, dataSource: this.getDataSource([])})
          })
          .then((responseData) => {
            if(responseData){
                this.setState({isLoading: false, refreshing: false, dataSource: this.getDataSource(responseData.Results)})
            } else {
                this.setState({isLoading: false, refreshing: false, dataSource: this.getDataSource([])})
            }
        });
    }
    
    getDataSource(games: Array<any>): ListView.DataSource {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return ds.cloneWithRows(games);
    }
    
    renderSeparator(
        sectionID: number | string,
        rowID: number | string,
        adjacentRowHighlighted: boolean
    ) {
        var style = styles.rowSeparator;
        if (adjacentRowHighlighted) {
            style = [style, styles.rowSeparatorHide];
        }
        return (
            <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
        );
    }

    renderRow(game: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        return (
            <GameCell
             onHighlight={() => highlightRow(sectionID, rowID)}
             onUnhighlight={() => highlightRow(null, null)}
             key={game.id}
             onSelect={() => console.log(game)}
             game={game}
            />
        );
    }
    
    render() {
        return (
           <View style={styles.container}
              onFocus={() =>
              this.refs.listview && this.refs.listview.getScrollResponder().scrollTo(0, 0, true)}>
            <View style={styles.separator}/>
             <ListView
              ref="listview"
              enableEmptySections={true}
              renderSeparator={this.renderSeparator}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              automaticallyAdjustContentInsets={true}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps={true}
              showsVerticalScrollIndicator={false}
              refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.loadGames.bind(this)} 
                          />
                        }
             />
            </View>
           );
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  centerText: {
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  rowSeparator: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: 1 ,
    marginLeft: 4,
  },
  rowSeparatorHide: {
      opacity: 0.0,
  }
});


module.exports = RecentGamesScreen        

    
    
    
