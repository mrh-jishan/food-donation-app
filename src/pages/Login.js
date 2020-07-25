import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Logo from '../components/Logo';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleFormSubmit = () => {
        console.log(this.state);
    }

    render() {
        return (
            <View style={styles.container}>
                <Logo />
                <TextInput
                    label="Email"
                    style={styles.textInput}
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    label="Password"
                    style={styles.textInput}
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                />

                <Button
                    mode="contained"
                    style={{
                        width: '100%',
                        marginVertical: 10,
                    }}
                    onPress={() => console.log('Pressed')}>
                    Login
                </Button>

                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}><Text style={styles.signupButton}>Signup</Text></TouchableOpacity>
                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#455a64',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    textInput: {
        width: "100%",
        marginVertical: 10,

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
});
export default Login;