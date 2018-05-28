import React, { Component }         from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    FlatList,
    CameraRoll,
    Image,
    TouchableOpacity
}                                   from 'react-native';
import { Actions }                  from 'react-native-router-flux';
import { connect }                  from 'react-redux';
import { GalleryLoader }            from '../../loaders';
import { NavBar }                   from '../../components/';
const { height, width } = Dimensions.get('window');

class Gallery extends Component {
    constructor(props) {
        super(props);

        this.loader = {
            loader: true,
            photos: [],
        }
    }

    componentDidMount() {
        CameraRoll.getPhotos({
            first: 1000000
        }).then(res => {
            const photos = res.edges;
            this.setState({
                loader: false,
                photos: photos
            })
        })
    }

    handleMediaPress = (media) => {
        if (this.props.rolezinho == true) {
            Actions.selectedMedia({ media: media });
        } else {
            this.props.onMediaPress(media);
        }
    }

    renderRow(rowData) {
        const { uri } = rowData.node.image;

        return (
            <TouchableOpacity style={ styles.imageContainer } onPress={() => this.handleMediaPress(uri) }>
                <Image
                    source={{ uri: uri }}
                    style={ styles.image }
                />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavBar showRightIcon={ false } page="Galeria" />
                {(this.state == null || this.state.loader == true) ? (
                    <GalleryLoader/>
                ) : (
                    (this.state.photos.length == 0) ? (
                        <Text>Galeria Vazia</Text>
                    ) : (
                        <FlatList
                            numColumns={3}
                            data={this.state. photos }
                            keyExtractor={(item, index) => "gallery_" + index}
                            ItemSeparatorComponent={() => <View style={{ margin: -7 }}/> }
                            renderItem={ ({ item }) => this.renderRow(item) }
                        />
                    )
                )}
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        places: state.entities.places
    }
}

export default connect(null)(Gallery);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#EAEAEA"
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: (width/3),
        height: (width/3),
        resizeMode: "cover",
        backgroundColor: "#ededed",
        padding: 5
    }
});
