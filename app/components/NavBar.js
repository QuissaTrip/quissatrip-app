import React, { Component }                     from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Image,
    StatusBar,
    Text
}                   from 'react-native';
import Icon         from 'react-native-vector-icons/SimpleLineIcons';
import { Actions }  from 'react-native-router-flux';

const hitSlop = { top: 30, left: 30, bottom: 30, right: 30 }

export default class NavBar extends Component {
    constructor(props) {
        super(props);

        this.backPage = this.backPage.bind(this);
    }

    backPage = () => {
        Actions.pop();
    }

    render() {
        const { onLeft, onRight, transparent, style, showBackIcon, page, showRightIcon, statusBar } = this.props;

        const color = (transparent) ? "#FFF" : "#000";
        const statusBarColor = (typeof statusBar !== "undefined") ? statusBar.bg : "transparent";
        const statusBarStyle = (typeof statusBar !== "undefined") ? statusBar.style : "dark-content";

        return (
            <View style={[(transparent) ? styles.navBarTransparent : styles.navBar, style]}>
                <StatusBar animated showHideTransition="slide" translucent={true} backgroundColor={ statusBarColor } barStyle={ statusBarStyle }/>
                <View style={{ flex: 1, alignItems: "center", flexDirection: "row" }}>
                    <View style={ styles.sideIcons }>
                        {(showBackIcon !== false) && (
                            <TouchableOpacity onPress={ this.backPage } hitSlop={ hitSlop }>
                                <Icon size={ 20 } color={ color } name="arrow-left"/>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ flex: 1 }}>
                        {(page !== false) && (
                            <Text style={[ styles.title, { color: color }]}>{ (typeof page !== "undefined") ? page : "QuissaTrip" }</Text>
                        )}
                    </View>
                    <View style={ styles.sideIcons }>
                        {(showRightIcon !== "false") && (
                            <TouchableOpacity onPress={ this.backPage } hitSlop={ hitSlop }>
                                <Icon size={ 20 } color={ color } name="magnifier"/>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navBar: {
        height: 80,
        paddingTop: 24,
        elevation: 3,
        backgroundColor: "#FFF",
    },
    navBarTransparent: {
        backgroundColor: "transparent",
        position: "absolute",
        zIndex: 10,
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        paddingTop: 24,
    },
    sideIcons: {
        width: "15%",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontFamily: "OpenSans-Regular",
        color: "#000",
        alignSelf: "center"
    }
});
