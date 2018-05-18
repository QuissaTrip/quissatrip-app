import React, { Component }                     from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View
}                       from 'react-native';
import LinearGradient   from 'react-native-linear-gradient';

const colors = {
    basic: ["#FFF", "#FFF"],
    primary: ["#0a8c8a", "#0ec1be"],
}

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    buttonWithBackground = (color) => {
        const { style, onPress, children } = this.props;
        return (
            <TouchableOpacity onPress={ onPress } style={ style }>
                <LinearGradient
                    start={{ y: 0.0, x: 0.25 }} end={{ y: 0.5, x: 1.0 }}
                    colors={ colors[color] }
                    style={ styles.button }
                >
                    { children }
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    buttonWithBorder = (color) => {
        const { style, onPress, children, insideButton } = this.props;

        return (
            <TouchableOpacity onPress={ onPress } style={ style }>
                <LinearGradient
                    start={{ y: 0.0, x: 0.25 }} end={{ y: 0.5, x: 1.0 }}
                    colors={ colors[color] }
                    style={ styles.buttonWithBorder }
                >
                    <View style={[ styles.button, insideButton, { elevation: 0, backgroundColor: "#FFF" }]}>
                        { children }
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    buttonLink = () => {
        const { style, onPress, children } = this.props;
        return (
            <TouchableOpacity onPress={ onPress } style={ style }>
                <View style={ styles.buttonWithBorderInside }>
                    { children }
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { border, link } = this.props;
        let { color } = this.props;
        color = (typeof color == "undefined") ? "basic" : color;

        return (link == true) ? this.buttonLink() :
               (border == true) ? this.buttonWithBorder(color)
                                 : this.buttonWithBackground(color)
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 26,
        borderRadius: 300,
        elevation: 4
    },
    buttonWithBorder: {
        padding: 2,
        borderRadius: 300,
        elevation: 4
    },
    buttonWithBorderInside: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: "#FFF",
        borderRadius: 300,
        width: "100%"
    }
});
