import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Dimensions
}                                   from 'react-native';
import { Actions }                  from 'react-native-router-flux';
import { connect }                  from 'react-redux';
import { CardList }                 from '../../loaders';
import { NavBar, Card, SadMessage } from '../../components/';
import { getCommerces }             from '../../actions/commerces';

const { height, width } = Dimensions.get('window');

class CommerceList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getCommerces(this.props.categoryID);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.commerces !== nextProps.commerces;
    }

    render() {
        const { commerces, titlePage } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <NavBar page={ titlePage } />
                <ScrollView>
                    {(typeof commerces == "undefined") ? (
                        <CardList/>
                    ) : (
                        (commerces.length == 0) ? (
                            <View style={{ flex: 1, height: height-80, justifyContent: "center" }}>
                                <SadMessage firstLine="Não existem comércios" secondLine="Cadastrados ainda" />
                            </View>
                        ) : (
                            <FlatList
                                data={ commerces }
                                keyExtractor={(item, index) => "circuit_list_" + index}
                                renderItem={ ({ item }) =>
                                    <Card
                                        onPress={ () => Actions.single({ entityID: item.id }) }
                                        image={ item.image }
                                        style={{ marginHorizontal: 10, height: 220 }}
                                        title={ item.name }
                                        subtitle={ item.description }
                                    />
                                }
                            />
                        )
                    )}
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        commerces: state.commerce.commerces
    }
}

export default connect(mapStateToProps, { getCommerces })(CommerceList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#EAEAEA"
    }
});
