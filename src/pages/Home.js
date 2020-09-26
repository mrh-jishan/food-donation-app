import React, {Component} from 'react';
import { StatusBar, StyleSheet, Text, View, Animated, Image, ActivityIndicator} from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from './../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';

import Login from '../pages/Login';



class Home extends React.Component {
  static contextType = AuthContext

    state ={
        LogoAnime: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        loadingSpinner: false,

    };

    componentDidMount() {
        // const user = auth().currentUser;
       // console.log('user current: ', user);
        const {LogoAnime, LogoText} = this.state;
        Animated.parallel([
          Animated.spring(LogoAnime, {
            toValue: 1,
            tension: 10,
            friction: 2,
            duration: 1000,
          }).start(),
    
          Animated.timing(LogoText, {
            toValue: 1,
            duration: 1200,
          }),
        ]).start(() => {
          this.setState({
            loadingSpinner: true,
          });
          // code here

          // console.log('user: ', user);
          // if (user == null){
          //   this.props.navigation.navigate('Login')
          // }else{

          //   console.log('context: ',this.context);
          // }
          //log(context)
          // this.context.user
          // if (user.type == 'donor'){
          //   this.props.navigation.navigate('DonorDashboard')
          // }
          // else{
          //   this.props.navigation.navigate('ReceiverDashboard')
          // }

          // this.props.navigation.navigate('Login')
        //   navigation={this.props.navigation.navigate('Login')}
          //setTimeout(switchToAuth, 1500);
        });
      }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        opacity: this.state.LogoAnime,
                        top: this.state.LogoAnime.interpolate({
                        inputRange: [0, 1],
                        outputRange: [80, 0],
                        }),
                    }}>
                    <Image style={{width:250, height:80}}
                    source={require('../images/logo.png')}/>

                    {this.state.loadingSpinner ? (
                                <ActivityIndicator
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                size="large"
                                color="#5257f2"
                                />
                            ) : null}

                </Animated.View>
                
                <Animated.View style={{opacity: this.state.LogoText}}>
                    <Text style={styles.logoText}>Welcome to eFeed</Text>
                </Animated.View>
            </View>

        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#455a64',
        alignItems: 'center',
        justifyContent: 'center'
            },
    logoText: {
        color: '#ffffff',
        fontFamily: 'GoogleSans-Bold',
        fontSize: 25,
        marginTop: 29.1,
        fontWeight: '300',
    }
});

export default Home;





// import React from 'react';
// import { StatusBar, StyleSheet, Text, View } from 'react-native';
// import { Button } from 'react-native-paper';

// class Home extends React.Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <StatusBar backgroundColor="#1c313a" barStyle="light-content" />
//                 <Text style={{ color: '#ffffff', fontSize: 18 }}>Hi friend</Text>
//                 <Button style={{ margin: 10 }} mode="contained" onPress={() => this.props.navigation.navigate('Login')}>Go TO LOGIN</Button>
//                 <Button style={{ margin: 10 }} mode="contained" onPress={() => this.props.navigation.navigate('Signup')}>Go TO Register</Button>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#455a64',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     textInput: {
//         paddingLeft: 15,
//         paddingRight: 15

//     }
// });

// export default Home;