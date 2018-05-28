import React, { Component }         from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity
}                       from 'react-native';
import { Actions }      from 'react-native-router-flux';
import { connect }      from 'react-redux';
import Icon             from 'react-native-vector-icons/SimpleLineIcons';
import { NavBar }       from '../../components/';
import { newRolezinho } from '../../actions/rolezinhos';

const { height, width } = Dimensions.get('window');
const color = "#afafaf";

class SelectedMedia extends Component {
    constructor(props) {
        super(props);
        this.sendRolezinho = this.sendRolezinho.bind(this);

        this.state = {
            text: ""
        }
    }

    sendRolezinho = () => {
        const { media, user } = this.props;
        const { text } = this.state;

        this.props.newRolezinho(user.id, media, text, user.token);
        Actions.pop({ popNum: 4 });
    }

    render() {
        const { media } = this.props;
        const { text } = this.state;

        return (
            <View style={ styles.container }>
                <NavBar transparent showRightIcon={ false } page="" />
                <StatusBar animated showHideTransition="slide" translucent={true} backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content"/>
                <Image
                    source={{ uri: media }}
                    style={ styles.image }
                />
                <View style={ styles.bottomBox }>
                    <TextInput
                        style={ styles.input }

                        placeholder="Adicione uma legenda"
                        placeholderTextColor={color}

                        onChangeText={(text) => this.setState({text})}
                        value={ text }
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity onPress={ this.sendRolezinho } style={ styles.sendButton }>
                        <Icon size={ 20 } color={color} name="cursor"/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps, { newRolezinho })(SelectedMedia);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000"
    },
    image: {
        position: "absolute",
        bottom: 0,
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    bottomBox: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: "rgba(0,0,0,0.7)"
    },
        input: {
            padding: 10,
            paddingLeft: 20,
            paddingRight: 50,
            borderWidth: 1,
            borderColor: "#9b9b9b",
            borderRadius: 300,
            color: color
        },
        sendButton: {
            position: "absolute",
            bottom: 24,
            right: 35
        }
});
