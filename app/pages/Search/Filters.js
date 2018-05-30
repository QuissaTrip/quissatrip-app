import React, { Component }     from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    Dimensions,
    TouchableOpacity,
}                                    from 'react-native';
import { connect }                   from 'react-redux';
import { Actions }                   from 'react-native-router-flux';
import DateTimePicker                from 'react-native-modal-datetime-picker';
import CheckBox                      from 'react-native-check-box';
import SimpleIcons                   from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons                     from 'react-native-vector-icons/EvilIcons';
import { searchOnAPI }               from '../../actions/search';
import { Card, NavBar, SearchInput } from '../../components/';

const { height, width } = Dimensions.get('window');
const iconSize = 30;
const checked = <Image source={ require("../../../assets/checked.png") } style={{ height: iconSize, width: iconSize }}/>;
const unChecked = <Image source={ require("../../../assets/unchecked.png") } style={{ height: iconSize, width: iconSize }}/>;

class Filters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showClosePicker: false,
            showOpenPicker: false,
            filters: {
                type: null, // ["is_place", "is_commerce", "is_event"]
                circuit: null, // circuit_id
                open: null, //[14-51]
                close: null
            }
        }
    }

    formatTime = (date) => {
        let minutes = date.getMinutes();
        minutes = (minutes < 10) ? "0" + minutes : minutes;

        let hour = date.getHours();
        hour = (hour < 10) ? "0" + hour : hour;
        return hour + ":" + minutes;
    }

    renderCheckbox = (name, text) => {
        const { type } = this.state;
        return (
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", width: "50%" }}>
                <CheckBox
                    onClick={ () => this.setState({ type: (type == name) ? null : name }) }
                    isChecked={(type == name)}
                    checkedImage={ checked }
                    unCheckedImage={ unChecked }
                />
                <Text style={ styles.checkBoxText }>{ text }</Text>
            </View>
        )
    }

    renderCircuits = (id, text) => {
        const { circuit } = this.state;
        return (
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", width: "50%" }}>
                <CheckBox
                    onClick={ () => this.setState({ circuit: (circuit == id) ? null : id }) }
                    isChecked={(circuit == id)}
                    checkedImage={ checked }
                    unCheckedImage={ unChecked }
                />
                <Text style={ styles.checkBoxText }>{ text }</Text>
            </View>
        )
    }

    render() {
        const { filters } = this.props;
        const { showOpenPicker, showClosePicker } = this.state;

        console.log(showOpenPicker, showClosePicker);

        return (
            <View style={{ flex: 1 }}>
                <NavBar page="Filtros" showRightIcon={ false }/>
                <ScrollView style={{ backgroundColor: "#FFF", height: "100%" }}>
                    <View style={ styles.container }>
                        <View>
                            <Text style={ styles.title }>Tipo de conteúdo da pesquisa</Text>
                            <View style={ styles.typeContainer }>
                                { this.renderCheckbox("is_place", "Ponto Turístico") }
                                { this.renderCheckbox("is_commerce", "Comércio") }
                            </View>
                            <View style={ styles.typeContainer }>
                                { this.renderCheckbox("is_event", "Evento") }
                            </View>
                        </View>

                        <View style={ styles.divider }/>

                        <View>
                            <Text style={[ styles.title, { marginVertical: 25, marginBottom: 25 }]}>Horários</Text>
                            <View style={[ styles.typeContainer, { marginTop: 0 }]}>
                                {/* Open Time */}
                                <DateTimePicker
                                    mode="time"
                                    isVisible={ showOpenPicker }
                                    onConfirm={(data) => {
                                        let _filters = filters;
                                        _filters.open = this.formatTime(data);
                                        this.setState({ filters: _filters, showOpenPicker: false });
                                    }}
                                    onCancel={() => this.setState({ showOpenPicker: false })}
                                />
                                <TouchableOpacity onPress={ () => this.setState({ showOpenPicker: true }) }>
                                    <Text style={ styles.text }>Início</Text>
                                    <Text style={ styles.time }>{ (filters.open == null) ? "00:00" : filters.open }</Text>
                                </TouchableOpacity>

                                {/* Close Time */}
                                <DateTimePicker
                                    mode="time"
                                    isVisible={ showClosePicker }
                                    onConfirm={(data) => {
                                        let _filters = filters;
                                        _filters.close = this.formatTime(data);
                                        this.setState({ filters: _filters, showClosePicker: false });
                                    }}
                                    onCancel={() => this.setState({ showClosePicker: false })}
                                />
                                <TouchableOpacity onPress={ () => this.setState({ showClosePicker: true }) }>
                                    <Text style={ styles.text }>Fim</Text>
                                    <Text style={ styles.time }>{ (filters.close == null) ? "00:00" : filters.close }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={ styles.divider }/>

                        <View style={{ marginTop: 10, paddingBottom: 10 }}>
                            <Text style={ styles.title }>Circuitos Turísticos</Text>
                            <View style={ styles.typeContainer }>
                                { this.renderCircuits(1, "Étnico") }
                                { this.renderCircuits(2, "Ecológico") }
                            </View>
                            <View style={ styles.typeContainer }>
                                { this.renderCircuits(3, "Histórico") }
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        filters: state.search.filters,
    }
}

export default connect(mapStateToProps)(Filters);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    divider: {
        height: 1,
        marginTop: 30,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.1)"
    },
    title: {
        fontFamily: "OpenSans-Regular",
        fontSize: 18,
        marginVertical: 10,
        color: "rgba(0,0,0,0.8)"
    },
    typeContainer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
        width: "100%"
    },
    checkBoxText: {
        fontFamily: "OpenSans-Regular",
        fontSize: 15,
        marginLeft: 5,
        color: "rgba(0,0,0,0.5)"
    },
    time: {
        fontFamily: "OpenSans-Regular",
        fontSize: 16,
        color: "rgba(255,255,255,0.8)",
        backgroundColor: "rgba(0,0,0,0.3)",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 200,
        width: (width/2)-40,
        textAlign: "center"
    },
    text: {
        alignSelf: "center",
        fontFamily: "OpenSans-Regular",
        fontSize: 16,
        color: "rgba(0,0,0,0.6)",
        marginBottom: 7,
    }
});
