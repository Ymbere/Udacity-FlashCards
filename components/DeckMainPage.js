import React, { Component } from 'react'
//Redux Stuff
import { connect } from "react-redux";
//Components
import { View, Text } from 'react-native'
import { Button } from "react-native-elements";
import { AppLoading } from 'expo'
//Methods
import { retriveDecks } from '../utils/API';
import { receive_deck } from '../redux/actions/DeckActions';

class DeckMainPage extends Component {
    state = {
        ready: false
    }

    componentDidMount() {
        const { dispatch } = this.props
        retriveDecks()
            .then((decks) => dispatch(receive_deck(decks)))
            .then(() => this.setState(() => ({
                ready: true
            })))
    }

    render() {
        const { ready } = this.state
        const { title, cardNumber, id } = this.props

        if (ready === false) {
            <AppLoading/>
        }

        return (
            <View>
                <Text>{title}</Text>
                <Text>{cardNumber}</Text>
                <Button
                    title="Add Card"
                />
                <Button
                    title="Quiz"
                />
            </View>
        )
    }
}

const mapStateToProps = ({ decks }, ownProps) => {
    const deckID = ownProps.navigation.getParam('deckID', '1')
    const deck = decks.find(deck => deck.id === deckID)

    return {
        title: deck.title,
        cardNumber: deck.cards.length,
        id: deck.id
    }

}

export default connect(mapStateToProps)(DeckMainPage)
