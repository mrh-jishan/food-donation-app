import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import DonationCard from '../components/DonationCard';



class ViewDonationRequest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            donationR: [],
        }
    }

    componentDidMount() {
        const user = auth().currentUser;
        const nowTime = new Date().getTime();
        firestore().collection('DonationRequest')
            //.orderBy("neededDateVal")
            .where('email', '==', user.email)
            .onSnapshot(snap => {
                const dRequests = [];
                 snap.docs

                    .map(res => {
                        return {
                            ...res?.data(),
                            key: res.id
                        }
                    })
                    .filter(data => new Date(data.neededDateVal).getTime() > nowTime)
                    .forEach(r=>{
                        console.log(r);
                        dRequests.push(r)
                    });
                
                
                this.setState({ donationR: dRequests.sort((obj1, obj2) => new Date(obj1.neededDateVal).getTime() - new Date(obj2.neededDateVal).getTime()) })
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
                <Text style={{ textAlign: 'center', fontSize: 22 }}>
                    View Donation Request
                </Text>

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