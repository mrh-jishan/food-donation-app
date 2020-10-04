import { Picker } from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert  } from 'react-native';
import { Calendar } from 'react-native-calendars';
import ImagePicker from 'react-native-image-picker';
import { Button, TextInput } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import * as yup from 'yup';

const getPathForFirebaseStorage = async uri => {
    if (Platform.OS === "ios") return uri
    const stat = await RNFetchBlob.fs.stat(uri)
    return stat.path
}

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const schema = yup.object().shape({
    name: yup.string().required().typeError("All field is required!"),
    type: yup.string().required().typeError("All field is required!"),
    coverage: yup.string().required().typeError("All field is required!"),
    description: yup.string().required().typeError("All field is required!"),
    manfDateVal: yup.date().required().typeError("All field is required!"),
    expDateVal: yup.date().required().typeError("All field is required!"),

});

class UpdateFood extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            dataPosted: '',
            type: '',
            manfDateVal: '',
            expDateVal: '',
            coverage: '',
            description: '',
            manfData: false,
            expDate: false,
            filePath: {},
            avatarSource: {}
        }
    }

    toggleManfDate = (value) => {
        this.setState({ manfData: !this.state.manfData, manfDateVal: value.dateString });
    }

    toggleExpDate = (value) => {
        this.setState({ expDate: !this.state.expDate, expDateVal: value.dateString });
    }

    updateFoodReq = () => {
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
            imageRef.putFile(fileUri)
            .then(_=> imageRef.getDownloadURL())
            .then(img => {
                const { foodId } = this.props.route.params;
                firestore().collection('Foods')
                    .doc(foodId)
                    .update({
                        name: this.state.name,
                        dataPosted: this.state.dataPosted,
                        type: this.state.type,
                        manfDateVal: this.state.manfDateVal,
                        expDateVal: this.state.expDateVal,
                        coverage: this.state.coverage,
                        description: this.state.description,
                        img: img,
                    }).then(success => {
                        this.props.navigation.navigate('ViewPostedFood');
                    });
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

    componentDidMount() {
        const { foodId } = this.props.route.params;
        firestore().collection('Foods').doc(foodId).get()
            .then(snap => {
                const rFood = snap.data();
                this.setState(rFood)
            })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                
                <Text style={{ ...styles.textInput, textAlign: 'center' }}> Date Posted :  {this.state.dataPosted}</Text>

                <View style={styles.container1}>
                    {console.log(this.state.img)}
                    <Image
                        source={{uri: this.state.img}}
                        style={{ width: 100, height: 100 }}
                    />
                    <Button onPress={this.chooseFile}>Choose File</Button>
                </View>

                <TextInput placeholder="Food Name"
                    value={this.state.name}
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

                <TextInput style={styles.textInput} multiline={true} numberOfLines={4}
                    placeholder="Food Description"
                    value={this.state.description}
                    onChangeText={text => this.setState({ description: text })}
                />
                <Button mode="contained" style={styles.button} onPress={this.updateFoodReq}>
                    <Text style={styles.buttonText}>Update Food</Text>
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

export default UpdateFood;