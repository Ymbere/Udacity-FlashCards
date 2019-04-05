import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, FlatList } from "react-native";

//Redux
import { connect } from "react-redux";
import { handleInitialData } from '../redux/actions/Shared';
//Components
import DeckCard from './DeckCard';
import { AppLoading } from "expo";
import { retriveDecks } from '../utils/API';
import { receive_deck } from '../redux/actions/DeckActions';

class DeckList extends Component {
    state = {
        ready: false
    }
    componentDidMount() {
        const { dispatch } = this.props
        retriveDecks()
            .then((decks) => dispatch(receive_deck(decks)))
            .then(() => this.setState(() => ({
                ready: true,
            })))
    }
    render() {
        const { decks, navigation } = this.props
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading/>
        }

        return(
            <View>
                <FlatList
                    data={decks}
                    renderItem={({ item }) => (
                        <DeckCard
                            id={item.id}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }
}

const mapStateToProps = ({ decks }) => {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)
