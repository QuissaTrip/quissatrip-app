import React, { Component }         from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TextInput,
    Image,
    Keyboard,
    ScrollView,
    TouchableOpacity
}                                       from 'react-native';
import { Actions }                      from 'react-native-router-flux';
import { connect }                      from 'react-redux';
import { NavBar,Avatar,ButtonOutline }  from '../components/';
import { BASE_URL }                     from '../common/constants/';
import { updateProfile }                from '../actions/auth/';

const { height, width } = Dimensions.get('window');
const bgImage = BASE_URL + "/files/circuits/historico.jpg";
const avatarSize = 100;

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.openGallery = this.openGallery.bind(this);
        this.update = this.update.bind(this);

        const { name, email, cpf, avatar } = this.props.user;

        this.state = {
            name: name,
            email: email,
            password: "password",
            cpf: this.getFormatedCPF(cpf),
            avatar: avatar,
            loader: true,
            focus: "",
            marginBottom: 0,
        }
    }

    getFormatedCPF = (cpf) => {
        cpf = cpf.slice(0, 3) + "." + cpf.slice(3);
        cpf = cpf.slice(0, 7) + "." + cpf.slice(7);
        cpf = cpf.slice(0, 11) + "-" + cpf.slice(11);

        return cpf;
    }

    openGallery = () => {
        Actions.gallery({
            onMediaPress: (media) => {
                this.setState({ avatar: media });
                Actions.pop();
            }
        });
    }

    renderInput = (field, title) => {
        const { focus } = this.state;
        return (
            <View>
                <Text style={ styles.label }>{ title }</Text>
                <TextInput
                    onSubmitEditing={ Keyboard.dismiss }
                    style={[ styles.input, (focus == field) && { elevation: 2 }]}
                    onChangeText={(value) => this.setState({ [field]: value })}
                    value={ this.state[field] }
                    secureTextEntry={ field == "password" }
                    underlineColorAndroid="transparent"
                    fontFamily="OpenSans-Regular"
                    onFocus={() => this.setState({ focus: field })}
                    onBlur={() => this.setState({ focus: "" })}
                />
            </View>
        )
    }

    update = () => {
        const { name, email, password, cpf, avatar } = this.state;
        this.props.updateProfile({
            name: name,
            email: email,
            password: password,
            cpf: cpf,
            avatar: avatar,
            token: this.props.user.token,
            user_id: this.props.user.id
        });
        Actions.pop();
    }

    render() {
        const { avatar } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <NavBar showRightIcon={ false } page="Editar Perfil" />
                <ScrollView style={{ flex: 1 }}>
                    <View style={ styles.container }>
                        <View style={ styles.imageContainer }>
                            <Image resizeMethod="resize" resizeMode="cover" source={{ uri: bgImage }} style={ styles.imageBG }/>
                        </View>

                        <TouchableOpacity activeOpacity={ 0.8 } onPress={ this.openGallery } style={ styles.avatar }>
                            <Avatar avatar={ avatar } size={ avatarSize } containerStyle={{ elevation: 6, margin: 10 }}/>
                        </TouchableOpacity>

                        { this.renderInput("name", "Nome Completo") }
                        { this.renderInput("email", "Email") }
                        { this.renderInput("password", "Senha") }
                        { this.renderInput("cpf", "CPF") }

                        <ButtonOutline activeOpacity={ 0.85 } onPress={ this.update } style={ styles.button } color="#08c9c6">
                            <Text style={ styles.buttonText }>Atualizar</Text>
                        </ButtonOutline>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        user: state.user.user,
    }
}

export default connect(mapStateToProps, { updateProfile })(UserProfile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: "#EAEAEA",
        alignItems: "center"
    },
    imageContainer: {
        width: "100%",
        height: 200,
        backgroundColor: "#000"
    },
        imageBG: {
            width: "100%",
            height: "100%",
            opacity: 0.4
        },

    avatar: {
        top: avatarSize/-1.6,
        marginBottom: -25,
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
        marginBottom: 30
    },

    button: {
        padding: 12,
        paddingHorizontal: 35,
        elevation: 1,
        marginTop: 10,
        marginBottom: 30,
        width: width-40,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "rgba(0,0,0,0.6)",
        fontFamily: "OpenSans-Regular",
        fontSize: 16
    },
});
