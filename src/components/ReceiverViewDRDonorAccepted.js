import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Linking, Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
// import DRequestQRdialog from './DRequestQRdialog';


const ReceiverViewDRDonorAccepted = ({ dRequests, navigation}) => {

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const [uri] = useState();
    const [receiver, setReceiver] = useState({
        contact: '',
        coords: {
            latitude: '',
            longitude: ''
        }
    })

    useEffect(() => {
        firestore().collection('Users')
            .where('email', '==', dRequests.email).get()
            .then(snap => {
                const profile = snap.docs[0].data();
                setReceiver(profile)
            })
    }, [dRequests]);



    return (
        <Card style={{  marginVertical: 15, backgroundColor: "#e6e6e6"}}>
            <Card.Content>
                <Title style={{fontSize:18}}>Date Requested: {dRequests.dateRequested}</Title>
                <Title style={{fontSize:18}}>Orphanage Home Name: {dRequests.oName}</Title>
                <Title style={{fontSize:18}}>Care Taker Email: {dRequests.email}</Title>
                <Title style={{fontSize:18}}>Needed date: {dRequests.neededDateVal}</Title>
                <Title style={{fontSize:18}}>Accepted: {dRequests.accepted? 'YES': 'NO'}</Title>
                <Title style={{fontSize:18}}>Accepted By: {dRequests.acceptedBy}</Title>
                {/* <Title style={{fontSize:18}}>Delivery Status: {dRequests.isApproved == undefined? 'NO': 'YES'}</Title> */}
                <Title style={{fontSize:18}}>Delivery Status: {dRequests.isApproved == undefined? 'Not Delivered': 'Delivered'}</Title>
                <Title style={{fontSize:18}}>Description: {dRequests.description}</Title>
            </Card.Content>
            {/* <Card.Cover source={{ uri: uri }} /> */}
            <Card.Actions>
                
                 {/* {(dRequests.isApproved == undefined || dRequests.isApproved == false) && (
                    <> */}
                        <Button style={{width: "30%",
                                    backgroundColor: "#006666",
                                    borderRadius: 25,
                                    marginVertical: 16,
                                    paddingVertical: 12,
                                    marginRight: 5}} 
                                    onPress={() => Linking.openURL('google.navigation:q=' + receiver.coords.latitude + '+' + receiver.coords.longitude)}>

                        <Icon name="map-o" size={15} style={{ color: 'white', marginRight: '20' }} />
                        <Text style={{fontSize: 14,
                                        fontWeight: '500',
                                        color: 'white',
                                        textAlign: "center"}} > Maps</Text>
                        
                        </Button>
                        
                        <Button style={{width: "30%",
                                    backgroundColor: "#006666",
                                    borderRadius: 25,
                                    marginVertical: 16,
                                    paddingVertical: 12,
                                    marginRight: 5}} 
                                    onPress={() => Linking.openURL(`tel:${receiver.contact}`)}>
                            
                            <Icon name="phone" size={15} style={{ color: 'white', marginRight: '20' }} />
                            <Text style={{fontSize: 14,
                                        fontWeight: '500',
                                        color: 'white',
                                        textAlign: "center"}}> Call</Text>
                        </Button>
                        
                        {(dRequests.isApproved == undefined || dRequests.isApproved == false) && (
                        <>
                        <Button mode="contained" style={{width: "37%",
                                    backgroundColor: "#006666",
                                    borderRadius: 25,
                                    marginVertical: 16,
                                    paddingVertical: 12,
                                    marginRight: 5}}
                                    onPress={()=>navigation.navigate('QRscannerDRPage')}>
                        
                            <Icon name="qrcode" size={15} style={{ color: 'white', marginRight: '20' }} />
                            <Text style={{fontSize: 14,
                                        fontWeight: '500',
                                        color: 'white',
                                        textAlign: "center"}}> Received</Text>
                        </Button>
                    </>
                )} 
            
            
            </Card.Actions>
        </Card>
    )
};

export default ReceiverViewDRDonorAccepted;