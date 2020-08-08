import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import firestore from '@react-native-firebase/firestore';



class QRscanner extends Component {
    onSuccess = key => {
        firestore().collection('Foods').doc(key).update({isAccepted: true}).then(res=>{
            console.log('success',res);
            this.props.navigation.navigate('Receiver');
        }).catch(err=>{
            console.log('err: ', err);
        })
    };

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
            />
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