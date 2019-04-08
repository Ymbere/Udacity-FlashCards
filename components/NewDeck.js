//Components
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from 'react-native-elements'
//Redux stuff
import { connect } from "react-redux";
//Methods
import { handleAddDeck } from "../redux/actions/DeckActions";
import { addDeckToStorage } from "../utils/API";

class NewDeck extends Component {
    state = {
        title: "",
        cards: [],
        id: 0,
        redirect: false
    }

    handleSubmit = () => {

        const { dispatch, navigation } = this.props
        const { title, cards } = this.state
        const id = Date.now()

        this.setState({
            id: id
        })

        dispatch(handleAddDeck({
            title,
            id,
            cards
        }))

        const deckSample = { title, id, cards}

        this.setState({
            title: ""
        })

        addDeckToStorage(deckSample)
            .then(() => navigation.navigate(
                'DeckMainPage',
                { deckID: id }
            ))

    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Digite um nome para o deck</Text>
                <Input
                    style={styles.inputDeckName}
                    value={this.state.title}
                    onChangeText={(title) => this.setState({title})}
                />
                <Button
                    buttonStyle={styles.createDeckButton}
                    titleStyle={styles.createDeckButtonTitle}
                    title="Create Deck"
                    onPress={this.handleSubmit}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor : '#1abc9c'
    },
    title : {
        textAlign : 'center',
        fontSize : 60
    },
    inputDeckName : {
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    createDeckButton : {
        flexDirection : 'column',
        backgroundColor : 'transparent',
        borderWidth : 2,
        borderColor : '#34495E',
        borderRadius : 50
    },
    createDeckButtonTitle : {
        color : '#34495E'
    }
})

export default connect()(NewDeck)
