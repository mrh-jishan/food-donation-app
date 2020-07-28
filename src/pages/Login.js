import auth from '@react-native-firebase/auth';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as yup from 'yup';
import Logo from '../components/Logo';
import firestore from '@react-native-firebase/firestore';


const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
});

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    handleFormSubmit = () => {
        // Login Validation
        schema.validate(this.state).then(valid => {
            console.log(valid);
            auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(({ user }) => {
                    console.log('user: ', user);
                    if (user) {
                        firestore().collection('Users').where('email', '==', user.email).get()
                            .then(snap => {
                                const cUser = snap.docs[0].data();
                                if (cUser.type == 'donor') {
                                    this.props.navigation.navigate('Donor');
                                } else if (cUser.type == 'receiver') {
                                    this.props.navigation.navigate('Receiver');
                                }
                            })
                    }
                    // this.props.navigation.navigate('Dashboard');
                    //incorrect id and password
                }).catch(error => {
                    Alert.alert(
                        "Alert Title",
                        "Sorry! Unable to Login!!",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );

                });
        }).catch(err => {
            console.log(err);
            Alert.alert(
                "Alert Title",
                err.errors[0],
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        });



    }

    render() {
        return (
            <View style={styles.container}>
                <Logo />
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

                <Button
                    style={styles.button}
                    mode="contained"
                    // style={{
                    //     width: '100%',
                    //     marginVertical: 10,
                    // }}
                    onPress={this.handleFormSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </Button>

                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}><Text style={styles.signupButton}>Signup</Text></TouchableOpacity>
                </View>


            </View>
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

    button: {
        width:300,
        backgroundColor:"#1c313a",
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },

    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign: "center"
    }
});
export default Login;