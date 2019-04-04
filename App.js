import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Button } from "react-native-elements";
import { StackNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
//Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
//Redux folders
import reducers from "./redux/reducers";
import middleware from "./redux/middleware";
//Constants
import { Constants } from 'expo'
//Components
import NewDeck from './components/NewDeck';
import HomeScreen from "./components/HomeScreen";
//Colors
import { purple, white } from './utils/colors';

//Store
const store = createStore(reducers, middleware)

function AppStatusBar () {
  return (
    <View style={{backgroundColor: purple ,height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={purple} />
    </View>
  )
}

const MainNavigator = createAppContainer(createStackNavigator({
  home: {
    screen: HomeScreen,
  },
  NewDeck: {
    screen: NewDeck,
  },
}))

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppStatusBar />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
