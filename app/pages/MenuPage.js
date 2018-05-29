import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    BackHandler
}                               from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect }              from 'react-redux';
import * as Animatable          from 'react-native-animatable';
import EvilIcons                from 'react-native-vector-icons/EvilIcons';
import SimpleIcons              from 'react-native-vector-icons/SimpleLineIcons';
import { logout }               from '../actions/auth';

const { height, width } = Dimensions.get('window');
const itemColor = "rgba(0,0,0,0.7)";

const animations = {
    mySlideIn: {
        from: {
            right: -(width-70)
        },
        to: {
            right: 0
        },
    },
    mySlideOut: {
        from: {
            right: 0
        },
        to: {
            right: -(width-70)
        },
    }
}

class MenuPage extends Component {
    constructor(props) {
        super(props);
        this.logInOut = this.logInOut.bind(this);

        this.state = {
            animation: ["fadeIn", "mySlideIn"]
        }
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            this.closeMenu();
            return true;
        });
    }

    closeTimer = null;

    closeMenu = () => {
        this.setState({ animation: ["fadeOut", "mySlideOut"] });
        this.closeTimer = setTimeout(() => {
            this.props.closeMenu();
            BackHandler.removeEventListener("hardwareBackPress");
        }, 1000)
    }

    componentWillUnmount() {
        clearTimeout(this.closeTimer);
    }

    logInOut = (type) => {
        if (type == "login") {
            Actions.welcome()
        } else {
            this.props.logout();
            Actions.principal({ type: ActionConst.REPLACE });
        }
    }

    render() {
        const { animation } = this.state;
        const { user } = this.props;
        const isLogged = (typeof user.id !== "undefined" && user.id !== null);

        return (
            <View style={ styles.container }>
                <Animatable.View animation={ animation[0] } duration={ 800 } style={ styles.overlay }>
                    <TouchableOpacity onPress={ () => this.closeMenu() } style={{ flex: 1 }}/>
                </Animatable.View>
                <StatusBar animated showHideTransition="slide" translucent={ true } backgroundColor="rgba(0,0,0,0.2)"/>
                <Animatable.View animation={ animations[animation[1]] } duration={ 800 } style={ styles.content }>
                    <View style={{ flex: 1 }}>
                        <Text style={ styles.title }>Menu</Text>

                        <View style={ styles.list }>
                            <View>
                                <TouchableOpacity onPress={ () => Actions.circuits() }>
                                    <View style={ styles.item }>
                                        <SimpleIcons name="map" size={ 20 } color={ itemColor } style={{ marginRight: 5, marginLeft: 4 }}/>
                                        <Text style={ styles.text }>Circuitos</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={ () => Actions.commerceCategories() }>
                                    <View style={ styles.item }>
                                        <EvilIcons name="cart" size={ 30 } color={ itemColor }/>
                                        <Text style={ styles.text }>Comércios</Text>
                                    </View>
                                </TouchableOpacity>
                                {(isLogged) && (
                                    <TouchableOpacity onPress={ () => Actions.userProfile() }>
                                        <View style={ styles.item }>
                                            <EvilIcons name="user" size={ 30 } color={ itemColor }/>
                                            <Text style={ styles.text }>Editar Perfil</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}

                                <TouchableOpacity>
                                    <View style={ styles.item }>
                                        <EvilIcons name="question" size={ 30 } color={ itemColor }/>
                                        <Text style={ styles.text }>Dúvidas?</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {(isLogged) ? (
                                <TouchableOpacity onPress={ this.logInOut }>
                                    <View style={ styles.item }>
                                        <EvilIcons name="arrow-left" size={ 30 } color={ itemColor }/>
                                        <Text style={ styles.text }>Logout</Text>
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={ () => this.logInOut("login") }>
                                    <View style={ styles.item }>
                                        <EvilIcons name="arrow-right" size={ 30 } color={ itemColor }/>
                                        <Text style={ styles.text }>Fazer Login</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </Animatable.View>
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        user: state.user.user,
    }
}

export default connect(mapStateToProps, { logout })(MenuPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        backgroundColor: "transparent",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        elevation: 10
    },
    content: {
        position: "absolute",
        zIndex: 99,
        elevation: 10,
        bottom: 0,
        right: 0,
        width: width-70,
        height: height,
        paddingHorizontal: 20,
        backgroundColor: "#FFF",
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        position: "absolute",
        zIndex: 89,
        elevation: 10,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    title: {
        marginTop: 55,
        marginBottom: 20,
        fontSize: 22,
        textAlign: "center",
        color: "#000",
        fontFamily: "OpenSans-Regular"
    },
    list: {
        flex: 1,
        width: width-110,
        justifyContent: "space-between",
        paddingBottom: 10
    },
        item: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingVertical: 10,
            marginVertical: 8
        },
            text: {
                fontSize: 19,
                textAlign: "center",
                color: itemColor,
                fontFamily: "OpenSans-Regular",
                marginLeft: 10
            },
});
