import React, { Component }         from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity
}                   from 'react-native';
import { BASE_URL } from '../common/constants/';

const { height, width } = Dimensions.get('window');
const baseAvatar = BASE_URL + "/files/user.png";

export default class Avatar extends Component {
    constructor(props) {
        super(props);
        const { avatar } = this.props;

        this.state = {
            avatar: (avatar !== null) ? avatar : baseAvatar
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.avatar !== this.state.avatar) {
            this.setState({ avatar: nextProps.avatar });
        }
    }

    render() {
        const { avatar } = this.state;
        const { size, style, containerStyle } = this.props;

        return (
            <View style={[ styles.avatarContainer, { height: size, width: size }, containerStyle]}>
                <Image
                    resizeMethod="resize"
                    resizeMode="cover"
                    onError={ () => this.setState({ avatar: baseAvatar }) }
                    source={{ uri: avatar }}
                    style={[ styles.avatar, { height: size-5, width: size-5 }, style]}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFF",
        borderRadius: 10000,
    },
    avatar: {
        borderRadius: 10000
    },
});
