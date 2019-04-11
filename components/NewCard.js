import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
//Redux Stuff
import { connect } from "react-redux";
//Components
import { Input, Button } from "react-native-elements";
import { handleAddCard } from '../redux/actions/DeckActions';
class NewCard extends Component {

    state = {
        question: '',
        answer: '',
    }

    handleSubmit = () => {
        const { dispatch } = this.props
        const { question, answer } = this.state
        const parentID = this.props.navigation.getParam('parentID')

        dispatch(handleAddCard({
            question,
            answer,
            id: Date.now(),
            deck_id: parentID
        }))

        this.setState(() => ({
            question: '',
            answer: ''
        }))

        this.props.navigation.pop()
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.inputsContainer}>
                    <Input
                        placeholder="Digite uma pergunta para o card"
                        value={this.state.question}
                        onChangeText={(question) => this.setState({question})}
                    />
                    <Input
                        placeholder="Digite a resposta para a pergunta"
                        value={this.state.answer}
                        onChangeText={(answer) => this.setState({answer})}
                    />
                </View>
                <Button
                    title="Submit"
                    onPress={() => this.handleSubmit()}
                    disabled={this.state.question === "" || this.state.answer === ""}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#1abc9c'
    },
    inputsContainer : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    labelTitle : {
        fontSize : 50,
        color : '#fff'
    }
})

export default connect()(NewCard)
