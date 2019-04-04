import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
//Redux stuff
import { connect } from 'react-redux'

class DeckCard extends Component {
    render() {
        const { deck } = this.props
        const { title, cards, id } = deck
        return (
            <View>
                <TouchableOpacity>
                    <Text>{title}</Text>
                </TouchableOpacity>
                <Text>{cards.length}</Text>
            </View>
        )
    }
}

const mapStateToProps = ({ decks }, { id }) => {
    const deck = decks.find(c => c.id === id)
    return {
        deck
    }
}

export default connect(mapStateToProps)(DeckCard)
