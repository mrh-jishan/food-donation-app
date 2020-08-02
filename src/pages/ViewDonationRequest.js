import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import DonationCard from '../components/DonationCard'



class ViewDonationRequest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            donationR: [],
        }
    }

    componentDidMount() {
        const user = auth().currentUser;
        firestore().collection('DonationRequest')
        .where('email', '==', user.email).onSnapshot(snap => {
            const dRequests = [];
            snap.forEach(res => {
                dRequests.push({
                    ...res.data(),
                    key: res.id,
                });
            });
            this.setState({ donationR: dRequests })
        })
    }

    deleteDonationRequest = (dRequests) => {
        firestore()
            .collection('DonationRequest')
            .doc(dRequests.key)
            .delete()
            .then(() => {
                console.log('Donation Request deleted!');
            });
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={{ ...styles.textInput, padding: 20, textAlign: 'center', fontSize: 22 }}>Update Posted Food</Text>

                {this.state.donationR.length > 0 && (
                    this.state.donationR.map((res, index) => (
                        <DonationCard dRequests={res}
                            deleteDonationRequest={this.deleteDonationRequest}
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


export default ViewDonationRequest;