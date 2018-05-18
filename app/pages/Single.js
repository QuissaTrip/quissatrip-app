import React, { Component }     from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
    Image,
    StatusBar
}                               from 'react-native';
import Icon                     from 'react-native-vector-icons/SimpleLineIcons';
import ScrollableTabView        from 'react-native-scrollable-tab-view';
import { Button, NavBar, Card } from '../components/';

const { height } = Dimensions.get('window');

export default class Single extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            statusBar: {
                bg: "transparent",
                barStyle: "light-content"
            }
        }
    }

    workTime = (open, close) => {
        if (open == "00:00" && close == "23:59") {
            return "Aberto sempre";
        }

        const openHour = parseInt(open.split(":")[0]);
        const openMinutes = parseInt(open.split(":")[1]);
        const openFinal = (openMinutes > 0) ? open : openHour;

        const closeHour = parseInt(close.split(":")[0]);
        const closeMinutes = parseInt(close.split(":")[1]);
        const closeFinal = (closeMinutes > 0) ? close : closeHour;

        return "Aberto de " + openFinal + "h às " + closeFinal + "h"
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.entityID !== this.state.entityID ||
                JSON.stringify(nextState.statusBar) !== JSON.stringify(this.state.statusBar))
    }

    handleScroll = (event) => {
        const y = event.nativeEvent.contentOffset.y;

        if (y >= 116) {
            this.setState({
                statusBar: {
                    bg: "#FFF",
                    barStyle: "dark-content"
                }
            });
        } else {
            this.setState({
                statusBar: {
                    bg: "transparent",
                    barStyle: "light-content"
                }
            });
        }
    }

    render() {
        const { entityID } = this.props;
        const { statusBar } = this.state;
        const places = require("../../assets/jsons/place_singles.json");
        const place = places.find(item => item.id === entityID);

        return (
            <ScrollView
                style={{ height: height }}
                onScroll={ this.handleScroll }>
                <NavBar transparent page={ false }/>
                <StatusBar animated showHideTransition="slide" translucent={true} backgroundColor={ statusBar.bg } barStyle={ statusBar.barStyle }/>
                <View style={ styles.container }>
                    <View style={ styles.header }>
                        <Image source={{ uri: place.images[0] }} style={ styles.backgroundImage }/>
                    </View>
                    <View style={ styles.content }>
                        <Card onPress={ false } style={ styles.cardOnTop }>
                            <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                                <Text style={ styles.pageTitle }>{ place.name }</Text>

                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                    <Icon name="location-pin" size={ 17 } color="#000"/>
                                    <Text style={[ styles.sectionTitle, { fontSize: 15, marginBottom: 0 }]}> { place.address }</Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                    <Icon name="clock" size={ 17 } color="#666"/>
                                    <Text style={ styles.sectionText}> { this.workTime(place.open, place.close) }</Text>
                                </View>
                            </View>
                        </Card>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 }}>
                            <TouchableOpacity onPress={ () => alert("Abrir mapa") } style={[ styles.buttonOutline, { borderColor: "#0098bc" }]}>
                                <Icon name="cursor" size={ 17 } color="#666"/>
                                <Text style={ styles.buttonText }>  Encontre no Mapa</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={ () => alert("Abrir discador") } style={[ styles.buttonOutline, { borderColor: "#0a9694" }]}>
                                <Icon name="phone" size={ 17 } color="#666"/>
                                <Text style={ styles.buttonText }>  Entre em contato</Text>
                            </TouchableOpacity>
                        </View>
                        <Card onPress={ false } style={{ backgroundColor: "#FFF" }}>
                            <View>
                                <Text style={ styles.sectionTitle }>Informações</Text>
                                <Text style={ styles.sectionText }>{ place.info }</Text>
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={ styles.sectionTitle }>Descrição</Text>
                                <Text style={ styles.sectionText }>{ place.description }</Text>
                            </View>
                        </Card>
                        <Card onPress={ () => alert("Vai para circuito étnico") } style={{ flexDirection: "row", paddingVertical: 20, alignItems: "center", justifyContent: "center", backgroundColor: "#FFF" }}>
                            <Text style={ styles.cta }>Ver mais lugares do { place.circuit_name }</Text>
                            <Icon name="arrow-right" size={ 17 } color="#666"/>
                        </Card>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
    },
    header: {
        height: 230,
        width: "100%",
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        marginTop: -120,
        padding: 10,
    },
    backgroundImage: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        resizeMode: "cover",
        opacity: 0.7,
        backgroundColor: "#000"
    },
    pageTitle: {
        fontSize: 23,
        color: "#000",
        textAlign: "center",
        fontFamily: "OpenSans-SemiBold",
    },
    cardOnTop: {
        backgroundColor: "#FFF",
        height: 180
    },
    sectionTitle: {
        fontSize: 18,
        color: "#000",
        marginBottom: 12,
        fontFamily: "OpenSans-Regular"
    },
    sectionText: {
        fontSize: 15,
        color: "#666",
        fontFamily: "OpenSans-Regular"
    },
    buttonOutline: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 10,
        paddingHorizontal: 15,
        elevation: 3,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderRadius: 300,
    },
    buttonText: {
        fontSize: 12,
        fontFamily: "OpenSans-Regular",
        color: "#666"
    },
    cta: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
        marginRight: 5,
        fontFamily: "OpenSans-Regular"
    }
});
