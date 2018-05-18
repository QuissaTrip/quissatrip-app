import React, { Component }                     from 'react';
import { Scene, Router, Actions, ActionConst }  from 'react-native-router-flux';
import {
    View,
    Text,
    StyleSheet
}                                   from 'react-native';
import { connect }                  from 'react-redux';
import { addCounter }               from '../actions';
import {
    WelcomePage,
    Principal,
    Single
}                                   from './';

class QuissaTrip extends Component {
    constructor(props) {
        super(props);
    }

    render() {  //  <WelcomePage/>
        return (
            <Router>
                <Scene key="root">
                    <Scene key="principal" component={ Principal } initial={true} hideNavBar={ true }/>
                    <Scene key="welcomePage" component={ WelcomePage } hideNavBar={ true }/>
                    <Scene key="single" component={ Single } hideNavBar={ true }/>

                    {/*<Scene key="loginPage" component={Login}/>
                    <Scene key="registerPage" component={Register}/>*/}
                </Scene>
            </Router>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        counter: state.general.openAppCounter,
        user: state.user.user
    }
}

export default connect(mapStateToProps)(QuissaTrip);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
