import React, { Component }                     from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';
import { MyHTML } from '../components/';

const minHeight = 200;

export default class Button extends Component {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    shouldComponentUpdate() {
        return false;
    }

    onPress = () => {
        const { onPress } = this.props;
        if (typeof onPress !== "undefined" && onPress !== false) {
            onPress();
        }
    }

    render() {
        const { children, image, style, title, onPress } = this.props;
        let { subtitle } = this.props;

        const hasTitle = (typeof title == "undefined" || title == "") && (typeof subtitle == "undefined" || subtitle == "");

        if (typeof subtitle !== "undefined") {
            subtitle = subtitle.replace(/<[^>]*>/g, '');
        }

        return (
            <TouchableOpacity activeOpacity={(typeof onPress == "undefined" || onPress == false) ? 1 : 0.7 } style={[ styles.card, style ]} onPress={ this.onPress }>
                {(typeof image !== "undefined" && image !== "" && image !== null) && (
                    <Image source={{ uri: image }} style={ styles.imageBG }/>
                )}
                {(hasTitle) ? (
                    children
                ) : (
                    <View style={ styles.content }>
                        <Text style={ styles.cardTitle }>{ title }</Text>
                        <Text numberOfLines={ 1 } style={ styles.cardTextContent }>{ subtitle }</Text>
                    </View>
                )}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 6,
        elevation: 6,
        backgroundColor: "#000",
        marginVertical: 10,
    },
    imageBG: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        borderRadius: 6,
        resizeMode: "cover",
        opacity: 0.8
    },
    content: {
        position: "absolute",
        backgroundColor: "rgba(250,250,250,0.85)",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        paddingHorizontal: 18,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    },
    cardTitle: {
        color: "#000",
        fontSize: 15,
        fontFamily: "OpenSans-Regular"
    },
    cardTextContent: {
        color: "#000",
        fontFamily: "OpenSans-Light",
        fontSize: 13,
    }
});
