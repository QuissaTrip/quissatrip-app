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

class CategoryList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getCategories(this.props.categoryID);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.categoryList !== nextProps.categoryList;
    }

    render() {
        const { categoryList, title } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <NavBar page={ title } />
                <ScrollView style={{ flex: 1 }}>
                    {(typeof categoryList == "undefined" || categoryList.length == 0) ? (
                        <CardList/>
                    ) : (
                        <FlatList
                            data={ categoryList }
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
                    )}
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        categoryList: state.categories.categoryList
    }
}

export default connect(mapStateToProps, { getCategories })(CategoryList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#EAEAEA"
    }
});
