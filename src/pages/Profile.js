import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { Text, View } from 'react-native';

class Profile extends React.Component {

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
            <View>
                <Text>User Profile</Text>
                <Text>Name: {this.state.user.name}</Text>
                <Text>Email: {this.state.user.email}</Text>
                <Text>User Type: {this.state.user.type}</Text>
                <Text>Contact: {this.state.user.contact}</Text>
            </View>
        )
    }
}

export default Profile;