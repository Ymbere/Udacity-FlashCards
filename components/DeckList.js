import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from "react-native";
import { AppLoading } from "expo";
//Redux
import { connect } from "react-redux";
//Components
import DeckCard from './DeckCard';
//Methods
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
            <View style={styles.container}>
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

const styles = StyleSheet.create({
    container : {
        flex: 1,
    }
})

const mapStateToProps = ({ decks }) => {

    return {
        decks
    }

}

export default connect(mapStateToProps)(DeckList)
