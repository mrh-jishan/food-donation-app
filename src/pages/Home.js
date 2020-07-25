import React from 'react'
import {
    View,
    Text, 
    Button, 
    TextInput, 
    StatusBar,
    StyleSheet
} from 'react-native';

class Home extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#1c313a"
                    barStyle="light-content"
                />
                <Text style={{color:'#ffffff', fontSize:18}}>Hi friend</Text>
                <Button title="Go TO LOGIN" onPress={() =>this.props.navigation.navigate('Login')} />
                <Button title="Go TO Register" onPress={() =>this.props.navigation.navigate('Signup')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
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