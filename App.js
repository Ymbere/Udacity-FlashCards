import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
//Redux folders
import reducers from "./redux/reducers";
import middleware from "./redux/middleware";

import DeckList from './components/DeckList';

//Store
const store = createStore(reducers, middleware)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <DeckList />
        </View>
      </Provider>
    );
  }
}
