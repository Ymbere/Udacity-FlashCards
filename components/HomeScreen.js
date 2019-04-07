import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
//Components
import DeckList from './DeckList';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <DeckList navigation={this.props.navigation} />
                <Button
                    title="Create new Deck"
                    onPress={() => {
                        this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'NewDeck' }, {navigation: this.props.navigation}))
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#1abc9c'
    },
})

export default HomeScreen
