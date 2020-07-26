import React from 'react'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-paper';

class DonorDashboard extends React.Component {
    render(){
        return(
            <View>
                <Text>This is donor page</Text>
                <Button onPress={()=> this.props.navigation.navigate('PostFood')}>Post Food</Button>
                <Button>Manage Food</Button>
                <Button>View Donation Food</Button>
            </View>
        )
    }
}

export default DonorDashboard;