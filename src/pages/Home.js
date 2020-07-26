import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';

class Home extends React.Component {
    componentDidMount() {
        const user = auth().currentUser;
        if (user) {
            firestore().collection('Users').where('email', '==', user.email).get()
                .then(snap => {
                    const cUser = snap.docs[0].data();
                    if (cUser.type == 'donor') {
                        this.props.navigation.navigate('Donor');
                    } else if (cUser.type == 'receiver') {
                        this.props.navigation.navigate('Receiver');
                    }
                })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#1c313a"
                    barStyle="light-content"
                />
                <Text style={{ color: '#ffffff', fontSize: 18 }}>Hi friend</Text>
                <Button title="Go TO LOGIN" onPress={() => this.props.navigation.navigate('Login')} />
                <Button title="Go TO Register" onPress={() => this.props.navigation.navigate('Signup')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#455a64',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textInput: {
        paddingLeft: 15,
        paddingRight: 15

    }
});

export default Home;