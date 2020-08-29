import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Linking, Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
// import QRdialog from './QRdialog';

const ReceiverViewFoodReceiverAccepted = ({ food }) => {

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);


    const [uri, setUri] = useState();
    const [receiver, setReceiver] = useState({
        contact: '',
        coords: {
            latitude: '',
            longitude: ''
        }
    })
    useEffect(() => {
        storage()
            .ref(food.img)
            .getDownloadURL().then(url => {
                setUri(url)
            });
        firestore().collection('Users')
            .where('email', '==', food.acceptedBy).get()
            .then(snap => {
                const profile = snap.docs[0].data();
                setReceiver(profile)
            })
    }, [food]);


    return (
        <Card style={{ marginVertical: 15 }}>
            <Card.Content>
                <Title>Name: {food.name}</Title>
                <Title>Date Posted: {food.dataPosted}</Title>
                <Title>Manuf date: {food.manfDateVal}</Title>
                <Title>Exp date: {food.expDateVal}</Title>
                <Title>Type: {food.type}</Title>
                <Title>Accepted: {food.accepted ? 'YES' : 'NO'}</Title>
                <Title>Accepted By: {food.acceptedBy}</Title>
                <Title>Delivered: {food.isApproved == undefined? 'NO': 'YES'}</Title>
                <Title>Description: {food.description}</Title>
            </Card.Content>
            <Card.Cover source={{ uri: uri }} />
            <Card.Actions>
                
                        <Button  style={{width: "30%",
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
                                        textAlign: "center"}} > Call</Text>
                        </Button>
                {(food.isApproved == undefined || food.isApproved == false) && (
                        <>
                        <Button mode="contained" style={{width: "37%",
                                    backgroundColor: "#006666",
                                    borderRadius: 25,
                                    marginVertical: 16,
                                    paddingVertical: 12,
                                    marginRight: 5}}
                                    onPress={()=>this.props.navigation.navigate('QRscannerPage')}>
                        
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

export default ReceiverViewFoodReceiverAccepted;