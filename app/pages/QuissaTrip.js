import React, { Component }                     from 'react';
import {
    Router,
    Scene,
    Actions,
    Modal,
    ActionConst
}                   from 'react-native-router-flux';
import {
    View,
    Text,
    StyleSheet
}                   from 'react-native';
import { connect }  from 'react-redux';
import * as Pages   from './';

class QuissaTrip extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Router cardStyle={{ backgroundColor: "#FFF" }}>
                    <Modal hideNavBar hideTabBar transparent={true}>
                        <Scene key="root" hideNavBar hideTabBar>
                            <Scene key="principal" component={ Pages.Principal } initial={true}/>
                            <Scene key="welcome" component={ Pages.WelcomePage }/>

                            <Scene key="login" component={ Pages.Login }/>
                            <Scene key="register" component={ Pages.Register }/>

                            <Scene key="single" component={ Pages.Single }/>
                            <Scene key="circuitList" component={ Pages.CircuitList }/>

                            <Scene key="gallery" component={ Pages.Gallery }/>
                            <Scene key="selectedMedia" component={ Pages.SelectedMedia }/>
                        </Scene>
                        <Scene key="imageFullScreen" component={ Pages.ImageFullScreen }/>
                        <Scene key="rolezinhoFull" component={ Pages.RolezinhoFull }/>
                    </Modal>
                </Router>
            </View>
        )
    }
}

export default connect(null)(QuissaTrip);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
