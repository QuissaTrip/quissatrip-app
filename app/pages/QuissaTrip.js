import React, { Component }     from 'react';
import {
    View,
    Text,
    StyleSheet
}                               from 'react-native';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';
import { addCounter }            from '../actions';

class QuissaTrip extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.addCounter();
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
    }
}

export default connect(mapStateToProps, { addCounter })(QuissaTrip);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
