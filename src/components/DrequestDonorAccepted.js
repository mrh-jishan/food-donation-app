import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Linking, Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import DRequestQRdialog from './DRequestQRdialog';

const DrequestDonorAccepted = ({ dRequests}) => {

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
        <Card style={{ marginVertical: 15 }}>
            <Card.Content>
                <Text>Date Requested: {dRequests.dateRequested}</Text>
                <Title>Orphanage Home Name: {dRequests.oName}</Title>
                <Title>Care Taker Email: {dRequests.email}</Title>
                <Text>Needed date: {dRequests.neededDateVal}</Text>
                <Text>Accepted: {dRequests.accepted? 'YES': 'NO'}</Text>
                <Text>Accepted By: {dRequests.acceptedBy}</Text>
                <Text>Delivered: {dRequests.isApproved == undefined? 'NO': 'YES'}</Text>
                <Paragraph>Description: {dRequests.description}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: uri }} />
            <Card.Actions>
                <Button onPress={() => Linking.openURL('google.navigation:q=' + receiver.coords.latitude + '+' + receiver.coords.longitude)}>Follow In Map</Button>
                <Button onPress={() => Linking.openURL(`tel:${receiver.contact}`)}>Call User</Button>
                {/* <Button onPress={showDialog}>View QR</Button>
                <DRequestQRdialog visible={visible} showDialog={showDialog} hideDialog={hideDialog} dRequests={dRequests} /> */}
                
                 {(dRequests.isApproved == undefined || dRequests.isApproved == false) && (
                    <>
                        <Button onPress={showDialog}>View QR</Button>
                        <DRequestQRdialog visible={visible} showDialog={showDialog} hideDialog={hideDialog} dRequests={dRequests} />
                    </>
                )} 
            
            
            </Card.Actions>
        </Card>
    )
};

export default DrequestDonorAccepted;