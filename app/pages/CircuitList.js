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
import { CardList }                 from '../loaders';
import { Card, NavBar, Loader }     from '../components/';
import { getPlaces }                from '../actions/places';
import request                      from "../common/request";

class CircuitList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "..."
        }
    }

    componentDidMount() {
        const { circuitID } = this.props;
        request({
            url: "/circuit/" + circuitID,
            method: "GET",
        }).then(response => this.setState({ title: response.name }))
    }

    componentWillMount() {
        this.props.getPlaces(this.props.circuitID);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.title !== nextState.title;
    }

    render() {
        const { circuits } = this.props;
        const { title } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <NavBar page={ title } />
                <ScrollView style={{ flex: 1 }}>
                    {(typeof circuits == "undefined" || circuits.length == 0) ? (
                        <CardList/>
                    ) : (
                        circuits.map((item) => {
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
                        })
                    )}
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        circuits: state.entities.circuits
    }
}

export default connect(mapStateToProps, { getPlaces })(CircuitList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#EAEAEA"
    }
});
