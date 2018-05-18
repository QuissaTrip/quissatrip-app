import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
}                                   from 'react-native';
import { Actions, ActionConst }     from 'react-native-router-flux';
import { connect }                  from 'react-redux';

class Events extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text style={ styles.text }>Não existem eventos</Text>
                <Text style={ styles.text }>próximos =(</Text>
            </View>
        )
    }
}

export default connect(null)(Events);

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
