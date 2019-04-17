import React from "react";
import { createStackNavigator, createAppContainer, HeaderBackButton } from 'react-navigation'
//Components
import NewDeck from '../components/NewDeck';
import HomeScreen from "../components/HomeScreen";
import DeckMainPage from "../components/DeckMainPage";
import DeckList from "../components/DeckList";
import NewCard from "../components/NewCard";
import Quiz from "../components/Quiz";
//Colors
import { white } from '../utils/colors';

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

export default MainNavigator;
