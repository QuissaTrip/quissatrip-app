import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView
}                                   from 'react-native';
import { Actions }                  from 'react-native-router-flux';
import { connect }                  from 'react-redux';
import { Card, NavBar, Loader }     from '../../components/';
import { getPlaces }                from '../../actions/places';

class Places extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getPlaces();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.places !== nextProps.places;
    }

    render() {
        const { places } = this.props;

        if (places.length == 0) {
            return <Loader/>
        }

        return (
            <View style={{ flex: 1 }}>
                <NavBar showBackIcon={ false } />
                <ScrollView style={{ flex: 1 }}>
                    { places.map((item) => {
                        return (
                            <Card
                                key={ "place_list_"+item.id }
                                onPress={ () => Actions.single({ entityID: item.id }) }
                                image={ item.images }
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
        places: state.entities.places
    }
}

export default connect(mapStateToProps, { getPlaces })(Places);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#EAEAEA"
    }
});
