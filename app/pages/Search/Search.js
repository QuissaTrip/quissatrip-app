import React, { Component }     from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    FlatList
}                                    from 'react-native';
import { connect }                   from 'react-redux';
import { Actions }                   from 'react-native-router-flux';
import SimpleIcons                   from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons                     from 'react-native-vector-icons/EvilIcons';
import { searchOnAPI }               from '../../actions/search';
import { Card, NavBar, SearchInput } from '../../components/';

const { height, width } = Dimensions.get('window');

class Search extends Component {
    constructor(props) {
        super(props);
        this.renderHeader = this.renderHeader.bind(this);

        this.state = {
            query: ""
        }
    }

    renderHeader = () => {
        return (
            <SearchInput
                query={ this.state.query }
                onChange={(query) => this.setState({ query })}
            />
        )
    }

    render() {
        const { search } = this.props;

        return (
            <View>
                <NavBar page="Pesquisa" showRightIcon={ false }/>
                <ScrollView keyboardShouldPersistTaps="always" style={{ backgroundColor: "#FFF" }}>
                    <View style={ styles.container }>
                        <View style={{ width: width, paddingBottom: 80 }}>
                            <FlatList
                                data={ search }
                                ListHeaderComponent={ this.renderHeader }
                                keyExtractor={(item, index) => "search_" + item.id + index}
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
                        </View>
                        {(search !== null && search.length == 0) && (
                            <View style={{ flex: 0.6, justifyContent: "center" }}>
                                <Text style={ styles.searchSomething }>Não existem resultados a serem exibidos</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        search: state.search.search,
    }
}

export default connect(mapStateToProps, { searchOnAPI })(Search);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    searchSomething: {
        fontFamily: "OpenSans-Regular",
        fontSize: 22,
        padding: 20,
        textAlign: "center"
    }
});
