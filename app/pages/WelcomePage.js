import React, { Component }     from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    Dimensions
}                               from 'react-native';
import { connect }              from 'react-redux';
import * as Animatable          from 'react-native-animatable';
import { addCounter }           from '../actions';
import { Button }               from '../components/';

const { height, width } = Dimensions.get('window');

class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: "#FFF" }}>
                <View style={ styles.container }>
                    <Text style={ styles.title }>QuissaTrip</Text>

                    <Button color="primary" style={ styles.button } onPress={ () => alert("Criar Conta") }>
                        <Text style={ styles.buttonText }>Criar uma conta</Text>
                    </Button>
                    <Button color="primary" style={ styles.button } onPress={ () => alert("Logar") }>
                        <Text style={ styles.buttonText }>Fazer login</Text>
                    </Button>
                    <Button link style={ styles.button } onPress={ () => alert("Criar Conta") }>
                        <Text style={ styles.linkText }>Entrar como visitante</Text>
                    </Button>
                </View>
            </ScrollView>
        )
    }
}

mapStateToProps = (state) => {
    return {
        counter: state.general.openAppCounter,
        user: state.user.user,
    }
}

export default connect(mapStateToProps, { addCounter })(WelcomePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height-25,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    backgroundImage: {
        position: 'absolute',
        resizeMode: "cover",
        height: height,
        width: width,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.5
    },
    button: {
        width: "100%",
        paddingVertical: 20
    },
    linkText: {
        color: "#0a8c8a",
        fontSize: 16
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16
    },
    title: {
        fontSize: 22,
        color: "#000",
    }
});
