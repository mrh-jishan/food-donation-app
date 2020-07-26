import React from 'react'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-paper';

class ReceiverDashboard extends React.Component {
    logout = () => {
        auth().signOut().then(() => {
            this.props.navigation.navigate('Home');
        });
    }
    render() {
        return (
            <View>
                <Text>This is receiver page</Text>            
                <Button onPress={this.logout}>Logout</Button>
            </View>
        )
    }
}

export default ReceiverDashboard;