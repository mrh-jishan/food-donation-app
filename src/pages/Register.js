import React from 'react'
import {View,Text, Button, TextInput, StyleSheet} from 'react-native';

class Register extends React.Component{
    render(){
        return(
            <View>
                <Text>Hi friend</Text>
                <Button title="Go TO Register Page" 
                    onPress={() =>this.props.navigation.navigate('Home')} />
            </View>
        )
    }
}

export default Register;