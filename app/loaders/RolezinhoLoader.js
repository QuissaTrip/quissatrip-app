import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    ActivityIndicator,
    FlatList
}               from 'react-native';
import Shimmer  from 'react-native-shimmer';

const { height, width } = Dimensions.get('window');
const radius = 8;

export default class RolezinhoLoader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const rows = [1, 2, 3];
        return (
            <View style={ styles.container }>
                <FlatList
                    data={ rows }
                    horizontal={ true }
                    keyExtractor={(item, index) => "rolezinho_loader_" + index}
                    ItemSeparatorComponent={() => <View style={{ width: 15 }}/> }
                    renderItem={({ item }) =>
                        <Shimmer>
                            <View style={ styles.card }>
                                <ActivityIndicator style={{ top: -80 }} size={ 60 } color="#a3a3a3" />
                                <View style={ styles.avatarContainer }>
                                    <View style={ styles.avatar }/>
                                </View>
                                <View style={ styles.content }>
                                    <Text numberOfLines={ 1 } style={ styles.text }>{ " " }</Text>
                                </View>
                            </View>
                        </Shimmer>
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 15
    },
    card: {
        width: width-60,
        height: "100%",
        backgroundColor: "#e2e2e2",
        borderRadius: radius,
        elevation: 1,
        justifyContent: "flex-end"
    },

    content: {
        backgroundColor: "rgba(0,0,0,0.1)",
        width: "100%",
        padding: 20,
        paddingTop: 35,
        justifyContent: "center",
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius
    },
        text: {
            fontSize: 14,
            fontFamily: "OpenSans-Regular",
            color: "rgba(0,0,0,0.8)"
        },
    avatarContainer: {
        backgroundColor: "#FFF",
        width: 50,
        height: 50,
        padding: 6,
        borderRadius: (50/2),
        left: 10,
        bottom: -25,
        elevation: 5,
        zIndex: 100,
        justifyContent: "center",
        alignItems: "center"
    },
        avatar: {
            width: 45,
            height: 45,
            borderRadius: (45/2)
        },
});
