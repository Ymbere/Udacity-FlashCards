import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
//Redux stuff
import { connect } from 'react-redux'
import { NavigationActions } from "react-navigation";

class DeckCard extends Component {
    render() {
        const { deck } = this.props
        const { title, cards, id } = deck
        return (
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate(
                    'DeckMainPage',
                    { deckID: id }
                )}
            >
                <Text style={styles.deckTitle}>{title}</Text>
                <Text style={styles.cardsNumber}>{cards.length}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    deckTitle : {
        fontSize: 20,
        color : '#fff'
    },
    buttonContainer: {
        alignItems: 'center',
        flex: 1,
        borderColor: 'black',
        justifyContent: 'center',
        backgroundColor: '#34495E',
        borderBottomColor: '#2C3E50',
        borderBottomWidth: 1,
    },
    cardsNumber : {
        color: '#bdc3c7'
    }
})

const mapStateToProps = ({ decks }, { id }) => {
    const deck = decks.find(c => c.id === id)
    return {
        deck
    }
}

export default connect(mapStateToProps)(DeckCard)
