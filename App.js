import React, { Component } from "react";
import { View, StatusBar } from 'react-native';

//Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
//Redux folders
import reducers from "./redux/reducers";
import middleware from "./redux/middleware";
//Constants
import { Constants } from 'expo'

//Colors
import { gradient1 } from './utils/colors';
import { setLocalNotification } from "./utils/Notification";
import MainNavigator from "./routes/Index";

//Store
const store = createStore(reducers, middleware)

function AppStatusBar () {
  return (
    <View style={{backgroundColor: gradient1 ,height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={gradient1} />
    </View>
  )
}

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
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
