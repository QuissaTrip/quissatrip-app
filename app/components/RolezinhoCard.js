import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
}                  from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

const { height, width } = Dimensions.get('window');
const radius = 8;

class RolezinhoCard extends Component {
    constructor(props) {
        super(props);
    }

    openRole = () => {
        const { image, text, user, rolezinhoID } = this.props;
        Actions.rolezinhoFull({ url: image });
    }

    render() {
        const { image, text, user, rolezinhoID } = this.props;

        return (
            <TouchableOpacity onPress={ this.openRole.bind(this) } activeOpacity={ 0.9 } style={ styles.container }>
                <Image source={{ uri: image }} style={ styles.image }/>
                <View style={ styles.opacity }/>
                <View style={ styles.avatarContainer }>
                    <Image source={{ uri: user.avatar }} style={ styles.avatar }/>
                </View>
                <View style={ styles.content }>
                    <Text numberOfLines={ 1 } style={ styles.text }>{ text }</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default connect(null)(RolezinhoCard);

const styles = StyleSheet.create({
    container: {
        height: height-165,
        backgroundColor: "#FFF",
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        margin: 15,
        width: width-60,
        elevation: 2,
        borderRadius: radius
    },
    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
        borderRadius: radius
    },
    opacity: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: radius
    },
    content: {
        backgroundColor: "rgba(255,255,255,0.9)",
        width: "100%",
        padding: 20,
        paddingTop: 35,
        justifyContent: "center",
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius
    },
        text: {
            fontSize: 14,
            fontFamily: "OpenSans-Regular",
            color: "rgba(0,0,0,0.8)"
        },
    avatarContainer: {
        backgroundColor: "#FFF",
        width: 50,
        height: 50,
        padding: 6,
        borderRadius: (50/2),
        left: 10,
        bottom: -25,
        elevation: 5,
        zIndex: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: (45/2)
    },
});
