import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import firestore from '@react-native-firebase/firestore';



class QRscanner extends Component {
    onSuccess = key => {
        console.log('ket send', key);
        firestore().collection('Foods').doc(key.data).update({isApproved: true}).then(res=>{
            console.log('success',res);
            Alert.alert(
                "Alert Title",
                "Received",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            this.props.navigation.navigate('ReceiverDashboard');
        }).catch(err=>{
            console.log('err: ', err);
        })
    };

    render() {
        return (
            <View>
                <Text>Hello</Text>
<QRCodeScanner
                onRead={this.onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
            />
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});


export default QRscanner