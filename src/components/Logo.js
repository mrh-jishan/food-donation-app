import React from 'react'
import {
    View,
    Text, 
    Button, 
    TextInput, 
    Image,
    StyleSheet
} from 'react-native';

class Logo extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Image style={{width:200, height:120}}
                    source={require('../images/logo.png')}/>
                <Text style={styles.logoText}>Welcome to eFeed</Text>
             </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 30,
        alignItems:'center'
    },
    logoText : {
        marginVertical: 15,
        fontSize:20,
        color:'rgba(255, 255, 255, 0.7)'
    }

});
export default Logo;