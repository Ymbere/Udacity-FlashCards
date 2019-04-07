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
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate(
                        'DeckMainPage',
                        { deckID: id }
                    )}
                >
                    <Text style={styles.deckTitle}>{title}</Text>
                </TouchableOpacity>
                <Text>{cards.length}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems: 'center'
    },
    deckTitle : {
        fontSize: 20
    }
})

const mapStateToProps = ({ decks }, { id }) => {
    const deck = decks.find(c => c.id === id)
    return {
        deck
    }
}

export default connect(mapStateToProps)(DeckCard)
