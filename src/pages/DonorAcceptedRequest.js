import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import DrequestDonorAccepted from '../components/DrequestDonorAccepted';

class DonorAcceptedRequest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            donationR: [],
        }
    }

    componentDidMount() {
        const nowTime = new Date().getTime();
        firestore().collection('DonationRequest')
            //.orderBy("neededDateVal")
            .onSnapshot(snap => {
                const dRequests = snap.docs
                    .map(res => {
                        return {
                            ...res?.data(),
                            key: res.id
                        }
                    })
                    .filter(data => data.accepted == true && data.acceptedBy == auth().currentUser.email && data.isApproved == undefined)
                .filter(data => new Date(data.neededDateVal).getTime() > nowTime)
                this.setState({ donationR: dRequests.sort((obj1, obj2) => new Date(obj1.neededDateVal).getTime() - new Date(obj2.neededDateVal).getTime()) })
            })
    }

    // componentDidMount() {
    //     firestore().collection('DonationRequest').onSnapshot(snap => {
    //         const dRequests = [];
    //         snap.forEach(res => {
    //             const data = res.data();
    //             if (data.accepted == true && data.acceptedBy == auth().currentUser.email) {
    //                 dRequests.push({
    //                     ...res.data(),
    //                     key: res.id,
    //                 });
    //             }
                
    //         });
    //         this.setState({ donationR: dRequests })
    //     })
    // }

    acceptRequest = (res) => {
        firestore()
            .collection('DonationRequest')
            .doc(res.key)
            .update({ accepted: true, acceptedBy: auth().currentUser.email })
            .then(() => {
                console.log('Request Accepted!');
            });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* <Text style={{
                    textAlign: 'center',
                    fontSize: 22
                }}>Donor Accepted Request</Text> */}

                {this.state.donationR.length > 0 && (
                    this.state.donationR.map((res, index) => (
                        <DrequestDonorAccepted dRequests={res}
                            acceptRequest={this.acceptRequest}
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


export default DonorAcceptedRequest;