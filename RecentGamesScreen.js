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
  AlertIOS
} from 'react-native';


var API_URL = 'https://www.haloapi.com/stats/h5/players/';

var API_ARGS = { method: 'GET',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Ocp-Apim-Subscription-Key': 'd0bd8c751592467cbaea09e72f64dc19',
                 }
               };


var GameCell = require('./GameCell')
var resultsCache = {startCount: 0, recentGames: []};

class RecentGamesScreen extends Component {
    constructor(props, context) {
        super(props, context);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.Id.MatchId !== r2.Id.MatchId});
        this.state = {
            refreshing: false,
            isLoading: false,
            dataSource: ds.cloneWithRows([]),
            gamerTag: this.props.gamerTag,
            startCount: 0
        };
    }
    
    componentDidMount() {
        // AlertIOS.prompt(
        //     'Enter your Gamer Tag',
        //     'JakeWilson801',
        //     text => {
        //         this.setState({gamerTag: text});
        //         this.loadGames();
        //     });
        this.loadGames();
    }
    
    loadGames() {
        this.setState({isLoading: true, refreshing: true})
        fetch(`${API_URL}/${this.state.gamerTag}/matches?start=${this.state.startCount}`, API_ARGS)
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
                for(var i in responseData.Results) {
                    if(!this.alreadyInList(responseData.Results[i]))
                        resultsCache.recentGames.push(responseData.Results[i]);
                }
                this.setState({isLoading: false, refreshing: false, dataSource: this.getDataSource(resultsCache.recentGames)})
            } else {
                this.setState({isLoading: false, refreshing: false, dataSource: this.getDataSource([])})
            }
        });
    }

    alreadyInList(game) {
            for(var x = 0; x < resultsCache.recentGames.length; x++) {
                if(game.Id.MatchId === resultsCache.recentGames[x].Id.MatchId) {
                    return true;
                }
            }
        return false; 
    }
        
    getDataSource(games: Array<any>): ListView.DataSource {
        return this.state.dataSource.cloneWithRows(games);
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

    onEndReached(){
        resultsCache.startCount = resultsCache.startCount + 25;
        this.setState({startCount: resultsCache.startCount});
        this.loadGames();
    }

    renderFooter() {
        return <ActivityIndicator style={styles.scrollSpinner} />;
    }

    refreshList(){
        resultsCache.recentGames = [];
        this.setState({startCount: 0, dataSource: this.getDataSource([])});
        this.loadGames();
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
              prenderFooter={this.renderFooter}
              onEndReached={this.onEndReached.bind(this)}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps={true}
              showsVerticalScrollIndicator={false}
              refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.refreshList.bind(this)} 
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
    },
    scrollSpinner: {
        marginVertical: 20,
    },
});


module.exports = RecentGamesScreen        

    
    
    
