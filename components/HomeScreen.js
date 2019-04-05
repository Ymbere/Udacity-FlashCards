import React, { Component } from 'react'
import { View } from 'react-native'
//Components
import DeckList from './DeckList';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

class HomeScreen extends Component {
    render() {
        return (
            <View>
                <DeckList navigation={this.props.navigation} />
                <Button
                    title="Iserir novo deck"
                    onPress={() => {
                        this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'NewDeck' }))
                    }}
                />
            </View>
        )
    }
}

export default HomeScreen
