import React, { Component }     from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Dimensions,
    ToastAndroid
}                               from 'react-native';
import { connect }              from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { login }                from '../../actions/auth';
import { ButtonOutline, NavBar, FullPageLoader } from '../../components/';

const { height, width } = Dimensions.get('window');

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);

        this.state = {
            password: "",
            email: "",
            loader: false,
        }
    }

    login = () => {
        const { email, password } = this.state;
        this.props.login(email, password);
        this.setState({ loader: true });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.id !== null) {
            this.setState({ loader: false });
            Actions.principal({ type: ActionConst.REPLACE });
            ToastAndroid.showWithGravityAndOffset(
                "Seja bem vindo, " + nextProps.user.name.split(" ")[0],
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25, 50
            );
        }
    }

    render() {
        const { email, password, loader } = this.state;
        return (
            <ScrollView keyboardShouldPersistTaps="always" style={{ backgroundColor: "#FFF" }}>
                <NavBar
                    transparent
                    style={{ backgroundColor: "#08c9c6" }}
                    page="Login"
                    showRightIcon={ false }
                    color="#FFF"
                />

                {(loader) && (
                    <FullPageLoader/>
                )}
                <View style={ styles.container }>
                    <View style={ styles.form }>
                        <View>
                            <Text style={ styles.label }>Email</Text>
                            <TextInput
                                fontFamily="OpenSans-Regular"
                                style={ styles.input }
                                onChangeText={(email) => this.setState({email})}
                                value={ email }
                                underlineColorAndroid="transparent"
                            />
                            <Text style={ styles.label }>Senha</Text>
                            <TextInput
                                fontFamily="OpenSans-Regular"
                                style={ styles.input }
                                onChangeText={(password) => this.setState({password})}
                                value={ password }
                                secureTextEntry
                                underlineColorAndroid="transparent"
                            />
                            <View style={ styles.divider }/>
                        </View>
                        <ButtonOutline activeOpacity={ 0.85 } onPress={ this.login } style={ styles.button } color="#08c9c6">
                            <Text style={ styles.buttonText }>Entrar</Text>
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

export default connect(mapStateToProps, { login })(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    form: {
        padding: 5,
        zIndex: 10,
        marginTop: 65,
        flex: 1,
        paddingVertical: 40,
        justifyContent: "space-around",
        alignItems: "center"
    },
        label: {
            color: "rgba(0,0,0,0.8)",
            fontFamily: "OpenSans-Regular",
            marginLeft: 20,
            fontSize: 16,
            marginBottom: 10
        },
        input: {
            backgroundColor: "#FFF",
            width: width-40,
            borderRadius: 300,
            paddingHorizontal: 20,
            marginBottom: 30,
            elevation: 2
        },
    button: {
        padding: 14,
        paddingHorizontal: 35,
        width: width-40,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "rgba(0,0,0,0.6)",
        fontFamily: "OpenSans-Regular",
        fontSize: 16
    },
    divider: {
        height: 1,
        backgroundColor: "transparent",
        marginBottom: 45
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
