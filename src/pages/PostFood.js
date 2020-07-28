import { Picker } from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
// import ImagePicker from 'react-native-image-picker';
import { Button, TextInput } from 'react-native-paper';

class PostFood extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            dataPosted: new Date().toLocaleString(),
            type: '',
            manfDateVal: '',
            expfDateVal: '',
            coverage: '',
            description: '',
            manfData: false,
            expDate: false,
            filePath: {},
        }
    }

    toggleManfDate = (value) => {
        this.setState({ manfData: !this.state.manfData, manfDateVal: value.dateString });
    }

    toggleExpDate = (value) => {
        this.setState({ expDate: !this.state.expDate, expfDateVal: value.dateString });
    }

    postFoodHandle = () => {
        firestore().collection('Foods').add(this.state).then(res => {
            this.props.navigation.navigate('DonorDashboard');
        }).catch(err => {

        });
    }

    //Image Picker
    chooseFile = () => {
        var options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        // ImagePicker.showImagePicker(options, response => {
        //     console.log('Response = ', response);

        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //         alert(response.customButton);
        //     } else {
        //         let source = response;
        //         // You can also display the image using data:
        //         // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        //         this.setState({
        //             filePath: source,
        //         });
        //     }
        // });
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* <Text style={{ padding: 20 }}>This is Post Food page</Text> */}
                <Text style={{ ...styles.textInput, textAlign: 'center' }}> Date Posted :  {this.state.dataPosted}</Text>

                <View style={styles.container1}>
                    {/*<Image 
                    source={{ uri: this.state.filePath.path}} 
                    style={{width: 100, height: 100}} />*/}
                    <Image
                        source={{
                            uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
                        }}
                        style={{ width: 100, height: 100 }}
                    />
                    <Image
                        source={{ uri: this.state.filePath.uri }}
                        style={{ width: 200, height: 200 }}
                    />
                    <Text style={{ alignItems: 'center', color: '#0f0f0f' }}>
                        {this.state.filePath.uri}
                    </Text>
                    <Button style={styles.textInput} title="Choose File" onPress={this.chooseFile.bind(this)} />
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
                        value={this.state.expfDateVal}
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