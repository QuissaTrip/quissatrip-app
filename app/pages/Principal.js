import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet
}                                   from 'react-native';
import { Actions, ActionConst }     from 'react-native-router-flux';
import { connect }                  from 'react-redux';
import { addCounter }               from '../actions';

class Principal extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.user.id === null) {
            //Actions.welcomePage({ type: ActionConst.REPLACE });
            Actions.welcomePage()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Esse app foi aberto { this.props.counter }</Text>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        counter: state.general.openAppCounter,
        user: state.user.user
    }
}

export default connect(mapStateToProps, { addCounter })(Principal);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
