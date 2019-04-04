//Components
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Input, Button } from 'react-native-elements'
//Redux stuff
import { connect } from "react-redux";
//Methods
import { handleAddDeck } from "../redux/actions/DeckActions";

class NewDeck extends Component {
    state = {
        title: "",
        cards: [],
        id: 0,
        redirect: false
    }

    handleSubmit = () => {

        const { dispatch } = this.props
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

        this.setState({
            title: ""
        })
    }

    render() {
        return(
            <View>
                <Text>Digite um nome para o deck</Text>
                <Input
                    value={this.state.title}
                    onChangeText={(title) => this.setState({title})}
                />
                <Button
                    title="Solid button"
                    onPress={this.handleSubmit}
                />
            </View>
        )
    }
}

export default connect()(NewDeck)
