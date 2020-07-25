import React from 'react'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth';

class Dashboard extends React.Component {
    render(){
        return(
            <View>
                <Text>This is home page</Text>
            </View>
        )
    }
}

export default Dashboard;