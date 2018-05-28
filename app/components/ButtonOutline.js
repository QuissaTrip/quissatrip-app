import React, { Component }     from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';

export default class ButtonOutline extends Component {
    constructor(props) {
        super(props);

        this.buttonPress = this.buttonPress.bind(this);
    }

    buttonPress = () => {
        this.props.onPress();
    }

    render() {
        const { color, children, style } = this.props;

        return (
            <TouchableOpacity {...this.props} onPress={ this.buttonPress } style={[ styles.buttonOutline, style, { borderColor: color }]}>
                { children }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonOutline: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 10,
        paddingHorizontal: 15,
        elevation: 3,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderRadius: 300,
    }
});
