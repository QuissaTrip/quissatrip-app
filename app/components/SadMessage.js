import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

export default class SadMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { firstLine, secondLine } = this.props;
        const size = 28;

        return (
            <View style={{ flex: 1 }}>
                <View style={ styles.container }>
                    <Text style={ styles.text }>{ firstLine }</Text>
                    <View style={ styles.row }>
                        <Text style={[ styles.text, { paddingBottom: 3 }]}>{ secondLine } </Text>
                        <Image source={ require("../../assets/sad.png") } style={{ width: size, height: size }}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 22,
        textAlign: "center",
        color: "#000",
        fontFamily: "OpenSans-Regular"
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        alignItems: "center"
    }
});
