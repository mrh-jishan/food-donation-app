import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import VerifyDialog from '../components/VerifyDialog';
var axios = require('axios');

const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

class DonorVerify extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            visible: false,
            code: ''
        }
    }

    showDialog = (type) => this.setState({ visible: true, type: type });

    hideDialog = () => this.setState({ visible: false });

    setCode = (value) => this.setState({ code: value });

    componentDidMount() {
        const user = auth().currentUser;
        firestore().collection('Users').where('email', '==', user.email).get()
            .then(snap => {
                const doc = snap.docs[0];
                this.setState({
                    user: doc.data(),
                    key: doc.id
                });
            });
    }


    verifyEmail = () => {
        const emailCode = makeid(6);
        firestore().collection('Users').doc(this.state.key).update({
            emailVerification: {
                code: emailCode,
                isVerified: false
            }
        }).then(res => {
            this.showDialog('emailVerification')
            this.setState({ type: 'emailVerification', user: { emailVerification: { code: emailCode } } })
        }).catch(err => {
            console.log('err', err);
        })
    }

    verifyPhone = () => {
        const smsCode = makeid(6);
        firestore().collection('Users').doc(this.state.key).update({
            contactVerification: {
                code: smsCode,
                isVerified: false
            }
        }).then(res => {
            this.sendSMS(smsCode);
            this.showDialog('contactVerification')
            this.setState({ type: 'contactVerification', user: { contactVerification: { code: smsCode } } })
        }).catch(err => {
            console.log('err', err);
        })
    }

    submitCode = () => {

        var success = false;

        console.log('stat: ', this.state);
        console.log('code in state: ', this.state.code);


        if (this.state.type == 'contactVerification') {
            if (this.state.user.contactVerification.code == this.state.code) {
                console.log('contact final');
                success = true;
                Alert.alert(
                    "Alert Title",
                    "Success!!",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );

                firestore().collection('Users').doc(this.state.key).update({
                    contact: this.state.user.contact,
                    contactVerification: {
                        isVerified: true
                    }
                }).then(res => {

                }).catch(err => {
                    console.log('err', err);
                })
            }

        } else if (this.state.type == 'emailVerification') {
            console.log('email code: ', this.state.user.emailVerification.code);
            if (this.state.user.emailVerification.code == this.state.code) {
                console.log('email final');
                success = true;
                Alert.alert(
                    "Alert Title",
                    "Success!!",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );

                firestore().collection('Users').doc(this.state.key).update({
                    email: this.state.user.email,
                    emailVerification: {
                        isVerified: true
                    }
                }).then(res => {

                }).catch(err => {
                    console.log('err', err);
                })
            }
        }

        
        this.hideDialog();

        if (!success) {
            Alert.alert(
                "Alert Title",
                "Code is not valid!!",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }

        // if(code == this.state[this.state.type]){

        // }
        // console.log(this.state);
        // this.hideDialog();


    }

    sendSMS = (code) => {
        var data = JSON.stringify({
            "from": "Food Donation",
            "text": code + " Use this code for verification",
            "to": this.state.user.contact,
            "api_key": "4d8c8223",
            "api_secret": "dtHPgYdUoYXrUTs5"
        });

        var config = {
            method: 'post',
            url: 'https://rest.nexmo.com/sms/json',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': '__cfduid=dfe7dcfb00de70d570884a45f187a51ad1597075778'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    render() {
        return (
            <View style={styles.container} >
                <View style={styles.container1} >
                    <Icon name="user-o" size={150} style={{ color: 'white' }} />
                    <Text style={styles.textInput}>{this.state.user.name}</Text>
                </View>

                <View style={styles.container2}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: '70%', flex: 1, paddingRight: 15 }}>
                            <TextInput placeholder="email address"
                                value={this.state.user.email}
                                style={{
                                    ...styles.textInput1
                                }}
                                underlineColorAndroid='rgba(0,0,0,0)' />
                        </View>
                        <View>
                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                paddingRight: 15,
                                paddingLeft: 15
                            }} onPress={this.verifyEmail.bind(this)}
                                disabled={this.state.user.emailVerification?.isVerified}
                            >
                                <Text style={{
                                    ...styles.signupButton,

                                }}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: '70%', flex: 1, paddingRight: 15 }}>
                            <TextInput placeholder="Contact Number"
                                value={this.state.user.contact}
                                onChangeText={(value)=> this.setState({user: {contact: value}})}
                                style={{
                                    ...styles.textInput1
                                }}
                                underlineColorAndroid='rgba(0,0,0,0)' />
                        </View>
                        <View>
                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                paddingRight: 15,
                                paddingLeft: 15
                            }} onPress={this.verifyPhone.bind(this)}>
                                <Text style={{
                                    ...styles.signupButton,

                                }}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <VerifyDialog visible={this.state.visible} submitCode={this.submitCode}
                        setCode={this.setCode}
                        code={this.state.code} />
                </View>
            </View>
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
        // flex: 1,
        backgroundColor: "#006666",
        padding: 15,
        color: '#ffffff',
        width: "100%",
        //paddingHorizontal: 90,
        alignItems: "center"
    },
    container2: {
        // flex: 1,
        backgroundColor: '#ccc',
        padding: 3,
        paddingTop: 20,
        color: '#ffffff',
        fontSize: 40,
        width: "100%"
        //paddingHorizontal: 90,
        //alignItems: "center"


    },
    textInput: {
        width: "100%",
        marginVertical: 5,
        color: 'white',
        borderRadius: 25,
        // paddingHorizontal: 40,
        fontSize: 30,
        textAlign: "center"

    },

    textInput1: {
        // width: "70%",
        //marginHorizontal: 20,
        //color: 'white',
        // borderRadius: 25,
        // paddingHorizontal: 40,
        fontSize: 20,
        marginVertical: 10
        //textAlign: "center"

    },
    button: {
        //width: 300,
        width: "100%",
        backgroundColor: "#e6e6e6",
        borderRadius: 25,
        marginVertical: 16,
        paddingVertical: 12,
        //marginLeft: 30

    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        textAlign: "center"
    },

    signupButton: {
        color: 'black',
        fontSize: 20,
        fontWeight: '500',

    },

});
export default DonorVerify;