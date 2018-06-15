import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    StatusBar,
}               from 'react-native';
import Shimmer  from 'react-native-shimmer';

const { height, width } = Dimensions.get('window');

export default class Splash extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ styles.container }>
                <StatusBar animated showHideTransition="slide" translucent hidden backgroundColor="transparent"/>
                <Shimmer opacity={0.7}>
                    <Image
                        resizeMethod="resize"
                        resizeMode="cover"
                        source={ require("../../assets/icone.png") }
                        style={ styles.image }
                    />
                </Shimmer>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(59, 220, 255, 0.3)",
        padding: 15,
        height: height,
        width: width,
    },
    image: {
        height: width/3,
        width: width/3,
    }
});
