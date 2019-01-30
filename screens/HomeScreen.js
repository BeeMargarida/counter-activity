import React from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import CounterItem from '../components/CounterItem';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      counters: []
    };

    this.addNewCounter = this.addNewCounter.bind(this);
    this.deleteCounter = this.deleteCounter.bind(this);
    this.setCurrentTime = this.setCurrentTime.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  addNewCounter() {

  }

  deleteCounter(counterId) {

  }

  setCurrentTime(counterId) {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tabBarInfoContainer}>
          <Button onPress={this.addNewCounter} title="New Counter"/>
        </View>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <CounterItem counterId={0} title="Counter 1" deleteCounter={this.deleteCounter} setCurrentTime={this.setCurrentTime}/>
        </ScrollView>

        
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
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
    backgroundColor: '#fbfbfb',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
