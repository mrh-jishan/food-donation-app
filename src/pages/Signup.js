import { Picker } from '@react-native-community/picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button, TextInput } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import * as yup from 'yup';
import Logo from '../components/Logo';
import { AuthContext } from './../navigation/AuthProvider';


const imageRef = storage().ref('users')


const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

// const schema = yup.object().shape({
//     email: yup.string().email().required(),
//     name: yup.string().min(6).required(),
//     contact: yup.number().min(8).required(),
//     password: yup.string().min(6).required(),
//     type: yup.string().required(),
//     oName: yup.string().min(6).required(),
//     address: yup.string().required(),
//     zipcode: yup.string().required(),
//     country: yup.string().required(),
//     bankName: yup.string().required(),
//     accountNum: yup.number().min(5).required(),
//     accountHolder: yup.string().min(6).required(),
// });

const donorSchema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required().typeError("All field is required!"),
    contact: yup.number().min(8).required().typeError("All field is required!"),
    password: yup.string().min(6).required(),
    type: yup.string().required().typeError("All field is required!"),
    address: yup.string().required().typeError("All field is required!"),
    zipcode: yup.string().required().typeError("All field is required!"),
    country: yup.string().required().typeError("All field is required!"),
});

const receiverSchema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required().typeError("All field is required!"),
    contact: yup.number().min(8).required().typeError("All field is required!"),
    password: yup.string().min(6).required(),
    type: yup.string().required().typeError("All field is required!"),
    oName: yup.string().required().typeError("All field is required!"),
    address: yup.string().required().typeError("All field is required!"),
    zipcode: yup.string().required().typeError("All field is required!"),
    country: yup.string().required().typeError("All field is required!"),
    bankName: yup.string().required().typeError("All field is required!"),
    accountNum: yup.number().min(5).required().typeError("All field is required!"),
    accountHolder: yup.string().required().typeError("All field is required!"),
});


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
            ic: {},
            icFilePath: '',
            licence: {},
            licenceFilePath: ''
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
                    // icFilePath: { uri: response.uri }
                });

                getPathForFirebaseStorage(response.uri)
                    .then(fileUri => {
                        const sessionId = new Date().getTime();
                        console.log('SESSION: ', sessionId);
                        imageRef.child(`${sessionId}`)
                            .putFile(fileUri).then(img => {
                                console.log('full path: ', img.metadata.fullPath);
                                this.setState({
                                    icFilePath: img.metadata.fullPath
                                });

                                console.log('IC PATH: ', this.state.icFilePath);
                            })
                    }).catch(err => {
                        console.log('err', err);
                    })

                // console.log('ic path: ', response.uri);
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
                    // licenceFilePath: { uri: response.uri }
                });

                if (this.state.type == 'receiver') {
                    getPathForFirebaseStorage(response.uri)
                        .then(fileUri => {
                            const sessionId = new Date().getTime();
                            imageRef.child(`${sessionId}`)
                                .putFile(fileUri)
                                .then(img => {
                                    console.log('full path: ', img);
                                    this.setState({ licenceFilePath: img.metadata.fullPath });
                                })
                        }).catch(err => {
                            console.log('Err 2: ', err);
                        })
                }
            }
        });
    };


    async componentDidMount() {
        this.setState({ coords: this.context.coords })
        console.log(this.context.coords);
        const loc = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.context.coords.latitude + ',' + this.context.coords.longitude + '&key=AIzaSyBbZyQKvPAzOEyD_SmYklj9x0PZtKi1_8A');
        const { results } = await loc.json();
        console.log('local: ', results);

        const address = results[0].formatted_address.split(',').slice(0, 3).join(" ");
        const zipCode = results[0].address_components.find(address => address.types.includes("postal_code"));
        const country = results[0].address_components.find(address => address.types.includes("country"));
        this.setState({ address: address, zipcode: zipCode.long_name, country: country.long_name })

        // this.setState({ address: data.stnumber + ' - ' + data.staddress + ', ' + data.city + ', ' + data.state, zipcode: data.postal, country: data.country })
    }


    getSchema = () => {
        if (this.state.type == 'receiver') {
            return receiverSchema;
        } else {
            return donorSchema;
        }
    }

    handleFormSubmit = () => {

        this.getSchema().validate({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            contact: this.state.contact,
            type: this.state.type,
            oName: this.state.oName,
            address: this.state.address,
            zipcode: this.state.zipcode,
            country: this.state.country,
            bankName: this.state.bankName,
            accountNum: this.state.accountNum,
            accountHolder: this.state.accountHolder,
        }).then(() => {

            console.log(this.context.coords);
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.address + '&key=AIzaSyBbZyQKvPAzOEyD_SmYklj9x0PZtKi1_8A').then(loc => loc.json()).then(data => {

                console.log('address after geocode: ', data.results[0]);

                const location = data.results[0].geometry.location;
                const coords = {
                    latitude: location.lat, longitude: location.lng
                }
                this.setState({ coords: coords })

                auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then(({ user }) => {
                        firestore().collection('Users')
                            .add({ ...this.state, uid: user.uid })
                            .then(res => {
                                this.props.navigation.navigate('Verify');
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
                                "This email address is already in use!",
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                                { cancelable: false }
                            );
                        } else if (error.code === 'auth/invalid-email') {
                            Alert.alert(
                                "Alert - Message",
                                "This email address is invalid!",
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                                { cancelable: false }
                            );
                            console.log('This email address is invalid!');
                        } else {
                            Alert.alert(
                                "Alert Title",
                                "Sorry! Unable to register!!",
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                                { cancelable: false }
                            );
                        }
                    });


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
        })

        // make sure validation is done

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
                            style={{ width: 360, height: 100 }}
                        />
                        <Button color="#05554B" style={styles.textInput}
                            onPress={this.chooseFile1}>Upload IC / Passport</Button>
                    </View>




                    <TextInput
                        label="Name as per IC/Passport"
                        style={styles.textInput}
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
                    />

                    <TextInput
                        label="Valid Email"
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
                        label="Valid Contact"
                        style={styles.textInput}
                        value={this.state.contact}
                        onChangeText={text => this.setState({ contact: text })}
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


                    {this.state.type == 'receiver' && (
                        <>
                            <TextInput
                                label="Orphanage Home Name"
                                style={styles.textInput}
                                value={this.state.oName}
                                onChangeText={text => this.setState({ oName: text })}
                            />


                            <View style={styles.container1}>
                                <Image
                                    source={this.state.licence}
                                    style={{ width: 360, height: 100 }}
                                />
                                <Button color="#05554B" onPress={this.chooseFile2}>Upload Orphanage Home Licence</Button>
                            </View>



                            <TextInput
                                label="Bank Name"
                                style={styles.textInput}
                                value={this.state.bankName}
                                onChangeText={text => this.setState({ bankName: text })}
                            />

                            <TextInput
                                label="Account Holder Name should be same as IC"
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

    container1: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginTop: 17,
    },

    textInput: {
        width: "100%",
        marginVertical: 10,
        // backgroundColor: '#fff'

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