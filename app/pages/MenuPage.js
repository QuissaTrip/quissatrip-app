import React, { Component }         from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    BackHandler
}                               from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect }              from 'react-redux';
import * as Animatable          from 'react-native-animatable';
import EvilIcons                from 'react-native-vector-icons/EvilIcons';
import SimpleIcons              from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome              from 'react-native-vector-icons/FontAwesome';
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

    onSwipeRight() {
        this.closeMenu();
    }

    render() {
        const { animation } = this.state;
        const { user } = this.props;
        const isLogged = (typeof user.id !== "undefined" && user.id !== null);
        const animationDuration = 400;
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <GestureRecognizer
                onSwipeRight={() => this.onSwipeRight()}
                config={ config }
                style={ styles.container }
            >
                <Animatable.View animation={ animation[0] } duration={ animationDuration } style={ styles.overlay }>
                    <TouchableOpacity onPress={ () => this.closeMenu() } style={{ flex: 1 }}/>
                </Animatable.View>
                <StatusBar animated showHideTransition="slide" translucent={ true } backgroundColor="rgba(0,0,0,0.2)"/>
                <Animatable.View animation={ animations[animation[1]] } duration={ animationDuration } style={ styles.content }>
                    <ScrollView style={{ flex: 1, width: width-70, paddingHorizontal: 20 }}>
                        <Text style={ styles.title }>Menu</Text>

                        <View style={ styles.list }>
                            <View style={{ marginBottom: 50 }}>
                                <TouchableOpacity onPress={ () => Actions.commerceCategories({ categoryID: 3, titlePage: "Serviços" }) }>
                                    <View style={ styles.item }>
                                        <EvilIcons name="cart" size={ 30 } color={ itemColor }/>
                                        <Text style={ styles.text }>Serviços</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={ () => Actions.commerceList({ categoryID: 1, titlePage: "Restaurantes" }) }>
                                    <View style={ styles.item }>
                                        <Image source={ require("../../assets/drink-glass.png") } style={{ height: 25, width: 25, marginRight: 3 }} />
                                        <Text style={ styles.text }>Onde comer</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={ () => Actions.categories() }>
                                    <View style={ styles.item }>
                                        <SimpleIcons name="directions" size={ 20 } color={ itemColor } style={{ marginRight: 5, marginLeft: 4 }}/>
                                        <Text style={ styles.text }>O que visitar</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={ () => Actions.commerceList({ categoryID: 2, titlePage: "Hotéis" }) }>
                                    <View style={ styles.item }>
                                        <SimpleIcons name="location-pin" size={ 20 } color={ itemColor } style={{ marginRight: 5, marginLeft: 4 }}/>
                                        <Text style={ styles.text }>Onde ficar</Text>
                                    </View>
                                </TouchableOpacity>

                                {/*<TouchableOpacity>
                                    <View style={ styles.item }>
                                        <EvilIcons name="question" size={ 30 } color={ itemColor }/>
                                        <Text style={ styles.text }>Dúvidas</Text>
                                    </View>
                                </TouchableOpacity>*/}

                                {(isLogged) && (
                                    <TouchableOpacity onPress={ () => Actions.userProfile() }>
                                        <View style={ styles.item }>
                                            <EvilIcons name="user" size={ 30 } color={ itemColor }/>
                                            <Text style={ styles.text }>Editar Perfil</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}

                                <TouchableOpacity onPress={ () => Actions.cityInfo({ fullText: true }) }>
                                    <View style={ styles.item }>
                                        <EvilIcons name="question" size={ 30 } color={ itemColor }/>
                                        <Text style={ styles.text }>Sobre a cidade</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={ () => Actions.moreApps() }>
                                    <View style={ styles.item }>
                                        <Image source={ require("../../assets/plus.png") } style={{ height: 20, width: 20, marginRight: 4, marginLeft: 7 }} />
                                        <Text style={ styles.text }>Conheça a região</Text>
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
                    </ScrollView>
                </Animatable.View>
            </GestureRecognizer>
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
        alignItems: 'center',
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
        minHeight: height-140,
        maxHeight: "100%",
        justifyContent: "space-between",
        paddingBottom: 0
    },
        item: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingVertical: 10,
            marginVertical: 8,
        },
            text: {
                fontSize: 19,
                textAlign: "center",
                color: itemColor,
                fontFamily: "OpenSans-Regular",
                marginLeft: 10
            }
});
