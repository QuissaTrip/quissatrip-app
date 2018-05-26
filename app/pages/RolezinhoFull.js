import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
    Modal
}                       from 'react-native';
import { Actions }      from 'react-native-router-flux';
import SimpleIcons      from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons        from 'react-native-vector-icons/EvilIcons';
import ModalSelector    from '../components/ModalSelector';

const { height, width } = Dimensions.get('window');
const hitSlop = { top: 30, left: 30, bottom: 30, right: 30 }
const textColor = "rgba(0,0,0,0.7)";

export default class RolezinhoFull extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let index = 0;
        const { url } = this.props;
        const data = [
            { key: index++, label: 'Denunciar Rolezinho' },
            { key: index++, label: 'Compartilhar' }
        ];

        return (
            <View style={ styles.container }>
                <StatusBar animated showHideTransition="slide" backgroundColor="#000"  barStyle="light-content"/>

                <View style={ styles.topBar }>
                    <ModalSelector
                        selectStyle={{ borderWidth: 0 }}
                        data={ data }
                        initValue={ <SimpleIcons name="options-vertical" size={ 22 } color="#FFF"/> }
                        onChange={ (option)=> console.log(option) }

                        sectionStyle={{ marginHorizontal: 0, borderBottomColor: textColor, marginHorizontal: 20 }}
                        sectionTextStyle={{ color: textColor }}

                        optionContainerStyle={{ backgroundColor: '#FFF' }}
                        optionTextStyle={{ color: textColor }}
                        optionStyle={{ padding: 20, borderBottomWidth: 0 }}
                        cancelStyle={{ backgroundColor: '#FFF', padding: 20 }}
                        cancelText="Cancelar"
                    />
                    <TouchableOpacity hitSlop={ hitSlop } onPress={ () => Actions.pop() }>
                        <EvilIcons name="close" size={ 37 } color="#FFF"/>
                    </TouchableOpacity>
                </View>
                <Image
                    style={ styles.image }
                    source={{ uri: url }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 25
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    topBar: {
        width: "100%",
        position: "absolute",
        top: 25,
        right: 0,
        zIndex: 10,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
});
