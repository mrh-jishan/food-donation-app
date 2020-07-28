import { Picker } from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

class RFeedback extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            feedback: '',

        }
    }



    feedbackHandle = () => {
        firestore().collection('Feedback').add(this.state).then(res => {
            this.props.navigation.navigate('ReceiverDashboard');
        }).catch(err => {

        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={{...styles.textInput , padding: 20, textAlign: 'center', fontSize: 22}}>Feedback Form</Text>
                
                
                
                <TextInput style={{...styles.textInput, fontSize: 18, backgroundColor: '#ffffff'}} multiline={true} numberOfLines={6}
                 placeholder="Write your Feedback Here"
                 onChangeText={text => this.setState({ feedback: text })}
                 />


                <Button mode="contained" style={styles.button} onPress={this.feedbackHandle}>        
                    <Text style={styles.buttonText}>Submit</Text>
                </Button>

                <Text style={{...styles.textInput, fontSize: 22, textAlign: 'center'}}>OR</Text>

                <Button mode="contained" style={styles.button}>        
                    <Text style={styles.buttonText}>Call Support</Text>
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
        width:300,
        backgroundColor:"#006666",
        borderRadius: 25,
        marginVertical: 16,
        paddingVertical: 12,
        marginLeft: 30

    },
    
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign: "center"
    },
    

});


export default RFeedback;