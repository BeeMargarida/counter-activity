import React from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

import CounterItem from '../components/CounterItem';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counters: [],
      previousIdCounter: 0
    };

    //this._retrieveData();

    this.addNewCounter = this.addNewCounter.bind(this);
    this.deleteCounter = this.deleteCounter.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  //TODO: Make function that saves timers periodically in the LocalStorage

  addNewCounter() {
    this.setState(prevState => ({ counters: [...prevState.counters, {counterId: prevState.previousIdCounter}], previousIdCounter: prevState.previousIdCounter + 1 }));
    //this._storeData();
  }

  deleteCounter(counterId) {
    let newCounters = this.state.counters.filter(item => item.counterId !== counterId);
    this.setState({counters: newCounters});
    //this._storeData();
  }

  _storeData = async () => {
    try {
      await AsyncStorage.multiSet(['@Counters:counters', JSON.stringify(this.state.counters),'@Counters:counterID', this.state.previousIdCounter]);
    } catch (error) {
      //TODO: Show error message

    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.multiGet(['@Counters:counters','@Counters:counterID']);
      if (value !== null) {
        this.setState({counters: JSON.parse(value[0][1]), previousIdCounter: value[1][1]});
        console.log(JSON.parse(value));
      }
    } catch (error) {
      //TODO: Show error message
      
    }
  };


  render() {

    let counters = this.state.counters.map(item =>
      <CounterItem key={item.counterId} counterId={item.counterId} deleteCounter={this.deleteCounter} />
    );
    
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {counters}
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <TouchableOpacity onPress={this.addNewCounter} style={styles.tabBarInfoButton}>
            <Icon name="plus" color="black" size={28} />
          </TouchableOpacity>
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6d7075',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'flex-end',
    //backgroundColor: '#fbfbfb',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  tabBarInfoButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 100,
    marginHorizontal: 2,
    width: 50,
    height: 50,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});
