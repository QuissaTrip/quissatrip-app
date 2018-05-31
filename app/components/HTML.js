import React, { Component }     from 'react';
import {
    View,
    Text,
    StyleSheet
}           from 'react-native';
import HTML from 'react-native-render-html';


export default class MyHTML extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { content } = this.props;
        const pStyle = {
            fontSize: 16,
            color: "#666",
            textAlign: "justify",
            fontFamily: "OpenSans-Regular",
            marginTop: 5
        }

        return <HTML html={ content } tagsStyles={{ p: pStyle }} />
    }
}
