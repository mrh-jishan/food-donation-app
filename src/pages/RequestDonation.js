import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, TextInput } from 'react-native-paper';

class RequestDonation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            oName: '',
            cName: '',
            dateRequested: new Date().toLocaleString(),
            location: '',
            contact: '',
            description: '',
            neededDateVal: '',
            neededDate: false,

        }
    }

    toggleNeededDate = (value) => {
        this.setState({ neededDate: !this.state.neededDate, neededDateVal: value.dateString });
    }

    // toggleExpDate = (value) => {
    //     this.setState({ expDate: !this.state.expDate, expfDateVal: value.dateString });
    // }

    requestDonationHandle = () => {
        firestore().collection('DonationRequest').add(this.state).then(res => {
            this.props.navigation.navigate('ReceiverDashboard');
        }).catch(err => {

        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* <Text style={{ padding: 20 }}>This is Post Food page</Text> */}
                <Text style={{ ...styles.textInput, textAlign: 'center' }}>Requested Date : {this.state.dateRequested}</Text>

                <TextInput placeholder="Orphanage Home Name"
                    onChangeText={text => this.setState({ oName: text })}
                    style={styles.textInput}
                    underlineColorAndroid='rgba(0,0,0,0)' />

                <TextInput
                    placeholder="Care Taker Name"
                    onChangeText={text => this.setState({ cName: text })}
                    style={styles.textInput}
                    underlineColorAndroid='rgba(0,0,0,0)' />

                <TextInput style={styles.textInput} multiline={true} numberOfLines={4}
                    placeholder="Donation Description"
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

                {/* <Button mode="contained" style={styles.button}>
                    <Icon name="phone" size={20}/>
                    <Text style={styles.buttonText}>Contact</Text>
                </Button>

                <Button mode="contained" style={styles.button}>
                    <Icon name="map-o" size={20} />
                    <Text style={styles.buttonText}>Location</Text>
                </Button> */}



                <Button mode="contained" style={styles.button} onPress={this.requestDonationHandle}>
                    <Text style={styles.buttonText}>Request Donation</Text>
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
    textInput: {
        width: "100%",
        marginVertical: 10,
        color: '#595959',
        fontSize: 18,
        // width:300,
        // borderRadius: 25,
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
        textAlign: "center",
    },


});
export default RequestDonation;