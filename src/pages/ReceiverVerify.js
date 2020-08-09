import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity,} from 'react-native';
import { Button, TextInput } from 'react-native-paper';

class ReceiverVerify extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        const user = auth().currentUser;
        firestore().collection('Users').where('email', '==', user.email).get()
            .then(snap => {
                this.setState({ user: snap.docs[0].data() });
            });
    }
    render() {
        return (
            <View style={styles.container} >
                    
                <View style={styles.container1} >
                    <Icon name="user-o" size={150} style={{color: 'white'}} />
                    <Text style={styles.textInput}>{this.state.user.name}</Text>
                </View>
                
                <View style={styles.container2}>
                
                <View style={{flexDirection:"row"}}> 
                    <View style={{ width: '70%', flex: 1, paddingRight: 15}}>
                        <TextInput placeholder={this.state.user.email}
                        style={{
                            ...styles.textInput1
                        }}
                        underlineColorAndroid='rgba(0,0,0,0)' />
                    </View>
                    <View>
                        <TouchableOpacity style={{justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                            paddingRight: 15,
                            paddingLeft: 15}}>
                            <Text style={{
                            ...styles.signupButton,
                            
                        }}>Verify</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flexDirection:"row"}}> 
                    <View style={{ width: '70%', flex: 1, paddingRight: 15}}>
                        <TextInput placeholder={this.state.user.contact}
                        style={{
                            ...styles.textInput1
                        }}
                        underlineColorAndroid='rgba(0,0,0,0)' />
                    </View>
                    <View>
                        <TouchableOpacity style={{justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                            paddingRight: 15,
                            paddingLeft: 15}}>
                            <Text style={{
                            ...styles.signupButton,
                            
                        }}>Verify</Text>
                        </TouchableOpacity>
                    </View>
                </View>

     
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
export default ReceiverVerify;