import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, TextInput } from 'react-native-paper';

class UpdateDonationRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            oName: '',
            name: '',
            dateRequested: new Date().toLocaleString(),
            description: '',
            neededDateVal: '',
            neededDate: false,
        }
    }

    toggleNeededDate = (value) => {
        this.setState({ neededDate: !this.state.neededDate, neededDateVal: value.dateString });
    }

    updateDonationRequest = () => {
        const { dRequestsId } = this.props.route.params;
        firestore().collection('DonationRequest')
            .doc(dRequestsId)
            .update({
                oName: this.state.oName,
                name: this.state.name,
                dateRequested: this.state.dateRequested,
                description: this.state.description,
                neededDateVal: this.state.neededDateVal,
                email: auth().currentUser.email //detect current user
            }).then(success => {
                this.props.navigation.navigate('ReceiverDashboard');
            }).catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        const { dRequestsId } = this.props.route.params;
        firestore().collection('DonationRequest').doc(dRequestsId).get()
            .then(snap => {
                const rDonationRequest = snap.data();
                console.log('donation: ', rDonationRequest);
                this.setState(rDonationRequest)
            })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={{ padding: 20, fontSize: 22, textAlign: 'center' }}>
                    Update Requested Donation
                </Text>
                <Text style={{ ...styles.textInput, textAlign: 'center' }}>
                    Requested Date : {this.state.dateRequested}
                </Text>

                <TextInput placeholder="Orphanage Home Name"
                    value={this.state.oName}
                    onChangeText={text => this.setState({ oName: text })}
                    style={styles.textInput}
                    underlineColorAndroid='rgba(0,0,0,0)' />

                <TextInput
                    placeholder="Care Taker Name"
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                    style={styles.textInput}
                    underlineColorAndroid='rgba(0,0,0,0)' />

                <TextInput style={styles.textInput}
                    multiline={true} numberOfLines={4}
                    placeholder="Donation Description"
                    value={this.state.description}
                    onChangeText={text => this.setState({ description: text })}
                />

                <TouchableOpacity onPress={() => this.toggleNeededDate('')}>
                    <TextInput
                        placeholder="Needed Before"
                        style={{
                            ...styles.textInput,
                            color: '#595959',
                        }}
                        value={this.state.neededDateVal}
                        disabled={true} />
                </TouchableOpacity>
                {this.state.neededDate && (
                    <Calendar onDayPress={value => this.toggleNeededDate(value)} />
                )}

                <Button mode="contained" style={styles.button} onPress={this.updateDonationRequest}>
                    <Text style={styles.buttonText}>Update Request Donation</Text>
                </Button>
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

    container1: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 7,
    },
    textInput: {
        width: "100%",
        marginVertical: 7,
        color: '#595959',
        fontSize: 18,


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

export default UpdateDonationRequest;