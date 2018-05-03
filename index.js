import React, { Component } from 'react';
import { AppRegistry }      from 'react-native';
import { Provider }         from 'react-redux';
import { PersistGate }      from 'redux-persist/integration/react'

import { persistor, store } from './app/store';
import QuissaTrip           from './app/pages/QuissaTrip'

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <QuissaTrip />
                </PersistGate>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('QuissaTrip', () => App);
