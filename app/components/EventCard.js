import React, { Component }                     from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

export default class EventCard extends Component {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    onPress = () => {
        const { onPress } = this.props;
        if (typeof onPress !== "undefined" && onPress !== false) {
            onPress();
        }
    }

    render() {
        const { date, title, onPress, style } = this.props;

        return (
            <TouchableOpacity activeOpacity={ 1 } style={[ styles.card, style ]} onPress={ this.onPress }>
                {(typeof date !== "undefined") && (
                    <Text style={ styles.date }>{ date }</Text>
                )}
                <Text numberOfLines={ 1 } style={ styles.title }>{ title }</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 6,
        elevation: 2,
        backgroundColor: "#FFF",
        margin: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    date: {
        marginBottom: 5,
        color: "#000",
        fontSize: 25,
        fontFamily: "OpenSans-Regular",
        textAlign: "left",
    },
    title: {
        color: "rgba(0,0,0,0.6)",
        fontFamily: "OpenSans-Regular",
        fontSize: 14,
    }
});
