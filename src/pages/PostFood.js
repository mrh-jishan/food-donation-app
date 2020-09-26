import { Picker } from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import ImagePicker from 'react-native-image-picker';
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import RNFetchBlob from 'rn-fetch-blob';
import * as yup from 'yup';


const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

//what is this for
const getPathForFirebaseStorage = async uri => {
    if (Platform.OS === "ios") return uri
    const stat = await RNFetchBlob.fs.stat(uri)
    return stat.path
}

const schema = yup.object().shape({
    name: yup.string().required().typeError("All field is required!"),
    type: yup.string().required().typeError("All field is required!"),
    coverage: yup.string().required().typeError("All field is required!"),
    description: yup.string().required().typeError("All field is required!"),
    manfDateVal: yup.date().required().typeError("All field is required!"),
    expDateVal: yup.date().required().typeError("All field is required!"),

});

class PostFood extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            dataPosted: new Date().toLocaleString(),
            type: '',
            manfDateVal: '',
            expDateVal: '',
            coverage: '',
            description: '',
            manfData: false,
            expDate: false,
            filePath: {},
            avatarSource: {} // what is this for
        }
    }

    toggleManfDate = (value) => {
        this.setState({ manfData: !this.state.manfData, manfDateVal: value.dateString });
    }

    toggleExpDate = (value) => {
        this.setState({ expDate: !this.state.expDate, expDateVal: value.dateString });
    }

    postFoodHandle = () => {
        schema.validate({
            name: this.state.name,
            type: this.state.type,
            manfDateVal: this.state.manfDateVal,
            expDateVal: this.state.expDateVal,
            coverage: this.state.coverage,
            description: this.state.description,
        }).then(() => {

            const sessionId = new Date().getTime();
            const imageRef = storage().ref('foods').child(`${sessionId}`);
            getPathForFirebaseStorage(this.state.filePath.uri).then(fileUri => {
                imageRef.putFile(fileUri).then(img => {
                    firestore().collection('Foods').add({
                        name: this.state.name,
                        dataPosted: this.state.dataPosted,
                        type: this.state.type,
                        manfDateVal: this.state.manfDateVal,
                        expDateVal: this.state.expDateVal,
                        coverage: this.state.coverage,
                        description: this.state.description,
                        img: img.metadata.fullPath, //image
                        email: auth().currentUser.email //detect current user
                    }).then(res => {
                        this.props.navigation.navigate('DonorDashboard');
                    }).catch(err => {
                        console.log('err: ', err);
                    });
                }).catch(err => {
                    console.log('err: ', err);
                })
            })

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
    }



    //Image Picker
    chooseFile = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    avatarSource: { uri: 'data:image/jpeg;base64,' + response.data },
                    filePath: { uri: response.uri }
                });
            }
        });
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* <Text style={{ padding: 20 }}>This is Post Food page</Text> */}
                <Text style={{ ...styles.textInput, textAlign: 'center' }}> Date Posted :  {this.state.dataPosted}</Text>
                {/*for image*/}
                <View style={styles.container1}>
                    <Image
                        source={this.state.avatarSource}
                        style={{ width: 100, height: 100 }}
                    />
                    <Button color="#05554B" onPress={this.chooseFile}>Choose File</Button>
                </View>

                <TextInput placeholder="Food Name"
                    onChangeText={text => this.setState({ name: text })}
                    style={styles.textInput} />

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
                            color: '#595959',
                            marginVertical: 0,
                            background: '#ccc'
                        }}
                        mode='dropdown'
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ type: itemValue })
                        }>
                        <Picker.Item label="Select Food Type" value="" />
                        <Picker.Item label="Raw" value="Raw" />
                        <Picker.Item label="Cooked" value="Cooked" />
                        <Picker.Item label="Event Food" value="Event Food" />
                    </Picker>
                </View>

                <TouchableOpacity onPress={() => this.toggleManfDate('')}>
                    <TextInput
                        placeholder="Manufactured Date"
                        style={styles.textInput}
                        value={this.state.manfDateVal}
                        disabled={true} />
                </TouchableOpacity>
                {this.state.manfData && (
                    <Calendar onDayPress={value => this.toggleManfDate(value)} />
                )}

                <TouchableOpacity onPress={() => this.toggleExpDate('')}>
                    <TextInput
                        placeholder="Expiry Date"
                        style={styles.textInput}
                        value={this.state.expDateVal}
                        disabled={true} />
                </TouchableOpacity>
                {this.state.expDate && (
                    <Calendar onDayPress={value => this.toggleExpDate(value)} />
                )}

                <View style={{
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.3)',
                    overflow: 'hidden',
                    width: "100%"
                }}>
                    <Picker
                        selectedValue={this.state.coverage}
                        style={{
                            ...styles.textInput,
                            color: '#595959',
                            marginVertical: 0,
                            background: '#ccc'
                        }}
                        mode='dropdown'
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ coverage: itemValue })
                        }>
                        <Picker.Item label="Select Food Coverage" value="" />
                        <Picker.Item label="1 - 10 Pax" value="1 - 10 Pax" />
                        <Picker.Item label="11 - 20 Pax" value="11 - 20 Pax" />
                        <Picker.Item label="21 - 30 Pax" value="21 - 30 Pax" />
                        <Picker.Item label="31 - 40 Pax" value="31 - 40 Pax" />
                        <Picker.Item label="41 - 50 Pax" value="41 - 50 Pax" />
                        <Picker.Item label="51 - 60 Pax" value="51 - 60 Pax" />
                        <Picker.Item label="61 - 70 Pax" value="61 - 70 Pax" />
                        <Picker.Item label="71 - 80 Pax" value="71 - 80 Pax" />
                        <Picker.Item label="81 - 90 Pax" value="81 - 90 Pax" />
                        <Picker.Item label="91 - 100 Pax" value="91 - 100 Pax" />
                    </Picker>
                </View>
                {/* <TextInput
                    placeholder="Food Coverage"
                    onChangeText={text => this.setState({ coverage: text })}
                    style={styles.textInput} /> */}

                <TextInput style={styles.textInput} multiline={true} numberOfLines={4}
                    placeholder="Food Description"
                    onChangeText={text => this.setState({ description: text })}
                />
                <Button mode="contained" style={styles.button} onPress={this.postFoodHandle}>
                    <Text style={styles.buttonText}>Post Food</Text>
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
export default PostFood;