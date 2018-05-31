import React, { Component } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    Text
}                           from 'react-native';
import SimpleIcons          from 'react-native-vector-icons/SimpleLineIcons';
import { Places }           from './PrincipalTabs/';
import { NavBar, Loader }   from '../components/';
import request              from "../common/request.js";

const { height, width } = Dimensions.get('window');

export default class MoreApps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loader: true,
            apps: []
        }
    }

    componentWillMount() {
        request({
            url: "/apps",
            method: "GET",
        }).then(response => {
            this.setState({ apps: response, loader: false });
        })
    }

    renderItems = (data) => {
        console.log(data);

        if (data.playstore_url == null) {
            return (
                <View style={ styles.card }>
                    <Text style={ styles.cardTitle }>{ data.city_name }</Text>
                    <SimpleIcons name="clock" size={ 25 } color="#666"/>
                    <Text style={ styles.text }>Aplicativo em desenvolvimento</Text>
                </View>
            )
        }

        /*
        return (
            <TouchableOpacity activeOpacity={ 0.85 } key={ "welcome_images_" + index } style={ styles.imageContainer } onPress={ () => Actions.imageFullScreen({ require: item }) }>
                <Image
                    style={ styles.image }
                    source={ item }
                />
            </TouchableOpacity>
        )
        */
    }

    render() {
        const { apps, loader } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <NavBar page="Veja mais cidades"/>
                <View style={ styles.container }>
                    {(loader == true || typeof apps == "undefined" || apps.length == 0) ? (
                        <Loader/>
                    ) : (
                        <FlatList
                            columnWrapperStyle={{ marginVertical: 15 }}
                            style={{ paddingHorizontal: 10 }}
                            data={ apps }
                            ItemSeparatorComponent={ () => <View style={{ margin: -10 }}/> }
                            keyExtractor={(item, index) => "more_apps_" + index}
                            numColumns={ 2 }
                            renderItem={ ({ item }) => this.renderItems(item) }
                        />
                    )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
    },
    card: {
        backgroundColor: "#FFF",
        elevation: 2,
        height: 190,
        width: (width-56)/2,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin: 8,
    },
        cardTitle: {
            fontSize: 17,
            color: "rgba(0,0,0,0.7)",
            fontFamily: "OpenSans-Regular",
            textAlign: "center",
            marginBottom: 15
        },
        text: {
            fontSize: 15,
            fontFamily: "OpenSans-Regular",
            textAlign: "center",
            marginTop: 15
        }
});
