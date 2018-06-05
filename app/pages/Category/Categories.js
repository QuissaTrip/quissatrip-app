import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView
}                           from 'react-native';
import { Actions }          from 'react-native-router-flux';
import { connect }          from 'react-redux';
import { CardList }         from '../../loaders';
import { NavBar, Card }     from '../../components/';
import { getCategories }    from '../../actions';

class Categories extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getCategories();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.categories !== nextProps.categories;
    }

    render() {
        const { categories } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <NavBar page="Categorias" />
                <ScrollView style={{ flex: 1 }}>
                    {(typeof categories == "undefined" || categories.length == 0) ? (
                        <CardList/>
                    ) : (
                        <FlatList
                            data={ categories }
                            keyExtractor={(item, index) => "category_list_" + index}
                            renderItem={ ({ item }) =>
                                <Card
                                    onPress={ () => Actions.categoryList({ categoryID: item.id, title: item.name }) }
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
        categories: state.categories.categories
    }
}

export default connect(mapStateToProps, { getCategories })(Categories);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#EAEAEA"
    }
});
