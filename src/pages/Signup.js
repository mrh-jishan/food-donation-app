import { Picker } from '@react-native-community/picker';
import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView
} from 'react-native';
import Logo from '../components/Logo';


const user = [{
    label: 'Donor',
    value: 1
},
{
    label: 'Receiver',
    value: 2
}];

class Signup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            pnumber: '',
            password: '',
            cpassword: '',
            type: ''
        }
    }

    handleFormSubmit = () => {
        console.log(this.state);
    }

    render() {

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Logo />
                    <View style={{
                        borderRadius: 25,
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.3)',
                        overflow: 'hidden'
                    }}>
                        <Picker
                            selectedValue={this.state.type}
                            style={{ ...styles.inputBox, marginVertical: 0 }}
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ type: itemValue })
                            }>
                            <Picker.Item label="Select User Type" value="" />
                            <Picker.Item label="Donor" value="Donor" />
                            <Picker.Item label="Receiver" value="Receiver" />
                        </Picker>
                    </View>

                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Email"
                        placeholderTextColor="#ffffff"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                        onSubmitEditing={() => this.username.focus} />

                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Username"
                        placeholderTextColor="#ffffff"
                        selectionColor="#fff"
                        value={this.state.username}
                        onChangeText={text => this.setState({ username: text })}
                        onSubmitEditing={() => this.contact.focus} />

                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Phone Number"
                        placeholderTextColor="#ffffff"
                        selectionColor="#fff"
                        value={this.state.pnumber}
                        onChangeText={text => this.setState({ pnumber: text })}
                        onSubmitEditing={() => this.password.focus} />

                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="#ffffff"
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                        ref={(input) => this.password = input}
                        onSubmitEditing={() => this.cpassword.focus} />

                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        placeholderTextColor="#ffffff"
                        value={this.state.cpassword}
                        onChangeText={text => this.setState({ cpassword: text })}
                        ref={(input) => this.cpassword = input} />
                    {/* <Form type="Login" auth={this.state.auth}/> */}

                    <TouchableOpacity style={styles.button}
                        onPress={this.handleFormSubmit.bind(this)}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={styles.signupTextCont}>
                        <Text style={styles.signupText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.signupButton}>Sign In</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#455a64',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },

    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 18
    },

    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 6,

    },

    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },

    button: {
        width: 300,
        backgroundColor: "#1c313a",
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: "center"
    }
});
export default Signup;