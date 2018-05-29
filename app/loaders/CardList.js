import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
}               from 'react-native';
import Shimmer  from 'react-native-shimmer';
const { height, width } = Dimensions.get('window');

export default class CardList extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        return (
            <View style={ styles.container }>
                <Shimmer>
                    <View style={ styles.card }/>
                </Shimmer>
                <View style={{ marginVertical: 7.5 }}/>
                <Shimmer>
                    <View style={ styles.card }/>
                </Shimmer>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15
    },
    card: {
        width: width-40,
        height: 220,

        borderRadius: 6,
        elevation: 3,

        backgroundColor: "#c1c1c1",
        marginVertical: 0,
        marginHorizontal: 10,
    },
});
