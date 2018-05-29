import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView
}                       from 'react-native';
import { Actions }      from 'react-native-router-flux';
import { connect }      from 'react-redux';
import { CardList }     from '../../loaders';
import { NavBar, Card } from '../../components/';
import { getCircuits }  from '../../actions';

class Circuits extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getCircuits();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.circuits !== nextProps.circuits;
    }

    render() {
        const { circuits } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <NavBar page="Circuitos" />
                <ScrollView style={{ flex: 1 }}>
                    {(typeof circuits == "undefined" || circuits.length == 0) ? (
                        <CardList/>
                    ) : (
                        <FlatList
                            data={ circuits }
                            keyExtractor={(item, index) => "circuit_list_" + index}
                            renderItem={ ({ item }) =>
                                <Card
                                    onPress={ () => Actions.circuitList({ circuitID: item.id }) }
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
        circuits: state.general.circuits
    }
}

export default connect(mapStateToProps, { getCircuits })(Circuits);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#EAEAEA"
    }
});
