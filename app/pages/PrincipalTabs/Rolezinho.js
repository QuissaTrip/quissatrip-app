import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Image
}                                   from 'react-native';
import { Actions }                  from 'react-native-router-flux';
import { connect }                  from 'react-redux';
import { NavBar, RolezinhoCard }    from '../../components/';
import { RolezinhoLoader }          from '../../loaders/';
import { getRolezinhos }            from '../../actions/rolezinhos';

class Rolezinho extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getRolezinhos();
    }

    render() {
        const { rolezinhos } = this.props;

        return (
            <View style={{ flex: 1, backgroundColor: "#FFF" }}>
                <NavBar showRoleIcon page="Rolezinhos" />
                <ScrollView style={{ flex: 1 }} horizontal={ true }>
                    <View style={ styles.container }>
                        {(typeof rolezinhos == "undefined" || rolezinhos == null || rolezinhos.length == 0) ? (
                            <RolezinhoLoader/>
                        ) : (
                            <FlatList
                                data={ rolezinhos }
                                horizontal={ true }
                                keyExtractor={(item, index) => "rolezinho_" + item.id}
                                ItemSeparatorComponent={() => <View style={{ margin: -7 }}/> }
                                renderItem={({ item }) => <RolezinhoCard rolezinho={ item } /> }
                            />
                        )}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        rolezinhos: state.rolezinho.rolezinhos
    }
}

export default connect(mapStateToProps, { getRolezinhos })(Rolezinho);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        fontSize: 22,
        textAlign: "center",
        color: "#000",
        fontFamily: "OpenSans-Regular"
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});
