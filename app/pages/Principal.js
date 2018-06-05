import React, { Component }             from 'react';
import {
    View,
    Text,
    BackHandler
}                                       from 'react-native';
import { Actions }                      from 'react-native-router-flux';
import BottomNavigation, { IconTab }    from 'react-native-material-bottom-navigation';
import Icon                             from 'react-native-vector-icons/EvilIcons';
import SimpleIcons                      from 'react-native-vector-icons/SimpleLineIcons';
import { connect }                      from 'react-redux';
import { CityInfo, Events, Rolezinho }  from './PrincipalTabs/';
import MenuPage                         from './MenuPage.js';

class Principal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
            activeTab: {
                key: 'cityInfo',
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
          barColor: '#13ad6d',
          pressColor: 'rgba(0, 0, 0, 0.05)'
        },
        {
          key: 'cityInfo',
          icon: 'home',
          barColor: '#13ad6d',
          pressColor: 'rgba(0, 0, 0, 0.05)'
        },
        {
          key: 'rolezinho',
          icon: 'camera',
          barColor: '#13ad6d',
          pressColor: 'rgba(0, 0, 0, 0.05)'
        },
        {
          key: 'menu',
          icon: 'navicon',
          barColor: '#13ad6d',
          pressColor: 'rgba(0, 0, 0, 0.05)'
        }
    ]

    renderTab = ({ tab, isActive }, iconSize=30) => (
        <IconTab
            isActive={(this.state.activeTab.key == tab.key)}
            key={tab.key}
            label={tab.label}
            renderIcon={ () => {
                if (tab.key == "cityInfo") {
                    return <SimpleIcons size={ 19 } color="#FFF" name={tab.icon} />
                } else {
                    return <Icon size={ iconSize } color="#FFF" name={tab.icon} />
                }
            }}
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

    componentWillUpdate() {
        BackHandler.addEventListener("backPress", () => {
            Actions.pop();
            return true;
        });
    }

    render() {
        const { activeTab, showMenu } = this.state;

        return (
            <View style={{ flex: 1 }}>
                {(showMenu == true) && (
                    <MenuPage closeMenu={() => this.closeMenu() }/>
                )}
                <View style={{ flex: 1 }}>
                    {(activeTab.key == "cityInfo") && (
                        <CityInfo/>
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
