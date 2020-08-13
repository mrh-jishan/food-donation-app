import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

class ReceiverChangePassword extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            user: {}
        }
    }

    updatePassword = () => {
        const { userId } = this.props.route.params;
        firestore().collection('User')
            .doc(userId)
            .update({
                password: this.state.password,
                email: auth().currentUser.email //detect current user
            }).then(success => {Alert.alert(
                "Alert Title",
                "Password Changed"
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );

                this.props.navigation.navigate('ReceiverDashboard');
            }).catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {

        const user = auth().currentUser;
        firestore().collection('Users').where('email', '==', user.email).get()
            .then(snap => {
                this.setState({ user: snap.docs[0].data() });
            });

        // const {userId} = this.props.route.params;
        // firestore().collection('User').doc(userId).get()
        //     .then(snap => {
        //     const rUser = snap.data();
        //     console.log('user: ', rUser);
        //     this.setState(rUser)
        // })
    }
    render() {
        return (
            <View style={styles.container} >
                    
                <View style={styles.container1} >
                    <Icon name="user-o" size={150} style={{color: 'white'}} />
                    <Text style={styles.textInput}>{this.state.user.name}</Text>
                </View>
                
                <View style={styles.container2}>
                    
                    <TextInput placeholder="Password"
                                value={this.state.user.password}
                                style={{
                                    ...styles.textInput1
                                }}
                                underlineColorAndroid='rgba(0,0,0,0)' />


                    <Button style={styles.button}>
                        <Icon name="lock" size={20} style={{color: 'black', marginRight:'20'}}/>
                        <Text style={styles.buttonText} onPress={this.updatePassword}>  Change Password</Text>
                    </Button>
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
        width: "100%",
        //marginHorizontal: 20,
        //color: 'white',
        borderRadius: 25,
        // paddingHorizontal: 40,
        fontSize: 20,
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


});
export default ReceiverChangePassword;