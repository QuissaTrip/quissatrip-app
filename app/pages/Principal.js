import React, { Component }             from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet
}                                       from 'react-native';
import { Actions }                      from 'react-native-router-flux';
import BottomNavigation, { IconTab }    from 'react-native-material-bottom-navigation';
import Icon                             from 'react-native-vector-icons/EvilIcons';
import { connect }                      from 'react-redux';
import { Places, Events, Rolezinho }    from './PrincipalTabs/';
import MenuPage                         from './MenuPage.js';

class Principal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
            activeTab: {
                key: 'places',
                icon: 'compass',
                barColor: '#FFF',
                pressColor: 'rgba(0, 0, 0, 0.05)'
            },
        }
    }

    tabs = [
        {
          key: 'events',
          icon: 'calendar',
          barColor: '#FFF',
          pressColor: 'rgba(0, 0, 0, 0.05)'
        },
        {
          key: 'places',
          icon: 'location',
          barColor: '#FFF',
          pressColor: 'rgba(0, 0, 0, 0.05)'
        },
        /*{
          key: 'commerce',
          icon: 'cart',
          barColor: '#FFF',
          pressColor: 'rgba(0, 0, 0, 0.05)'
        },*/
        {
          key: 'rolezinho',
          icon: 'camera',
          barColor: '#FFF',
          pressColor: 'rgba(0, 0, 0, 0.05)'
        },
        {
          key: 'menu',
          icon: 'navicon',
          barColor: '#FFF',
          pressColor: 'rgba(0, 0, 0, 0.05)'
        }
    ]

    renderTab = ({ tab, isActive }, iconSize=30) => (
        <IconTab
            isActive={(this.state.activeTab.key == tab.key)}
            key={tab.key}
            label={tab.label}
            renderIcon={ () => <Icon size={(tab.icon == "location") ? iconSize-3 : iconSize} color="#777777" name={tab.icon} /> }
        />
    )

    onPressTab = (tab) => {
        if (tab.key == "menu") {
            this.setState({ showMenu: true })
        } else {
            this.setState({ activeTab: tab });
        }
    }

    closeMenu = () => {
        this.setState({ showMenu: false });
    }

    render() {
        const { activeTab, showMenu } = this.state;

        return (
            <View style={{ flex: 1 }}>
                {(showMenu == true) && (
                    <MenuPage closeMenu={() => this.closeMenu() }/>
                )}
                <StatusBar  backgroundColor="#EAEAEA" barStyle="dark-content"/>
                <View style={{ flex: 1 }}>
                    {(activeTab.key == "places") && (
                        <Places/>
                    )}
                    {(activeTab.key == "events") && (
                        <Events/>
                    )}
                    {(activeTab.key == "rolezinho") && (
                        <Rolezinho/>
                    )}
                </View>
                <BottomNavigation
                    onTabPress={(activeTab) => this.onPressTab(activeTab)}
                    renderTab={ this.renderTab }
                    tabs={ this.tabs }
                />
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(Principal);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
