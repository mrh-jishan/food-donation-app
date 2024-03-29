import firestore from '@react-native-firebase/firestore';
import React from 'react';
import * as yup from 'yup';
import { ScrollView, StyleSheet, Text, Alert, Linking } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
//import call from 'react-native-phone-call';


const schema = yup.object().shape({
    feedback: yup.string().required(),

});

class DFeedback extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            feedback: '',

        }
    }


    // call = () => {
    //     const args = {
    //         number: '01133080788',
    //         prompt: false,
    //     };

    //     this.call(args).catch(console.error);
    // }


    feedbackHandle = () => {
        schema.validate({
            feedback: this.state.feedback,
        }).then(() => {

            firestore().collection('Feedback').add({
                feedback: this.state.feedback,
                email: auth().currentUser.email //detect current user
            }).then(res => {
                this.props.navigation.navigate('DonorDashboard');
            }).catch(err => {

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

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={{ ...styles.textInput, padding: 20, textAlign: 'center', fontSize: 22 }}>Feedback Form</Text>



                <TextInput style={{ ...styles.textInput, fontSize: 18, backgroundColor: '#ffffff' }} multiline={true} numberOfLines={6}
                    placeholder="Write your Feedback Here"
                    onChangeText={text => this.setState({ feedback: text })}
                />


                <Button mode="contained" style={styles.button} onPress={this.feedbackHandle}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Button>

                <Text style={{ ...styles.textInput, fontSize: 22, textAlign: 'center' }}>OR</Text>

                <Button mode="contained" style={styles.button}
                onPress={() => Linking.openURL(`tel:${'01133080788'}`)}>
                    <Text
                    style={styles.buttonText}>
                    {/* onPress={this.call}> */}
                        Call Support
                    </Text>
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
    textInput: {
        width: "100%",
        marginVertical: 10,
        color: '#008080',

        // width:300,
        borderRadius: 25,
        paddingHorizontal: 16

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


export default DFeedback;