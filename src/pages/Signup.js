import { Picker } from '@react-native-community/picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Logo from '../components/Logo';
import { AuthContext } from './../navigation/AuthProvider';


class Signup extends React.Component {
    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            contact: '',
            email: '',
            password: '',
            type: '',
            coords: {},
            address: '',
            zipcode: '',
            country: ''
        }
    }

    async componentDidMount() {
        this.setState({ coords: this.context.coords })
        const loc = await fetch('https://geocode.xyz/37.4219873,-122.0838832?geoit=json');
        const data = await loc.json();
        this.setState({ address: data.stnumber + ' - ' + data.staddress + ', ' + data.city + ', ' + data.state, zipcode: data.postal, country: data.country })
    }

    handleFormSubmit = () => {
        auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(({ user }) => {
                console.log('user Id: ', user.uid);
                firestore().collection('Users').add({ ...this.state, uid: user.uid })
                    .then(res => {
                        // this.props.navigation.navigate('Login');
                    }).catch(err => {
                        console.log('error: ', err);
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
                            <Picker.Item label="Donor" value="donor" />
                            <Picker.Item label="Receiver" value="receiver" />
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


                    {this.state.type == 'receiver' && (
                        <>
                            <TextInput
                                label="Address"
                                style={styles.textInput}
                                multiline={true}
                                numberOfLines={3}
                                value={this.state.address}
                                onChangeText={text => this.setState({ address: text })}
                            />

                            <TextInput
                                label="Zip Code"
                                style={styles.textInput}
                                value={this.state.zipcode}
                                onChangeText={text => this.setState({ zipcode: text })}
                            />

                            <TextInput
                                label="Country"
                                style={styles.textInput}
                                value={this.state.country}
                                onChangeText={text => this.setState({ country: text })}
                            />
                        </>
                    )}



                    <Button
                        style={styles.button}
                        mode="contained"
                        onPress={this.handleFormSubmit}>
                        <Text style={styles.buttonText}>Sign up</Text>
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
        paddingVertical: 1,
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

    button: {
        width: 300,
        backgroundColor: "#1c313a",
        borderRadius: 25,
        marginVertical: 8,
        paddingVertical: 8
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: "center"
    }
});
export default Signup;