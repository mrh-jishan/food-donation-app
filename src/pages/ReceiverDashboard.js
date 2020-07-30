import auth from '@react-native-firebase/auth';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

class ReceiverDashboard extends React.Component {
    logout = () => {
        auth().signOut().then(() => {
            console.log('do to home');
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.Text}>Looking for Donation?</Text>
                <Text style={styles.Text1}>Start Requesting in an Easy Way</Text>


                <Button style={styles.button} onPress={() => this.props.navigation.navigate('RequestDonation')}>
                    <Text style={styles.buttonText}>Request Donation</Text>
                </Button>

                <Button style={styles.button} onPress={() => this.props.navigation.navigate('')}>
                    <Text style={styles.buttonText}>Manage Request</Text>
                </Button>

                <Button style={styles.button} onPress={() => this.props.navigation.navigate('')}>
                    <Text style={styles.buttonText}>Display Accepted Request</Text>
                </Button>

                <Button style={styles.button} onPress={() => this.props.navigation.navigate('')}>
                    <Text style={styles.buttonText}>View Post</Text>
                </Button>

                <Button style={styles.button} onPress={() => this.props.navigation.navigate('')}>
                    <Text style={styles.buttonText}>Display Accepted Post</Text>
                </Button>



                <Button onPress={this.logout}>Logout</Button>
            </View>
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

export default ReceiverDashboard;