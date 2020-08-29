import auth from '@react-native-firebase/auth';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            user: {}
        }
    }

    componentDidMount() {
        this.setState({ user: auth().currentUser })
    }

    updatePassword = () => {
        const user = auth().currentUser;
        user.updatePassword(this.state.password).then(res => {
            Alert.alert(
                "Alert Title",
                "Password Changed!!",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            this.props.navigation.goBack();
        }).catch(err => {
            Alert.alert(
                "Alert Title",
                "Please logout and then try to login to change password!!",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        })
    }
    render() {
        return (
            <View style={styles.container} >

                <View style={styles.container1} >
                    <Icon name="user-o" size={150} style={{ color: 'white' }} />
                    <Text style={styles.textInput}>{this.state.user.email}</Text>
                </View>

                {/* <View>
                    
                </View> */}

                <View style={styles.container2}>

                    <TextInput
                        placeholder="Password"
                        value={this.state.user.password}
                        style={{
                            ...styles.textInput1
                        }}
                        onChangeText={password => this.setState({ password: password })}
                        secureTextEntry={true}
                        underlineColorAndroid='rgba(0,0,0,0)' />


                    <Button style={styles.button} onPress={this.updatePassword}>
                        <Icon name="lock" size={20} style={{ color: 'black', marginRight: '20' }} />
                        <Text style={styles.buttonText}>  Change Password</Text>
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
        // borderRadius: 25,
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
export default ChangePassword;