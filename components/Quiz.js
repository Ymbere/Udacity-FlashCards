import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
//Redux
import { connect } from "react-redux";

//Components
import { Button } from "react-native-elements";
import { AppLoading } from "expo";
import { retriveDecks } from '../utils/API';
import { receive_deck } from '../redux/actions/DeckActions';

class Quiz extends Component {
    state = {
        arrayPosition: 0,
        showAnswer: 0,
        correctAnswers: 0,
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

    handleClickYes = () => {
        this.setState((prevState) => ({
            arrayPosition: prevState.arrayPosition + 1,
            correctAnswers: prevState.correctAnswers + 1,
            showAnswer: 0
        }))
    }

    handleClickNo = () => {
        this.setState((prevState) => ({
            arrayPosition: prevState.arrayPosition + 1,
            showAnswer: 0
        }))
    }

    renderCard=() => {
        const { cards, cardsNumber } = this.props
        const { arrayPosition, showAnswer } = this.state

        return (
            <View style={{flex: 1}}>
                <Text>{arrayPosition + 1}/{cardsNumber}</Text>

                <Text>{ cards[arrayPosition].question }</Text>

                {showAnswer === 0 &&
                    <TouchableOpacity
                        onPress={() => this.setState(() => ({
                            showAnswer: 1
                        }))}
                    >
                        <Text>Show answer</Text>
                    </TouchableOpacity>
                }

                {showAnswer === 1 &&
                    <View style={{flex: 1}}>
                        <Text>{ cards[arrayPosition].answer }</Text>
                        <Button
                            onPress={() => this.handleClickYes()}
                        >
                            title="Yes"
                        </Button>
                        <Button
                            onPress={() => this.handleClickNo()}
                        >
                            title="No"
                        </Button>
                    </View>
                }

            </View>
        )
    }

    render() {

        const { cardsNumber, navigation, deckID } = this.props
        const { arrayPosition, ready } = this.state

        if (ready === false) {
            return <AppLoading />
        }

        return(
            <View style={{flex: 1}}>
                {arrayPosition !== cardsNumber &&
                    this.renderCard()
                }
                {arrayPosition === cardsNumber &&
                    <View style={{flex: 1}}>
                        <Text>You result is {this.state.correctAnswers} of {cardsNumber}</Text>
                        <Button
                            onPress={() => this.setState({
                                arrayPosition: 0,
                                correctAnswers: 0,
                            })}
                        >
                            Restart Quiz
                        </Button>
                        <Button
                            onPress={() => navigation.navigate(
                                'DeckMainPage',
                                { deckID }
                            )}
                        >
                            Back To Deck
                        </Button>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

const mapStateToProps = ({ decks }, ownProps) => {
    const deckID = ownProps.navigation.getParam('deckID', '1')
    const deck = decks.find(deck => deck.id === deckID)

    return {
        cards: deck.cards,
        cardsNumber: deck.cards.length,
        deckID
    }
}

export default connect(mapStateToProps)(Quiz)
