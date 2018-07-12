import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Image,
    Dimensions
}                               from 'react-native';
import { Actions }              from 'react-native-router-flux';
import { connect }              from 'react-redux';
import { getEvents }            from '../../actions/';
import { NavBar, EventCard, Loader } from '../../components/';

const { width } = Dimensions.get('window');

class Events extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPrevMonths: false,
        }
    }

    componentWillMount() {
        this.props.getEvents()
    }

    renderData = (data, index) => {
        return (
            <View key={index + "_event_section"}>
                <View style={{ backgroundColor: "#000", padding: 20, height: 100, justifyContent: "center" }}>
                    <Image source={ require("../../../assets/machadinha.jpg") } style={ styles.categoryImage }/>
                    <Text style={ styles.monthTitle }>{ data[0].month }</Text>
                </View>
                {
                    data.map((item, index) => {
                        return <EventCard key={index + "_event_card"} date={ item.date } title={ item.text } onPress={ () => null }/>
                    })
                }
            </View>
        )
    }

    render() {
        const { showPrevMonths } = this.state;
        let events = [];

        for(let key in this.props.events) {
            events.push(this.props.events[key])
        }

        const month = new Date().getMonth();
        const pastEvents = events.slice(0, month);
        const nextEvents = events.slice(month);

        return (
            <View style={ styles.container }>
                <NavBar page="Agenda" showBackIcon={ false }/>
                {(events.length < 1) ? (
                    <Loader/>
                ) : (
                    <ScrollView style={ styles.container }>
                        {(showPrevMonths) ? (
                            <FlatList
                                data={ pastEvents }
                                keyExtractor={(item, index) => "agenda_" + item.date + "_" + index}
                                renderItem={({ item, index }) => this.renderData(item, index) }
                            />
                        ) : (
                            <EventCard title="Mostrar meses anteriores" onPress={ () => this.setState({ showPrevMonths: true }) }/>
                        )}
                        <FlatList
                            data={ nextEvents }
                            keyExtractor={(item, index) => "agenda_" + item.date + "_" + index}
                            renderItem={({ item, index }) => this.renderData(item, index) }
                        />
                    </ScrollView>
                )}
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        events: state.general.events
    }
}

export default connect(mapStateToProps, { getEvents })(Events);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    categoryImage: {
        zIndex: 100,
        position: "absolute",
        left: 0,
        top: 0,
        width: width,
        height: 100,
        resizeMode: "cover",
        opacity: 0.3,
        backgroundColor: "#000"
    },
    monthTitle: {
        color: "#FFF",
        fontFamily: "OpenSans-Light",
        fontSize: 25,
        zIndex: 200,
        elevation: 20
    }
});
