import React, { Component }             from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Dimensions
}                           from 'react-native';
import { Actions }          from 'react-native-router-flux';
import { NavBar, MyHTML }   from '../../components/';

const { height, width } = Dimensions.get('window');

export default class Principal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const city = require("../../../assets/city/content.json");
        const images = [
            require("../../../assets/city/1.jpg"),
            require("../../../assets/city/2.jpg"),
            require("../../../assets/city/3.jpg"),
            require("../../../assets/city/4.jpg"),
            require("../../../assets/city/5.jpg")
        ]
        return (
            <View style={{ flex: 1 }}>
                <NavBar page="QuissaTrip" showBackIcon={ false } />
                <ScrollView style={{ flex: 1 }}>
                    <View style={ styles.container }>
                        <Text style={ styles.welcome }>{ city.title }</Text>
                        <Text style={ styles.subtitle }>{ city.subtitle }</Text>

                        <View style={{ flex: 1, width: width, marginTop: 0 }}>

                            <FlatList
                                horizontal={ true }
                                showsHorizontalScrollIndicator={ false }
                                data={ images }
                                keyExtractor={(item, index) => "welcome_images_" + index}
                                ItemSeparatorComponent={ () => <View style={{ margin: -4 }}/> }
                                renderItem={ ({ item, index }) =>
                                    <TouchableOpacity activeOpacity={ 0.85 } key={ "welcome_images_" + index } style={ styles.imageContainer } onPress={ () => Actions.imageFullScreen({ require: item }) }>
                                        <Image
                                            style={ styles.image }
                                            source={ item }
                                        />
                                    </TouchableOpacity>
                                }
                            />

                            <View style={{ padding: 20 }}>
                                <MyHTML content={ city.text } />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        paddingTop: 30
    },
    welcome: {
        fontFamily: "OpenSans-Regular",
        fontSize: 30,
        color: "rgba(0,0,0,0.8)",
        textAlign: "center"
    },
    subtitle: {
        fontFamily: "OpenSans-Regular",
        fontSize: 19,
        color: "rgba(0,0,0,0.6)",
        paddingHorizontal: 30,
        marginTop: 7,
        textAlign: "center"
    },
    imageContainer: {
        marginTop: 30,
        width: width-30,
        height: 250,
        marginHorizontal: 8,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "rgba(0,0,0,0.4)"
    },
        image: {
            width: "100%",
            height: "100%",
            resizeMode: "cover",
        },
});
