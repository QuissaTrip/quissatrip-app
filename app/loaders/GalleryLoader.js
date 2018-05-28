import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    FlatList
}               from 'react-native';
import Shimmer  from 'react-native-shimmer';
const { height, width } = Dimensions.get('window');

export default class GalleryLoader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        return (
            <FlatList
                numColumns={3}
                data={ rows }
                keyExtractor={(item, index) => "gallery_loader_" + index}
                renderItem={ () => (
                    <Shimmer>
                        <View style={ styles.card }/>
                    </Shimmer>
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#FFF",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    card: {
        width: width/3,
        height: width/3,
        backgroundColor: "#ededed",

        borderColor: "rgba(0,0,0,0.05)",
        borderWidth: 1,
    }
});
