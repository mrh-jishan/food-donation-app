import React from 'react'
import {View,Text, Button, TextInput} from 'react-native';

class Home extends React.Component{
    render(){
        return(
            <View>
                <Text>This is a home page</Text>
                <Button title="Go TO LOGIN" onPress={() =>this.props.navigation.navigate('Login')} />
                <Button title="Go TO Register" onPress={() =>this.props.navigation.navigate('Register')} />
            </View>
        )
    }
}

export default Home;