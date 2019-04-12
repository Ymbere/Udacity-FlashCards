import React, { Component } from "react";
import { View, StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer, HeaderBackButton } from 'react-navigation'
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
import DeckMainPage from "./components/DeckMainPage";
import DeckList from "./components/DeckList";
import NewCard from "./components/NewCard";
import Quiz from "./components/Quiz";
//Colors
import { white, gradient1 } from './utils/colors';
import { setLocalNotification } from "./utils/Notification";

//Store
const store = createStore(reducers, middleware)

function AppStatusBar () {
  return (
    <View style={{backgroundColor: gradient1 ,height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={gradient1} />
    </View>
  )
}

const StackNavigatorStyle = {
  headerTintColor : white,
  headerStyle : {
    backgroundColor : '#3B4371'
  }
}

const MainNavigator = createAppContainer(createStackNavigator({
  home: {
    screen: HomeScreen,
    navigationOptions : {
      ... StackNavigatorStyle,
      header : null
    }
  },
  NewDeck: {
    navigationOptions: {
      ...StackNavigatorStyle
    },
    screen: NewDeck,
  },
  DeckMainPage: {
    navigationOptions: ({ navigation }) => ({
      ...StackNavigatorStyle,
      headerLeft:(<HeaderBackButton tintColor={white} onPress={()=>{navigation.navigate('home')}}/>)
    }),
    screen: DeckMainPage,
  },
  DeckList: {
    navigationOptions : {
      ...StackNavigatorStyle
    },
    screen: DeckList,
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      ...StackNavigatorStyle,
      title: 'Create new question'
    }
  },
  Quiz: {
    navigationOptions : {
      ...StackNavigatorStyle,
      title: 'Quiz'
    },
    screen: Quiz,
  },
}))

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
