import auth from '@react-native-firebase/auth';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

class DonorDashboard extends React.Component {

    logout = () => {
        auth().signOut().then(() => {
            console.log("Signout to home page");
        });
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.Text}>Want to Donate?</Text>
                    <Text style={styles.Text1}>Start Donating with an Easy Process</Text>


                    <Button style={styles.button} onPress={() => this.props.navigation.navigate('PostFood')}>
                        <Text style={styles.buttonText}>Post Food</Text>
                    </Button>

                    <Button style={styles.button} onPress={() => this.props.navigation.navigate('ViewPostedFood')}>
                        <Text style={styles.buttonText}>Manage Posted Food</Text>
                    </Button>

                    <Button style={styles.button} onPress={() => this.props.navigation.navigate('DonorViewAcceptedPost')}>
                        <Text style={styles.buttonText}>View Accepted Post</Text>
                    </Button>

                    <Button style={styles.button} onPress={() => this.props.navigation.navigate('ViewDonationRequestDonor')}>
                        <Text style={styles.buttonText}>View Donation Request</Text>
                    </Button>

                    <Button style={styles.button} onPress={() => this.props.navigation.navigate('DonorAcceptedRequest')}>
                        <Text style={styles.buttonText}>View Accepted Request</Text>
                    </Button>

                    <Button style={styles.button} onPress={() => this.props.navigation.navigate('DonorViewNearestHome')}>
                        <Text style={styles.buttonText}>Nearest Orphanage Home</Text>
                    </Button>



                    {/* <Button onPress={this.logout}>Logout</Button> */}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },

    Text: {
        color: '#2F4F4F',
        // 'rgba(255,255,255,0.6)',
        fontSize: 22,
        marginBottom: 3
    },

    Text1: {
        color: '#696969',
        // 'rgba(255,255,255,0.6)',
        fontSize: 18,
        marginBottom: 20
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 6,

    },

    button: {
        width: 300,
        backgroundColor: "#1c313a",
        borderRadius: 25,
        marginVertical: 8,
        paddingVertical: 12,
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: "center"
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: "center"
    }

});
export default DonorDashboard;