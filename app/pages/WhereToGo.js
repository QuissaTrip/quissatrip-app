import React, { Component } from 'react';
import { View }     from 'react-native';
import { Places }   from './PrincipalTabs/';
import { NavBar }   from '../components/';

export default class WhereToGo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavBar page="O que visitar"/>
                <Places hideNavbar/>
            </View>
        )
    }
}
