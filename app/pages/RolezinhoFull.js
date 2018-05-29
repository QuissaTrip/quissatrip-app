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
}                               from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect }              from 'react-redux';
import SimpleIcons              from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons                from 'react-native-vector-icons/EvilIcons';
import ModalSelector            from '../components/ModalSelector';
import { SlideLoader }          from '../components';
import { deleteReportRolezinho }      from '../actions/rolezinhos';

const { height, width } = Dimensions.get('window');
const hitSlop = { top: 30, left: 30, bottom: 30, right: 30 }
const textColor = "rgba(0,0,0,0.7)";

class RolezinhoFull extends Component {
    constructor(props) {
        super(props);
        this.changeLines = this.changeLines.bind(this);

        this.state = {
            numberOfLines: 1
        }
    }

    changeLines = () => {
        if (this.state.numberOfLines == 1) {
            this.setState({ numberOfLines: 40 });
        } else {
            this.setState({ numberOfLines: 1 });
        }
    }

    optionOnPress = (index) => {
        const { user, rolezinho } = this.props;

        switch (index) {
            case 0:
                this.props.deleteReportRolezinho(rolezinho.id, user.id, user.token, "report");
                break;
            case 1:
                alert("Compartilhar rolezinho");
                break;
            case 2:
                this.props.deleteReportRolezinho(rolezinho.id, user.id, user.token);
                Actions.principal({ type: ActionConst.REPLACE });
                break;
        }
    }

    renderOptions = (index = 0) => {
        const { user } = this.props.rolezinho;
        const my_user = this.props.user;
        let data = [
            { key: 0, label: 'Denunciar Rolezinho' },
            { key: 1, label: 'Compartilhar' }
        ];

        if (my_user.id == user.id) {
            data.push({
                key: 2, label: 'Excluir'
            })
        }

        return (
            <ModalSelector
                selectStyle={{ borderWidth: 0 }}
                data={ data }
                initValue={ <SimpleIcons name="options-vertical" size={ 22 } color="#FFF"/> }
                onChange={ (option)=> this.optionOnPress(option.key) }

                sectionStyle={{ marginHorizontal: 0, borderBottomColor: textColor, marginHorizontal: 20 }}
                sectionTextStyle={{ color: textColor }}

                optionContainerStyle={{ backgroundColor: '#FFF' }}
                optionTextStyle={{ color: textColor }}
                optionStyle={{ padding: 20, borderBottomWidth: 0 }}
                cancelStyle={{ backgroundColor: '#FFF', padding: 20 }}
                cancelText="Cancelar"
            />
        )
    }

    render() {
        const { media, user, text } = this.props.rolezinho;
        const { numberOfLines } = this.state;

        return (
            <View style={ styles.container }>
                <StatusBar animated showHideTransition="slide" backgroundColor="#000"  barStyle="light-content"/>
                <SlideLoader/>
                <View style={ styles.topBar }>
                    { this.renderOptions() }
                    <TouchableOpacity hitSlop={ hitSlop } onPress={ () => Actions.pop() }>
                        <EvilIcons name="close" size={ 37 } color="#FFF"/>
                    </TouchableOpacity>
                </View>
                <Image
                    style={ styles.media }
                    source={{ uri: media }}
                />
                {(typeof text !== "undefined" && text !== "" && text !== null) && (
                    <View style={ styles.bottomBar }>
                        <View style={ styles.avatarContainer }>
                            <Image source={{ uri: user.avatar }} style={ styles.avatar }/>
                        </View>
                        <TouchableOpacity onPress={ this.changeLines } activeOpacity={ 0.7 } style={ styles.textContainer }>
                            <Text numberOfLines={ numberOfLines } style={ styles.text }>{ text }</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps, { deleteReportRolezinho })(RolezinhoFull);

const avatarSize = 40;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",
        height: "100%",
        paddingTop: 25
    },
    media: {
        flex: 1,
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
    bottomBar: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 10,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
    },
        avatarContainer: {
            backgroundColor: "#FFF",
            width: avatarSize,
            height: avatarSize,
            borderRadius: (avatarSize/2),
            justifyContent: "center",
            alignItems: "center"
        },
            avatar: {
                width: avatarSize-3,
                height: avatarSize-3,
                borderRadius: (avatarSize-5/2)
            },
        textContainer: {
            width: "85%",
        },
            text: {
                fontFamily: "OpenSans-Regular",
                fontSize: 16,
                color: "#FFF",
            },
});
