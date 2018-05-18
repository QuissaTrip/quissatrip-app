import React, { Component }             from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet
}                                       from 'react-native';
import { Actions, ActionConst }         from 'react-native-router-flux';
import BottomNavigation, { IconTab }    from 'react-native-material-bottom-navigation';
import Icon                             from 'react-native-vector-icons/EvilIcons';
import { connect }                      from 'react-redux';
import { addCounter }                   from '../actions';
import { Places, Events, Commerces }    from './PrincipalTabs/';

class Principal extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
        {
          key: 'commerce',
          icon: 'cart',
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

    render() {
        const { activeTab } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <StatusBar  backgroundColor="#EAEAEA" barStyle="dark-content"/>
                <View style={{ flex: 1 }}>
                    {(activeTab.key == "places") && (
                        <Places/>
                    )}
                    {(activeTab.key == "events") && (
                        <Events/>
                    )}
                    {(activeTab.key == "commerce") && (
                        <Commerces/>
                    )}
                </View>
                <BottomNavigation
                    onTabPress={ activeTab => this.setState({ activeTab: activeTab }) }
                    renderTab={ this.renderTab }
                    tabs={this.tabs}
                />
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
