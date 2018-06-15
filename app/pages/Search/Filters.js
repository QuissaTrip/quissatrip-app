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
}                                       from 'react-native';
import { connect }                      from 'react-redux';
import { Actions }                      from 'react-native-router-flux';
import DateTimePicker                   from 'react-native-modal-datetime-picker';
import CheckBox                         from 'react-native-check-box';
import SimpleIcons                      from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons                        from 'react-native-vector-icons/EvilIcons';
import { ButtonOutline,NavBar,Loader }  from '../../components/';
import { getCategories }                from '../../actions';
import {
    setType,
    setCategory,
    setTime,
    searchOnAPI
} from '../../actions/search';

const { height, width } = Dimensions.get('window');
const iconSize = 30;
const checked = <Image source={ require("../../../assets/checked.png") } style={{ height: iconSize, width: iconSize }}/>;
const unChecked = <Image source={ require("../../../assets/unchecked.png") } style={{ height: iconSize, width: iconSize }}/>;

class Filters extends Component {
    constructor(props) {
        super(props);
        this.applyFilters = this.applyFilters.bind(this);

        const { filters } = this.props;

        this.state = {
            showClosePicker: false,
            showOpenPicker: false,
            type: filters.type,
            category: filters.category_id,
            open: filters.open,
            close: filters.close
        }
    }

    componentWillMount() {
        this.props.getCategories();
    }

    applyFilters = () => {
        this.props.searchOnAPI(this.props.query);
        Actions.pop();
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
                    onClick={ () => this.handleInputs("type", (type == name) ? null : name) }
                    isChecked={(type == name)}
                    checkedImage={ checked }
                    unCheckedImage={ unChecked }
                />
                <Text style={ styles.checkBoxText }>{ text }</Text>
            </View>
        )
    }

    renderCircuits = (id, text) => {
        const { category } = this.state;
        return (
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", width: "50%" }}>
                <CheckBox
                    onClick={ () => this.handleInputs("category", (category == id) ? null : id) }
                    isChecked={(category == id)}
                    checkedImage={ checked }
                    unCheckedImage={ unChecked }
                />
                <Text style={ styles.checkBoxText }>{ text }</Text>
            </View>
        )
    }

    handleInputs = (type, data) => {
        if(type == "type") {
            this.setState({ type: data });
            this.props.setType(data);
        }
        if (type == "category") {
            this.setState({ category: data });
            this.props.setCategory(data);
        }
        if (type == "time") {
            this.setState(data);

            if (typeof data.open !== "undefined")
                this.props.setTime("open", data.open);
            else
                this.props.setTime("close", data.close);
        }
    }

    renderCategories = () => {
        const { categories } = this.props;
        let content = [];

        for (var i = 0; i < categories.length; i++) {
            content.push(
                <View style={ styles.typeContainer } key={ "category_item_option_" + i }>
                    {(typeof categories[i] !== "undefined") && (
                        this.renderCircuits(categories[i].id, categories[i].name)
                    )}
                    {(typeof categories[i+1] !== "undefined") && (
                        this.renderCircuits(categories[i+1].id, categories[i+1].name)
                    )}
                </View>
            );
            i++;
        }

        return content
    }

    render() {
        const { showOpenPicker, showClosePicker, open, close } = this.state;
        const { categories } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <NavBar page="Filtros" showRightIcon={ false }/>
                {(categories.length < 1) ? (
                    <Loader/>
                ) : (
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ backgroundColor: "#FFF", height: "100%" }}>
                            <View style={ styles.container }>
                                <View>
                                    <Text style={ styles.title }>Tipo de conteúdo da pesquisa</Text>
                                    <View style={ styles.typeContainer }>
                                        { this.renderCheckbox("place", "Ponto Turístico") }
                                        { this.renderCheckbox("commerce", "Comércio") }
                                    </View>
                                    <View style={ styles.typeContainer }>
                                        { this.renderCheckbox("event", "Evento") }
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
                                            onConfirm={(data) => this.handleInputs("time", { open: this.formatTime(data), showOpenPicker: false }) }
                                            onCancel={() => this.handleInputs("time", { open: null, showOpenPicker: false }) }
                                        />
                                        <TouchableOpacity onPress={ () => this.setState({ showOpenPicker: true }) }>
                                            <Text style={ styles.text }>Início</Text>
                                            <Text style={ styles.time }>{ (open == null) ? "--:--" : open }</Text>
                                        </TouchableOpacity>

                                        {/* Close Time */}
                                        <DateTimePicker
                                            mode="time"
                                            isVisible={ showClosePicker }
                                            onConfirm={(data) => this.handleInputs("time", { close: this.formatTime(data), showClosePicker: false }) }
                                            onCancel={() => this.handleInputs("time", { close: null, showOpenPicker: false }) }
                                        />
                                        <TouchableOpacity onPress={ () => this.setState({ showClosePicker: true }) }>
                                            <Text style={ styles.text }>Fim</Text>
                                            <Text style={ styles.time }>{ (close == null) ? "--:--" : close }</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={ styles.divider }/>

                                <View style={{ marginTop: 10, paddingBottom: 10 }}>
                                    <Text style={ styles.title }>Categorias</Text>
                                    { this.renderCategories() }
                                </View>
                            </View>
                        </ScrollView>

                        <ButtonOutline activeOpacity={ 0.85 } onPress={ this.applyFilters } style={ styles.button } color="#13ad6d">
                            <Text style={ styles.buttonText }>Aplicar Filtros</Text>
                        </ButtonOutline>
                    </View>
                )}
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        filters: state.search.filters,
        categories: state.categories.categories
    }
}

export default connect(mapStateToProps, {
    setType,
    setCategory,
    setTime,
    searchOnAPI,
    getCategories
})(Filters);

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
        fontSize: 17,
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
    },

    button: {
        alignSelf: "center",
        width: "100%",
        zIndex: 100,
        marginVertical: 0,
        paddingVertical: 15,
        borderRadius: 0,
        backgroundColor: "#13ad6d",
        elevation: 3
    },

    buttonText: {
        color: "#FFF",
        fontFamily: "OpenSans-Regular",
        fontSize: 16
    },
});
