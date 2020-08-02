import { Picker } from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import ImagePicker from 'react-native-image-picker';
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import RNFetchBlob from 'rn-fetch-blob';


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
                    <Button onPress={this.chooseFile}>Choose File</Button>
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
                        <Picker.Item label="Raw" value="raw" />
                        <Picker.Item label="Cooked" value="cooked" />
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

                <TextInput
                    placeholder="Food Coverage"
                    onChangeText={text => this.setState({ coverage: text })}
                    style={styles.textInput} />

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