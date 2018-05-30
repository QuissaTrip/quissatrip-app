import React, { Component }     from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity
}                       from 'react-native';
import { connect }      from 'react-redux';
import { Actions }      from 'react-native-router-flux';
import SimpleIcons      from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons        from 'react-native-vector-icons/EvilIcons';
import { searchOnAPI }  from '../../actions/search';

const { height, width } = Dimensions.get('window');

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.clearQuery = this.clearQuery.bind(this);

        const { query } = props;

        this.state = {
            query: (typeof query == "undefined") ? "" : query,
        }
    }

    timer = null;

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    clearQuery = () => {
        this.setState({ query: "" });
        clearTimeout(this.timer);
    }

    setQuery = (query) => {
        const { onChange } = this.props;
        this.setState({ query });

        if (typeof onChange !== "undefined") {
            onChange(query);
        }

        // Delay para dar tempo do usuário termina a pesquisa antes de requisitar para a API
        this.timer = setTimeout(() =>
            this.props.searchOnAPI(query),
        1500);
    }
    render() {
        const { query } = this.state;

        return (
            <View style={ styles.inputContainer }>
                <TouchableOpacity onPress={() => Actions.filters()} style={ styles.inputIcon }>
                    <SimpleIcons name="equalizer" size={ 20 } color="#666"/>
                </TouchableOpacity>
                <TextInput
                    fontFamily="OpenSans-Regular"
                    placeholder="Pesquise aqui"
                    style={ styles.input }
                    onChangeText={ (query) => this.setQuery(query) }
                    value={ query }
                    underlineColorAndroid="transparent"
                />
                {(query.length == 0) ? (
                    <View style={ styles.inputIcon }>
                        <SimpleIcons name="magnifier" size={ 20 } color="#666"/>
                    </View>
                ) : (
                    <TouchableOpacity onPress={ this.clearQuery } style={ styles.inputIcon }>
                        <EvilIcons name="close" size={ 25 } color="#666"/>
                    </TouchableOpacity>
                )}
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        filters: state.search.filters,
    }
}

export default connect(mapStateToProps, { searchOnAPI })(SearchInput);

const styles = StyleSheet.create({
    inputContainer: {
        width: width-24,
        backgroundColor: "#FFF",
        margin: 12,
        marginBottom: 2,
        elevation: 2,
        borderWidth: 0.1,
        borderColor: "rgba(0,0,0,0.1)",
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
        input: {
            backgroundColor: "#FFF",
            width: "70%"
        },
            inputIcon: {
                width: "15%",
                justifyContent: 'center',
                alignItems: 'center',
            },
});
