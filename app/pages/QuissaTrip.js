import React, { Component }                     from 'react';
import {
    View,
    Text,
    StyleSheet,
}                   from 'react-native';
import {
    Router,
    Scene,
    Actions,
    Modal,
    ActionConst
}                   from 'react-native-router-flux';
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
                            <Scene key="cityInfo" component={ Pages.CityInfo }/>
                            <Scene key="search" component={ Pages.Search }/>
                            <Scene key="filters" component={ Pages.Filters }/>

                            <Scene key="whereToGo" component={ Pages.WhereToGo }/>
                            <Scene key="moreApps" component={ Pages.MoreApps }/>

                            <Scene key="welcome" component={ Pages.WelcomePage }/>
                            <Scene key="login" component={ Pages.Login }/>
                            <Scene key="register" component={ Pages.Register }/>
                            <Scene key="userProfile" component={ Pages.UserProfile }/>

                            <Scene key="single" component={ Pages.Single }/>

                            <Scene key="categories" component={ Pages.Categories }/>
                            <Scene key="categoryList" component={ Pages.CategoryList }/>

                            <Scene key="commerceCategories" component={ Pages.CommerceCategories }/>
                            <Scene key="commerceList" component={ Pages.CommerceList }/>

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
