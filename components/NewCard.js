import React, { Component } from 'react'
import { View, Text } from 'react-native'
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
    }

    render() {
        return(
            <View>
                <Text>Digite uma pergunta para o card</Text>
                <Text>{console.log("Aqui vai as props: ", this.props)}</Text>
                <Input
                    value={this.state.question}
                    onChangeText={(question) => this.setState({question})}
                />
                <Text>Digite a resposta para a pergunta</Text>
                <Input
                    value={this.state.answer}
                    onChangeText={(answer) => this.setState({answer})}
                />
                <Button
                    title="Submit"
                    onPress={() => this.handleSubmit()}
                />
            </View>
        )
    }
}

export default connect()(NewCard)
