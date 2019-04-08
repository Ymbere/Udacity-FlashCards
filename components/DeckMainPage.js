import React, { Component } from 'react'
//Redux Stuff
import { connect } from "react-redux";
//Components
import { View, Text, StyleSheet } from 'react-native'
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
            <View style={styles.container}>

                <View style={styles.deckContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.deckName}>{title}</Text>
                        <Text style={styles.deckCardsNumber}>{cardNumber} Cards</Text>
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonWrapper}>

                        <View style={{flex : 1}}>
                            <Button
                                buttonStyle={styles.startQuizButton}
                                titleStyle={styles.buttonsTitle}
                                onPress={() => {
                                    this.props.navigation.navigate(
                                        'Quiz',
                                        { deckID: id },
                                        { navigation: this.props.navigation }
                                    )
                                }}
                                title="Start a Quiz"
                            />
                        </View>
                        <View style={{flex : 1}}>
                            <Button
                                buttonStyle={styles.createNewQuestionButton}
                                titleStyle={styles.buttonsTitle}
                                onPress={() => {
                                    this.props.navigation.navigate(
                                        'NewCard',
                                        { parentID: id }
                                    )
                                }}
                                title="Create New Question"
                            />
                        </View>

                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#1abc9c'
    },
    deckContainer : {
        flex: 1,
        alignItems : 'center',
    },
    textContainer : {
        flex : 1,
        flexDirection: 'column',
        justifyContent : 'flex-end'
    },
    buttonsContainer : {
        flex : 1,
        flexDirection : 'row',
    },
    buttonWrapper : {
        flex : 1,
        alignSelf : 'flex-end',
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle : {
        textAlign : 'center'
    },
    startQuizButton : {
        borderWidth : 2,
        borderRadius : 5,
        borderColor : '#34495E',
        backgroundColor : '#34495E'
    },
    createNewQuestionButton : {
        borderWidth : 2,
        borderRadius : 5,
        borderColor : '#34495E',
        backgroundColor : 'transparent',
    },
    deckName : {
        fontSize : 100,
        color : '#fff'
    },
    deckCardsNumber : {
        fontSize : 50,
        color : '#bdc3c7'
    }
})

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
