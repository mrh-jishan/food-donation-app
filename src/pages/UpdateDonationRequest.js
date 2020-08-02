import { Picker } from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import ImagePicker from 'react-native-image-picker';
import { Button, TextInput } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';

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


class UpdateDonationRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            oName: '',
            cName: '',
            dateRequested: new Date().toLocaleString(),
            // location: '',
            // contact: '',
            description: '',
            neededDateVal: '',
            neededDate: false,
        }
    }

    toggleNeededDate = (value) => {
        this.setState({ neededDate: !this.state.neededDate, neededDateVal: value.dateString });
    }

    // toggleExpDate = (value) => {
    //     this.setState({ expDate: !this.state.expDate, expfDateVal: value.dateString });
    // }

    updateDonationRequest = () => {
        const sessionId = new Date().getTime();
       //const imageRef = storage().ref('foods').child(`${sessionId}`);
        //getPathForFirebaseStorage(this.state.filePath.uri).then(fileUri => {
            //imageRef.putFile(fileUri).then(img => {
                const { dRequestsId } = this.props.route.params;
                firestore().collection('DonationRequest')
                    .doc(dRequestsId)
                    .update({
                    oName: this.state.oName,
                    cName: this.state.cName,
                    dateRequested: this.state.dateRequested,
                    // location: '',
                    // contact: '',
                    description: this.state.description,
                    neededDateVal: this.state.neededDateVal,
                    email: auth().currentUser.email //detect current user
                    }).then(success => {
                        this.props.navigation.navigate('ReceiverDashboard');
                    });
            //})

        //})
    }

    //Image Picker
    // chooseFile = () => {
    //     ImagePicker.launchImageLibrary(options, (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         } else {
    //             this.setState({
    //                 avatarSource: { uri: 'data:image/jpeg;base64,' + response.data },
    //                 filePath: { uri: response.uri }
    //             });
    //         }
    //     });
    // };

    componentDidMount() {
        const { dRequestsId } = this.props.route.params;
        firestore().collection('DonationRequest').doc(dRequestsId).get()
            .then(snap => {
                const rDonationRequest = snap.data();
                this.setState(rDonationRequest)
            })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
            {/* <Text style={{ padding: 20 }}>This is Post Food page</Text> */}
            <Text style={{ ...styles.textInput, textAlign: 'center' }}>Requested Date : {this.state.dateRequested}</Text>

            <TextInput placeholder="Orphanage Home Name"
                onChangeText={text => this.setState({ oName: text })}
                style={styles.textInput}
                underlineColorAndroid='rgba(0,0,0,0)' />

            <TextInput
                placeholder="Care Taker Name"
                onChangeText={text => this.setState({ cName: text })}
                style={styles.textInput}
                underlineColorAndroid='rgba(0,0,0,0)' />

            <TextInput style={styles.textInput} multiline={true} numberOfLines={4}
                placeholder="Donation Description"
                onChangeText={text => this.setState({ description: text })}
            />

            <TouchableOpacity onPress={() => this.toggleNeededDate('')}>
                <TextInput
                    placeholder="Needed Before"
                    style={{
                        ...styles.textInput,
                        color: '#595959',
                    }}
                    value={this.state.neededDateVal}
                    disabled={true} />
            </TouchableOpacity>
            {this.state.neededDate && (
                <Calendar onDayPress={value => this.toggleNeededDate(value)} />
            )}

            {/* <Button mode="contained" style={styles.button}>
                <Icon name="phone" size={20}/>
                <Text style={styles.buttonText}>Contact</Text>
            </Button>

            <Button mode="contained" style={styles.button}>
                <Icon name="map-o" size={20} />
                <Text style={styles.buttonText}>Location</Text>
            </Button> */}



            <Button mode="contained" style={styles.button} onPress={this.updateDonationRequest}>
                <Text style={styles.buttonText}>Update Request Donation</Text>
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

export default UpdateDonationRequest;