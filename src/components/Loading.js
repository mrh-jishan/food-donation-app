import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Animated, Image} from 'react-native';
import { AuthContext } from './../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';

class Loading extends React.Component {
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
            // useNativeDriver: true,
          }).start(),
    
          Animated.timing(LogoText, {
            toValue: 1,
            duration: 1200,
            // useNativeDriver: true,
          }),
          
          
        ]).start(() => {
          this.setState({
            loadingSpinner: false,
          });
          // code here


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

export default Loading;
