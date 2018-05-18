import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
}                                   from 'react-native';
import { Actions, ActionConst }     from 'react-native-router-flux';
import { connect }                  from 'react-redux';

class Commerces extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text style={ styles.text }>Não existem comércios</Text>
                <Text style={ styles.text }>cadastrados ainda =(</Text>
            </View>
        )
    }
}

export default connect(null)(Commerces);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 22,
        textAlign: "center",
        fontFamily: "OpenSans-Regular"
    }
});
