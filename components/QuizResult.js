import React from "react";
import { View, Text, StyleSheet } from 'react-native'

const QuizResult = ({correctAnswers, cardsNumber}) => {
    return (
        <View style={styles.resultContainer}>
            <View style={styles.resultTextContainer}>
                <Text style={styles.resultText}>Your score is {correctAnswers} of {cardsNumber} </Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    resultContainer : {
        flex: 1,
        alignItems: 'center'
    },
    resultTextContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    resultText: {
        fontSize: 50,
        color: '#bdc3c7',
        textAlign: 'center'
    }
})

export default QuizResult
