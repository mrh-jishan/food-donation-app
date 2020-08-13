import { Picker } from '@react-native-community/picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Logo from '../components/Logo';
import { AuthContext } from './../navigation/AuthProvider';
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

// //what is this for
const getPathForFirebaseStorage = async uri => {
    if (Platform.OS === "ios") return uri
    const stat = await RNFetchBlob.fs.stat(uri)
    return stat.path
}

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
            oName: '',
            coords: {},
            address: '',
            zipcode: '',
            country: '',
            bankName: '',
            accountNum: '',
            accountHolder: '',
            icFilePath: {},
            ic: {},
            licence: {},
            licenceFilePath: {}

            //avatarSource: {}
        }
    }

    //Image Picker
    chooseFile1 = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    ic: { uri: 'data:image/jpeg;base64,' + response.data },
                    icFilePath: { uri: response.uri }
                 });
            }
        });
    };

      //Image Picker
      chooseFile2 = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({ 
                    licence: { uri: 'data:image/jpeg;base64,' + response.data },
                    licenceFilePath: { uri: response.uri }
                 });
            }
        });
    };


    async componentDidMount() {
        this.setState({ coords: this.context.coords })
        const loc = await fetch('https://geocode.xyz/37.4219873,-122.0838832?geoit=json');
        const data = await loc.json();
        this.setState({ address: data.stnumber + ' - ' + data.staddress + ', ' + data.city + ', ' + data.state, zipcode: data.postal, country: data.country })
    }

    handleFormSubmit = () => {
        auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(({ user }) => {
                const imageRef = storage().ref('users')
                getPathForFirebaseStorage(this.state.icFilePath.uri)
                    .then(fileUri => {
                        const sessionId = new Date().getTime();
                        imageRef.child(`${sessionId}`).putFile(fileUri).then(img => {
                            this.setState({ ic: img.metadata.fullPath })
                        })
                    }).then(() => {
                        getPathForFirebaseStorage(this.state.licenceFilePath.uri).then(fileUri => {
                            const sessionId = new Date().getTime();
                            imageRef.child(`${sessionId}`).putFile(fileUri).then(img => {
                                this.setState({ licence: img.metadata.fullPath })
                            })
                        })
                    }).then(() => {
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

                    <View style={styles.container1}>
                        <Image
                            source={this.state.ic}
                            style={{ width: 100, height: 100 }}
                        />
                        <Button onPress={this.chooseFile1}>Choose File</Button>
                    </View>


                    <View style={styles.container1}>
                        <Image
                            source={this.state.licence}
                            style={{ width: 100, height: 100 }}
                        />
                        <Button onPress={this.chooseFile2}>Choose File</Button>
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
                                label="Orphanage Home Name"
                                style={styles.textInput}
                                value={this.state.oName}
                                onChangeText={text => this.setState({ oName: text })}
                            />

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

                            <TextInput
                                label="Bank Name"
                                style={styles.textInput}
                                value={this.state.bankName}
                                onChangeText={text => this.setState({ bankName: text })}
                            />

                            <TextInput
                                label="Account Holder Name"
                                style={styles.textInput}
                                value={this.state.accountHolder}
                                onChangeText={text => this.setState({ accountHolder: text })}
                            />

                            <TextInput
                                label="Account Number"
                                style={styles.textInput}
                                value={this.state.accountNum}
                                onChangeText={text => this.setState({ accountNum: text })}
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