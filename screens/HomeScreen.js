import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CounterItem from '../components/CounterItem';
import NewTimerForm from '../components/NewTimerForm';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counters: [],
      previousIdCounter: 0,
      showNewTimerForm: false
    };

    this.addNewCounter = this.addNewCounter.bind(this);
    this.deleteCounter = this.deleteCounter.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  addNewCounter(name, totalDuration) {
    this.setState(prevState => ({ counters: [...prevState.counters, {counterId: prevState.previousIdCounter, name: name, totalDuration: totalDuration}], previousIdCounter: prevState.previousIdCounter + 1 }));
  }

  toggleForm() {
    if(!this.state.showNewTimerForm && this.state.counters >= 5) {
      Alert.alert("Maximum Capacity Reached!", "This application only supports 5 timers at once.", [{text: "Ok"}]);
    } 
    this.setState(prevState => ({ showNewTimerForm: !prevState.showNewTimerForm}));
  }

  deleteCounter(counterId) {
    let newCounters = this.state.counters.filter(item => item.counterId !== counterId);
    this.setState({counters: newCounters});
  }


  render() {

    let counters = this.state.counters.map(item =>
      <CounterItem key={item.counterId} {...item} deleteCounter={this.deleteCounter} />
    );
    
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {counters}
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <TouchableOpacity onPress={this.toggleForm} style={styles.tabBarInfoButton}>
            <Icon name="plus" color="black" size={28} />
          </TouchableOpacity>
        </View>
        {this.state.showNewTimerForm ? (<NewTimerForm addNewCounter={this.addNewCounter} cancelForm={this.toggleForm} />) : null}

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
