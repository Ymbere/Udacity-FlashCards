import React, { Component } from 'react'
import { View } from "react-native";

//Redux
import { connect } from "react-redux";
import { handleInitialData } from '../redux/actions/Shared';

class DeckList extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        return(
            <View>
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
