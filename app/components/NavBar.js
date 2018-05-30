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
import EvilIcons    from 'react-native-vector-icons/EvilIcons';
import { Actions }  from 'react-native-router-flux';
import { connect }  from 'react-redux';
import { newRolezinho } from '../actions/rolezinhos';

const hitSlop = { top: 30, left: 30, bottom: 30, right: 30 }

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.openGallery = this.openGallery.bind(this);
        this.backPage = this.backPage.bind(this);
        this.search = this.search.bind(this);
    }

    backPage = () => {
        Actions.pop();
    }

    search = () => {
        Actions.search();
    }

    openGallery = () => {
        const { user } = this.props;
        if (user.id !== null) {
            Actions.gallery({ rolezinho: true });
        } else {
            Actions.welcome();
        }
    }

    render() {
        const { onLeft, onRight, color, showRoleIcon, transparent, style, showBackIcon, page, showRightIcon, statusBar } = this.props;

        if (typeof color !== "undefined") {
            myColor = color;
        } else {
            myColor = (transparent) ? "#FFF" : "#FFF";
        }

        const statusBarColor = (typeof statusBar !== "undefined" && typeof statusBar.bg !== "undefined") ? statusBar.bg : "transparent";
        const statusBarStyle = (typeof statusBar !== "undefined" && typeof statusBar.style !== "undefined") ? statusBar.style : "light-content";

        return (
            <View style={[(transparent) ? styles.navBarTransparent : styles.navBar, style]}>
                <StatusBar animated showHideTransition="slide" translucent={true} backgroundColor={ statusBarColor } barStyle={ statusBarStyle }/>
                <View style={{ flex: 1, alignItems: "center", flexDirection: "row" }}>
                    <View style={ styles.sideIcons }>
                        {(showRoleIcon === true) ? (
                            <TouchableOpacity onPress={ this.openGallery } hitSlop={ hitSlop }>
                                <EvilIcons size={ 32 } color={ myColor } name="camera"/>
                            </TouchableOpacity>
                        ) : (
                            (showBackIcon !== false) && (
                                <TouchableOpacity onPress={ this.backPage } hitSlop={ hitSlop }>
                                    <Icon size={ 20 } color={ myColor } name="arrow-left"/>
                                </TouchableOpacity>
                            )
                        )}
                    </View>
                    <View style={{ flex: 1 }}>
                        {(page !== false) && (
                            <Text style={[ styles.title, { color: myColor }]}>{ (typeof page !== "undefined") ? page : "QuissaTrip" }</Text>
                        )}
                    </View>
                    <View style={ styles.sideIcons }>
                        {(showRightIcon !== false) && (
                            <TouchableOpacity onPress={ this.search } hitSlop={ hitSlop }>
                                <Icon size={ 20 } color={ myColor } name="magnifier"/>
                            </TouchableOpacity>
                        )}
                    </View>
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

export default connect(mapStateToProps, { newRolezinho })(NavBar);

const styles = StyleSheet.create({
    navBar: {
        height: 80,
        paddingTop: 24,
        elevation: 3,
        backgroundColor: "#08c9c6",
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
