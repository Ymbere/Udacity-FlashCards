import React, { Component } from 'react'
import { Button } from "react-native-elements";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { AppLoading } from "expo";
//Redux
import { connect } from "react-redux";
//Methods
import { retriveDecks } from '../utils/API';
import { receive_deck } from '../redux/actions/DeckActions';
import { clearLocalNotification, setLocalNotification } from '../utils/Notification';
import QuizResult from './QuizResult';

class Quiz extends Component {
    state = {
        arrayPosition: 0,
        showAnswer: 0,
        correctAnswers: 0,
        ready: false,
        quizFinish : false,
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

    quizFinish = (arrayPosition, cardsNumber) => {
        if (arrayPosition === cardsNumber) {
            clearLocalNotification()
                .then(setLocalNotification)
        }
        return arrayPosition === cardsNumber
    }

    renderCard=() => {
        const { cards, cardsNumber } = this.props
        const { arrayPosition, showAnswer } = this.state

        const styles = StyleSheet.create({
            answerContainer : {
                flex : 1,
            },
            buttonsContainer : {
                flex : 1,
                flexDirection : 'row'
            },
            buttonWrapper : {
                flex : 1,
                alignSelf : 'flex-end',
                flexDirection : 'row',
                alignItems : 'center',
                justifyContent: 'center',
            },
            cardAnswerContainer : {
                flex : 1,
                alignItems : 'center'
            },
            textAnswerContainer : {
                flex : 1,
                flexDirection : 'column',
                justifyContent : 'flex-start'
            },
            questionContainer : {
                flex : 1,
                alignItems : 'center'
            },
            textQuestionContainer : {
                flex : 1,
                flexDirection : 'column',
                justifyContent : 'center'
            },
            textQuestion : {
                fontSize : 50,
                color : '#fff',
                textAlign: 'center'
            },
            textAnswer : {
                fontSize : 30,
                color : '#bdc3c7'
            },
            cardCounter : {
                fontSize : 40
            },
            yesButton : {
                borderWidth : 2,
                borderRadius : 5,
                borderColor : '#34495E',
                backgroundColor : '#34495E'
            },
            noButton : {
                borderWidth : 2,
                borderRadius : 5,
                borderColor : '#34495E',
                backgroundColor : 'transparent',
            }
        })

        return (
            <View style={{flex: 1}}>
                <Text style={styles.cardCounter}>{arrayPosition + 1}/{cardsNumber}</Text>
                <View style={styles.questionContainer}>
                    <View style={styles.textQuestionContainer}>
                        <Text style={styles.textQuestion}>{ cards[arrayPosition].question }</Text>

                        {showAnswer === 0 &&
                            <TouchableOpacity
                                onPress={() => this.setState(() => ({
                                    showAnswer: 1
                                }))}
                            >
                                <Text style={{textAlign : 'center'}}>Show answer</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>

                {showAnswer === 1 &&
                    <View style={styles.answerContainer}>

                        <View style={styles.cardAnswerContainer}>
                            <View style={styles.textAnswerContainer}>
                                <Text style={styles.textAnswer}>{ cards[arrayPosition].answer }</Text>
                            </View>
                        </View>

                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonWrapper}>
                                <View style={{flex : 1}}>
                                    <Button
                                        buttonStyle={styles.yesButton}
                                        onPress={() => this.handleClickYes()}
                                        title="Yes"
                                    />
                                </View>
                                <View style={{flex : 1}}>
                                    <Button
                                        buttonStyle={styles.noButton}
                                        onPress={() => this.handleClickNo()}
                                        title="No"
                                    />
                                </View>
                            </View>
                        </View>

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
            <View style={styles.container}>
                {arrayPosition !== cardsNumber &&
                    this.renderCard()
                }
                {this.quizFinish(arrayPosition, cardsNumber) &&
                    <View style={{flex: 1}}>
                        <QuizResult correctAnswers={this.state.correctAnswers} cardsNumber={cardsNumber}/>

                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonWrapper}>
                                <View style={{ flex : 1}}>
                                    <Button
                                        buttonStyle={styles.restartQuizButton}
                                        onPress={() => this.setState({
                                            arrayPosition: 0,
                                            correctAnswers: 0,
                                        })}
                                        title="Restart Quiz"
                                    />
                                </View>

                                <View style={{ flex : 1}}>
                                    <Button
                                        buttonStyle={styles.backToDeckButton}
                                        onPress={() => navigation.navigate(
                                            'DeckMainPage',
                                            { deckID }
                                        )}
                                        title="Back To Deck"
                                    />
                                </View>
                            </View>
                        </View>

                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#1abc9c'
    },
    buttonsContainer : {
        flex : 1,
        flexDirection : 'row'
    },
    buttonWrapper : {
        flex : 1,
        alignSelf : 'flex-end',
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    restartQuizButton : {
        borderWidth : 2,
        borderRadius : 5,
        borderColor : '#34495E',
        backgroundColor : '#34495E'
    },
    backToDeckButton : {
        borderWidth : 2,
        borderRadius : 5,
        borderColor : '#34495E',
        backgroundColor : 'transparent',
    },
    resultContainer : {
        flex: 1,
        alignItems : 'center',
    },
    resultTextContainer : {
        flex : 1,
        flexDirection: 'column',
        justifyContent : 'flex-end'
    },
    resultText : {
        fontSize : 50,
        color : '#bdc3c7',
        textAlign : 'center'
    }
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
