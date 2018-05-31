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
import { CardList }                 from '../../loaders';
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
        const { places, hideNavbar } = this.props;

        return (
            <View style={{ flex: 1, backgroundColor: "#FFF" }}>
                {(hideNavbar !== true) && (
                    <NavBar showBackIcon={ false } />
                )}
                <ScrollView style={{ flex: 1 }}>
                    {(places.length == 0) ? (
                        <CardList/>
                    ) : (
                        <FlatList
                            data={ places }
                            keyExtractor={(item, index) => "place_list_" + item.id}
                            initialNumToRender={ 5 }
                            renderItem={({ item }) =>
                                <Card
                                    onPress={ () => Actions.single({ entityID: item.id }) }
                                    image={ item.image }
                                    style={{ marginHorizontal: 10, height: 220 }}
                                    title={ item.name }
                                    subtitle={ item.description }
                                />
                            }
                        />
                    )}
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
