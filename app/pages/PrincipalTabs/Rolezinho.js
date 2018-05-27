import React, { Component }         from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Image
}                                   from 'react-native';
import { Actions }                  from 'react-native-router-flux';
import { connect }                  from 'react-redux';
import { NavBar, RolezinhoCard }    from '../../components/';

class Rolezinho extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const rolezinhos = [{
            id: 1342564,
            image: "http://www.museusdorio.com.br/joomla/media/k2/galleries/74/01-MR.JPG",
            text: "Sempre amando essa cidade 💙",
            user: {
                name: "Lucas Craveiro Paes",
                id: 1,
                avatar: "https://pbs.twimg.com/profile_images/869292124986126338/keoLQCJh_400x400.jpg"
            }
        }, {
            id: 62428,
            image: "http://www.diariodaplanicie.com.br/wp-content/uploads/2017/01/phoca_thumb_l_Prtico-foto-Adilson-dos-Santos.jpg",
            text: "Finalmente chegando 👐",
            user: {
                name: "Letícia Ribeiro",
                id: 2,
                avatar: "https://pbs.twimg.com/profile_images/999473923212242944/EEEMDYQw_400x400.jpg"
            }
        }, {
            id: 63376,
            image: "https://i.ytimg.com/vi/1e2UxZjVzf8/maxresdefault.jpg",
            text: "Só curtindo essa praia #fds #finalmente",
            user: {
                name: "Israel Meira",
                id: 3,
                avatar: "https://scontent.fcaw3-1.fna.fbcdn.net/v/t1.0-9/16298894_1397645556954609_3825638001878118291_n.jpg?_nc_cat=0&oh=71442f0ec455851b8388210bdc03c3d2&oe=5B7AEA44"
            }
        }];

        return (
            <View style={{ flex: 1 }}>
                <NavBar showBackIcon={ false } page="Rolezinhos" />
                <View style={ styles.container }>
                    <FlatList
                        data={ rolezinhos }
                        horizontal={ true }
                        keyExtractor={(item, index) => "rolezinho_" + item.id}
                        ItemSeparatorComponent={() => <View style={{ margin: -7 }}/> }
                        renderItem={({ item }) =>
                            <RolezinhoCard
                                rolezinho={ item }
                            />
                        }
                    />
                </View>
            </View>
        )
    }
}

export default connect(null)(Rolezinho);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        fontSize: 22,
        textAlign: "center",
        color: "#000",
        fontFamily: "OpenSans-Regular"
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});
