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
import { register }             from '../../actions/auth';
import { BASE_URL }             from '../../common/constants';
import { toastBottom }          from '../../common/helpers';
import { ButtonOutline, NavBar, FullPageLoader } from '../../components/';

const { height, width } = Dimensions.get('window');

class Register extends Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);

        this.state = {
            name: "",
            email: "",
            password: "",
            cpf: "",
            avatar: BASE_URL + "/files/user.png",
            loader: false,
        }
    }

    validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validateCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g,'');

        if(cpf == '') return false;

        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
                return false;

        add = 0;
        for (i=0; i < 9; i ++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(9)))
                return false;

        add = 0;
        for (i = 0; i < 10; i ++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;

        if (rev != parseInt(cpf.charAt(10)))
            return false;
        return true;
    }

    register = () => {
        const { name, email, password, cpf, avatar } = this.state;
        if (name.trim() == "" || email.trim() == "" || password.trim() == "" || cpf.trim() == "") {
            toastBottom("Preencha os campos corretamente");
            return null;
        }

        if ( !this.validateEmail(email) ) {
            toastBottom("Informe um email válido");
            return null;
        }

        if ( password.length < 6 ) {
            toastBottom("A senha deve ter mais de 6 dígitos");
            return null;
        }

        if ( !this.validateCPF(cpf) ) {
            toastBottom("Informe um CPF válido");
            return null;
        }

        this.props.register({
            name: name,
            email: email,
            password: password,
            cpf: cpf,
            avatar: avatar
        });
        this.setState({ loader: true });
    }

    componentWillReceiveProps(nextProps) {
        const { error, user } = nextProps;
        if (error.length > 0) {
            this.setState({ loader: false });
        }

        if (user.id !== null) {
            this.setState({ loader: false });
            Actions.principal({ type: ActionConst.REPLACE });
            toastBottom("Seja bem vindo, " + user.name.split(" ")[0]);
        }
    }

    renderInput = (field, title) => {
        return (
            <View>
                <Text style={ styles.label }>{ title }</Text>
                <TextInput
                    fontFamily="OpenSans-Regular"
                    style={ styles.input }
                    onChangeText={(value) => this.setState({ [field]: value })}
                    value={ this.state[field] }
                    secureTextEntry={ field == "password" }
                    underlineColorAndroid="transparent"
                />
            </View>
        )
    }

    render() {
        const { name, email, password, cpf, avatar, loader } = this.state;

        return (
            <View style={{ backgroundColor: "#FFF" }}>
                <NavBar
                    transparent
                    style={{ backgroundColor: "#13ad6d" }}
                    page="Cadastrar"
                    showRightIcon={ false }
                    color="#FFF"
                />
                {(loader) && (
                    <FullPageLoader/>
                )}
                <ScrollView keyboardShouldPersistTaps="always" style={{ zIndex: 1 }}>
                    <View style={ styles.container }>
                        <View style={ styles.form }>
                            <View>
                                { this.renderInput("name", "Nome Completo") }
                                { this.renderInput("email", "Email") }
                                { this.renderInput("password", "Senha") }
                                { this.renderInput("cpf", "CPF") }
                                <View style={ styles.divider }/>
                            </View>
                            <ButtonOutline activeOpacity={ 0.85 } onPress={ this.register } style={ styles.button } color="#13ad6d">
                                <Text style={ styles.buttonText }>Cadastrar</Text>
                            </ButtonOutline>
                        </View>
                    </View>
                </ScrollView>
                <View style={ styles.bottomBox }/>
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        user: state.user.user,
        error: state.user.error,
    }
}

export default connect(mapStateToProps, { register })(Register);

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
            borderColor: "#cccccc",
            borderWidth: 1,
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
        backgroundColor: "#13ad6d",
        position: "absolute",
        zIndex: 0,
        bottom: -190,
        right: -100,
        transform: [{ rotateZ: '-0.2rad' }]
    }
});
