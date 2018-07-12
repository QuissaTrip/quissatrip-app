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
import { connect }          from 'react-redux';
import { NavBar, MyHTML }   from '../../components/';

const { height, width } = Dimensions.get('window');

class CityInfo extends Component {
    constructor(props) {
        super(props);
    }

    renderImages = (singleImage = true) => {
        const { fullText } = this.props;
        const brasao = require("../../../assets/brasao.png");
        const images = [
            require("../../../assets/city/1.jpg"),
            require("../../../assets/city/2.jpg"),
            require("../../../assets/city/3.jpg"),
            require("../../../assets/city/4.jpg"),
            require("../../../assets/city/5.jpg")
        ];

        if (fullText !== true) {
            return (
                <TouchableOpacity activeOpacity={ 0.85 } key={ "welcome_images_home" } style={ styles.brasaoContainer } onPress={ () => Actions.imageFullScreen({ require: brasao }) }>
                    <Image style={ styles.image } source={ brasao }/>
                </TouchableOpacity>
            )
        }

        return (
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
        )
    }

    render() {
        const { fullText } = this.props;
        const city = this.props.cityInfo;
        
        return (
            <View style={{ flex: 1 }}>
                <NavBar page="QuissaTrip" showBackIcon={(fullText == true)} />
                <ScrollView style={{ flex: 1 }}>
                    <View style={ styles.container }>
                        <View style={{ flex: 1 }}>
                            <Text style={ styles.welcome }>{ city.title }</Text>
                            {(fullText == true) ? (
                                <Text style={ styles.subtitle }>Saiba mais sobre a história da cidade</Text>
                            ) : (
                                <Text style={ styles.subtitle }>{ city.subtitle }</Text>
                            )}
                        </View>

                        <View style={{ flex: 1, width: width, marginTop: 0 }}>
                            {(fullText !== true) && (
                                this.renderImages()
                            )}
                            <View style={{ padding: 20 }}>
                                <MyHTML content={(fullText == true) ? city.text : city.simple } />
                            </View>
                            {(fullText === true) && (
                                this.renderImages()
                            )}
                        </View>

                        <Text style={ styles.text }>Aplicativo desenvolvido por <Text style={ styles.link } onPress={() => alert("opa")}>Enterprise Solutions</Text></Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        cityInfo: state.general.cityInfo
    }
}

export default connect(mapStateToProps)(CityInfo);

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
    text: {
        fontFamily: "OpenSans-Regular",
        fontSize: 15,
        color: "rgba(0,0,0,0.6)",
        marginTop: 35,
        textAlign: "left",
    },
        link: {
            color: "blue"
        },
    brasaoContainer: {
        marginTop: 30,
        width: width-60,
        marginHorizontal: 30,
        height: 200,
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
