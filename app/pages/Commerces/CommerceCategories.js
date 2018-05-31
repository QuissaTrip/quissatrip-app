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
import { NavBar, Card }             from '../../components/';
import { getCommerceCategories }    from '../../actions/commerces';

class CommerceCategories extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getCommerceCategories();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.categories !== nextProps.categories;
    }

    render() {
        const { categories } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <NavBar page="Serviços" />
                <ScrollView style={{ flex: 1 }}>
                    {(typeof categories == "undefined" || categories.length == 0) ? (
                        <CardList/>
                    ) : (
                        <FlatList
                            data={ categories }
                            keyExtractor={(item, index) => "circuit_list_" + index}
                            renderItem={ ({ item }) =>
                                <Card
                                    onPress={ () => Actions.commerceList({ categoryID: item.id, titlePage: item.name }) }
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
        categories: state.commerce.categories
    }
}

export default connect(mapStateToProps, { getCommerceCategories })(CommerceCategories);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#EAEAEA"
    }
});
