import auth from '@react-native-firebase/auth';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

class DonorDashboard extends React.Component {

    logout = () => {
        auth().signOut().then(() => {
            this.props.navigation.navigate('Home');
        });
    }
    render() {
        return (
            <View>
                <Text>This is donor page</Text>
                <Button onPress={() => this.props.navigation.navigate('PostFood')}>Post Food</Button>
                <Button>Manage Food</Button>
                <Button>View Donation Food</Button>
                <Button onPress={this.logout}>Logout</Button>
            </View>
        )
    }
}

export default DonorDashboard;