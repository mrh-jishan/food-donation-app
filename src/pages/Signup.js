import { Picker } from '@react-native-community/picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Logo from '../components/Logo';

const user = [{
    label: 'Donor',
    value: 1
},
{
    label: 'Receiver',
    value: 2
}];

class Signup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            name: '',
            contact: '',
            password: '',
            type: ''
        }
    }

    handleFormSubmit = () => {
        auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {
                firestore().collection('Users').add(this.state).then(res => {
                    this.props.navigation.navigate('Login');
                }).catch(err => {
                    Alert.alert(
                        "Alert - Message",
                        "Sorry! Something went wrong!!",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                })

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert(
                        "Alert - Message",
                        "That email address is already in use!",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                } else if (error.code === 'auth/invalid-email') {
                    Alert.alert(
                        "Alert - Message",
                        "That email address is invalid!",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                    console.log('That email address is invalid!');
                } else {
                    Alert.alert(
                        "Alert Title",
                        "Sorry! Something went wrong!!",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                }
            });
    }

    render() {

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Logo />
                    <View style={{
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.3)',
                        overflow: 'hidden',
                        width: "100%"
                    }}>
                        <Picker
                            selectedValue={this.state.type}
                            style={{
                                ...styles.textInput,
                                color: '#CCC',
                                marginVertical: 0
                            }}
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ type: itemValue })
                            }>
                            <Picker.Item label="Select User Type" value="" />
                            <Picker.Item label="Donor" value="Donor" />
                            <Picker.Item label="Receiver" value="Receiver" />
                        </Picker>
                    </View>

                    <TextInput
                        label="Name"
                        style={styles.textInput}
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
                    />

                    <TextInput
                        label="Email"
                        style={styles.textInput}
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />

                    <TextInput
                        label="Password"
                        style={styles.textInput}
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text })}
                    />

                    <TextInput
                        label="Contact"
                        style={styles.textInput}
                        value={this.state.contact}
                        onChangeText={text => this.setState({ contact: text })}
                    />

                    <Button
                        mode="contained"
                        style={{
                            width: '100%',
                            marginVertical: 10,
                        }}
                        onPress={this.handleFormSubmit}>
                        Register
                    </Button>

                    <View style={styles.signupTextCont}>
                        <Text style={styles.signupText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.signupButton}>Sign In</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#455a64',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    textInput: {
        width: "100%",
        marginVertical: 10,

    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },

    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 18
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 6,

    },
});
export default Signup;