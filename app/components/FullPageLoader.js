import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

export default class FullPageLoader extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        return (
            <View style={ styles.container }>
                <ActivityIndicator size={ 50 } color="#FFF" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        flex: 1,
        zIndex: 300,
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.75)"
    }
});
