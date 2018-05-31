import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions
}                  from 'react-native';
import { Actions } from 'react-native-router-flux';

const screenWidth = Dimensions.get('window').width;
const inch = screenWidth/800;

export default class SlideLoader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0
        }
    }

    timer = null;

    setWidth = () => {
        let newWidth = this.state.width + inch;
        if (this.props.pause === true) {
            newWidth = this.state.width;
        }

        if (newWidth <= screenWidth) {
            this.timer = setTimeout(() => {
                this.setState({ width: newWidth });
                this.setWidth();
            }, 0.1);
        } else {
            clearTimeout(this.timer);
            Actions.pop();
        }
    }

    componentDidMount() {
        this.setWidth()
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={[ styles.animatedBar, { width: this.state.width }]}/>
        )
    }
}

const styles = StyleSheet.create({
    animatedBar: {
        position: "absolute",
        top: 24,
        left: 0,
        height: 2,
        backgroundColor: "#FFF",
        elevation: 20,
        zIndex: 100,
        width: 0
    },
});
