import React, { Component }     from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
}                               from 'react-native';
import { connect }              from 'react-redux';
import { Actions }              from 'react-native-router-flux';
import { addCounter }           from '../actions';
import { ButtonOutline, NavBar }from '../components/';

const { height, width } = Dimensions.get('window');

class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: "#FFF" }}>
                <NavBar
                    transparent
                    page={ false }
                    showRightIcon={ false }
                    color="#000"
                    statusBar={{
                        style: "dark-content"
                    }}
                />
                <View style={ styles.container }>
                    <Text style={ styles.title }>Bem Vindo ao Aplicativo <Text style={ styles.titleBold }>QuissaTrip</Text></Text>

                    <View style={{ flexDirection: "row"}}>
                        <ButtonOutline onPress={ () => Actions.register() } style={ styles.buttonLeft } color="#09b9e2">
                            <Text style={ styles.buttonText }>Cadastrar</Text>
                        </ButtonOutline>
                        <ButtonOutline onPress={ () => Actions.login() } style={ styles.buttonRight } color="#08c9c6">
                            <Text style={ styles.buttonText }>Login</Text>
                        </ButtonOutline>
                    </View>
                </View>
                <View style={ styles.bottomBox }/>
            </ScrollView>
        )
    }
}

mapStateToProps = (state) => {
    return {
        user: state.user.user,
    }
}

export default connect(mapStateToProps, { addCounter })(WelcomePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    buttonLeft: {
        padding: 12,
        paddingHorizontal: 35,
        marginRight: 15
    },
    buttonRight: {
        padding: 12,
        paddingHorizontal: 53,
        marginLeft: 15
    },
    buttonText: {
        color: "rgba(0,0,0,0.6)",
        fontFamily: "OpenSans-Regular",
        fontSize: 16
    },
    title: {
        fontSize: 22,
        color: "#000",
        fontFamily: "OpenSans-Light",
        marginBottom: 90,
        lineHeight: 32,
        textAlign: "center"
    },
    titleBold: {
        fontFamily: "OpenSans-Regular",
    },
    bottomBox: {
        width: "200%",
        height: 200,
        backgroundColor: "#08c9c6",
        position: "absolute",
        bottom: -150,
        right: -100,
        transform: [{ rotateZ: '-0.45rad' }]
    }
});
