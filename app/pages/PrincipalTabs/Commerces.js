import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
}                                   from 'react-native';
import { Actions, ActionConst }     from 'react-native-router-flux';
import { connect }                  from 'react-redux';
import { NavBar }                   from '../../components/';

class Commerces extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const size = 28;
        return (
            <View style={{ flex: 1 }}>
                <NavBar showBackIcon={ false } />
                <View style={ styles.container }>
                    <Text style={ styles.text }>Não existem comércios</Text>
                    <View style={ styles.row }>
                        <Text style={[ styles.text, { paddingBottom: 3 }]}>cadastrados ainda </Text>
                        <Image source={ require("../../../assets/sad.png") } style={{ width: size, height: size }}/>
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(null)(Commerces);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 22,
        textAlign: "center",
        color: "#000",
        fontFamily: "OpenSans-Regular"
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});
