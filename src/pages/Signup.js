import React from 'react'
import {
    View,
    Text, 
    Button, 
    TextInput, 
    StatusBar,
    StyleSheet,
    TouchableOpacity 
} from 'react-native';

import Logo from '../components/Logo'
// import Form from '../components/Form'

const user = [{
    label: 'Donor',
    value: 1
},
{
    label: 'Receiver',
    value: 2
}];

class Signup extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            email: '',
            username: '',
            pnumber: '',
            password: '',
            cpassword: ''
        }
    }

    handleFormSubmit = ()=>{
        console.log(this.state);
    }

    render(){
      
        return(
            <>
                <Dropdown label='Sign Up As:' data={this.user} />
           
            <View style={styles.container}>
                <Logo/>
                <TextInput style={styles.inputBox} 
               underlineColorAndroid='rgba(0,0,0,0)' 
               placeholder="Email"
               placeholderTextColor="#ffffff"
               selectionColor="#fff"
               keyboardType="email-address"
               value={this.state.email}
               onChangeText={text=> this.setState({email: text})}
               onSubmitEditing={() => this.username.focus}/>

                <TextInput style={styles.inputBox} 
               underlineColorAndroid='rgba(0,0,0,0)' 
               placeholder="Username"
               placeholderTextColor="#ffffff"
               selectionColor="#fff"
               value={this.state.username}
               onChangeText={text=> this.setState({username: text})}
               onSubmitEditing={() => this.contact.focus}/> 

                <TextInput style={styles.inputBox} 
               underlineColorAndroid='rgba(0,0,0,0)' 
               placeholder="Phone Number"
               placeholderTextColor="#ffffff"
               selectionColor="#fff"
               value={this.state.pnumber}
               onChangeText={text=> this.setState({pnumber: text})}
               onSubmitEditing={() => this.password.focus}/>        

                <TextInput style={styles.inputBox} 
               underlineColorAndroid='rgba(0,0,0,0)' 
               placeholder="Password"
               secureTextEntry={true}
               placeholderTextColor="#ffffff"
               value={this.state.password}
               onChangeText={text=> this.setState({password: text})}   
               ref={(input) => this.password = input}
               onSubmitEditing={() => this.cpassword.focus}/> 
                {/* <Form type="Login" auth={this.state.auth}/> */}

                <TextInput style={styles.inputBox} 
               underlineColorAndroid='rgba(0,0,0,0)' 
               placeholder="Confirm Password"
               secureTextEntry={true}
               placeholderTextColor="#ffffff"
               value={this.state.cpassword}
               onChangeText={text=> this.setState({cpassword: text})}   
               ref={(input) => this.cpassword = input}/>
                {/* <Form type="Login" auth={this.state.auth}/> */}
               
                <TouchableOpacity style={styles.button}
                    onPress={this.handleFormSubmit.bind(this)}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() =>this.props.navigation.navigate('Login')}>
                        <Text style={styles.signupButton}>Sign In</Text></TouchableOpacity>
                </View>
            </View>
            </>
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

    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },

    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize:18
    },

    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        marginLeft:6,

    },
    
    inputBox: {
        width:300,
        backgroundColor:'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize:16,
        color: '#ffffff',
        marginVertical: 10
    },

    button: {
        width:300,
        backgroundColor:"#1c313a",
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
    },

    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign: "center"
    }
});
export default Signup;