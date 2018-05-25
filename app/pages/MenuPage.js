import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
}                       from 'react-native';
import { Actions }      from 'react-native-router-flux';
import { connect }      from 'react-redux';
import * as Animatable  from 'react-native-animatable';
import EvilIcons        from 'react-native-vector-icons/EvilIcons';
import SimpleIcons      from 'react-native-vector-icons/SimpleLineIcons';

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

export default class MenuPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animation: ["fadeIn", "mySlideIn"]
        }
    }

    closeTimer = null;

    closeMenu = () => {
        this.setState({ animation: ["fadeOut", "mySlideOut"] });
        this.closeTimer = setTimeout(() => {
            this.props.closeMenu();
        }, 1000)
    }

    componentWillUnmount() {
        clearTimeout(this.closeTimer);
    }

    render() {
        const { animation } = this.state;
        console.log(animation);
        return (
            <View style={ styles.container }>
                <Animatable.View animation={ animation[0] } duration={ 800 } style={ styles.overlay }>
                    <TouchableOpacity onPress={ () => this.closeMenu() } style={{ flex: 1 }}/>
                </Animatable.View>
                <Animatable.View animation={ animations[animation[1]] } duration={ 800 } style={ styles.content }>
                    <View style={{ flex: 1 }}>
                        <Text style={ styles.title }>Menu</Text>

                        <View style={ styles.list }>
                            <TouchableOpacity>
                                <View style={ styles.item }>
                                    <SimpleIcons name="map" size={ 20 } color={ itemColor } style={{ marginRight: 5, marginLeft: 4 }}/>
                                    <Text style={ styles.text }>Circuitos</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={ styles.item }>
                                    <EvilIcons name="cart" size={ 30 } color={ itemColor }/>
                                    <Text style={ styles.text }>Comércios</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animatable.View>
            </View>
        )
    }
}

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
        marginBottom: 25,
        fontSize: 22,
        textAlign: "center",
        color: "#000",
        fontFamily: "OpenSans-Regular"
    },
    list: {
        flex: 1,
        width: width-110
    },
        item: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingVertical: 10,
            marginVertical: 5
        },
            text: {
                fontSize: 19,
                textAlign: "center",
                color: itemColor,
                fontFamily: "OpenSans-Regular",
                marginLeft: 10
            },
});
