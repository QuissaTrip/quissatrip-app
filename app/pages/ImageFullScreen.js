import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    StatusBar
}                   from 'react-native';
import { NavBar }   from '../components/';
import { Actions }  from 'react-native-router-flux';
import Icon         from 'react-native-vector-icons/EvilIcons';

const { height, width } = Dimensions.get('window');

export default class ImageFullScreen extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        const { url } = this.props;

        return (
            <View style={ styles.container }>
                <StatusBar animated showHideTransition="slide" backgroundColor="#000"  barStyle="light-content"/>
                <TouchableOpacity style={ styles.closeIcon } onPress={ () => Actions.pop() }>
                    <Icon name="close" size={ 40 } color="#FFF"/>
                </TouchableOpacity>
                <Image
                    style={ styles.image }
                    source={{ uri: url }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    closeIcon: {
        position: "absolute",
        top: 25,
        right: 0,
        padding: 10,
        zIndex: 10,
    }
});
