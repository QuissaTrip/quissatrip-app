import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView
}                                   from 'react-native';
import { Actions, ActionConst }     from 'react-native-router-flux';
import { connect }                  from 'react-redux';
import { Card, NavBar }             from '../../components/';

class Places extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const places = require("../../../assets/jsons/placelist.json");

        return (
            <View style={{ flex: 1 }}>
                <NavBar showBackIcon={ false } />
                <ScrollView style={{ flex: 1 }}>
                    { places.map((item) => {
                        return (
                            <Card
                                key={ "place_list_"+item.id }
                                onPress={ () => Actions.single({ entityID: item.id }) }
                                image={ item.image }
                                style={{ marginHorizontal: 10, height: 220 }}
                                title={ item.name }
                                subtitle={ item.description }
                            />
                        )
                    }) }
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        counter: state.general.openAppCounter,
        user: state.user.user
    }
}

export default connect(mapStateToProps)(Places);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#EAEAEA"
    }
});
