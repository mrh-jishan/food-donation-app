import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import NearestHome from '../components/NearestHome';
import { AuthContext } from './../navigation/AuthProvider';


const distance = (lon1, lat1, lon2, lat2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1).toRad();  // Javascript functions in radians
    var dLon = (lon2 - lon1).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

/** Converts numeric degrees to radians */
if (typeof (Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}

class DonorViewNearestHome extends React.Component {
    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            nearestH: [],
        }
    }

    componentDidMount() {
        const coords = this.context.coords;
        firestore().collection('Users')
            .where('type', '==', 'receiver')
            .onSnapshot(snap => {
                const vHome = snap.docs.map(res => {
                    const data = res.data()
                    const dist = distance(coords.longitude, coords.latitude, data.coords.longitude, data.coords.longitude);
                    data.distance = dist;
                    data.position = coords;
                    return data;
                });
                this.setState({ nearestH: vHome.sort((obj1, obj2) => obj1.distance - obj2.distance) })
            })
    }

    render() {
        return (
            <ScrollView style={styles.container}>


                {this.state.nearestH.length > 0 && (
                    this.state.nearestH.map((res, index) => (
                        <NearestHome vHome={res}
                            key={index}
                            navigation={this.props.navigation}
                        />
                    ))
                )}

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 15,

    },
    textInput: {
        width: "100%",
        marginVertical: 10,
        color: '#008080',
        borderRadius: 25,
        paddingHorizontal: 16

    },

    button: {
        width: 300,
        backgroundColor: "#006666",
        borderRadius: 25,
        marginVertical: 16,
        paddingVertical: 12,
        marginLeft: 30

    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: "center"
    },


});


export default DonorViewNearestHome;