import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Linking, Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import QRdialog from './QRdialog';
import Icon from 'react-native-vector-icons/FontAwesome';

const FoodReceiverAccepted = ({ food }) => {

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
        // storage()
        //     .ref(food.img)
        //     .getDownloadURL().then(url => {
        //         setUri(url)
        //     });
        firestore().collection('Users')
            .where('email', '==', food.acceptedBy).get()
            .then(snap => {
                const profile = snap.docs[0].data();
                setReceiver(profile)
            })
    }, [food]);


    return (
        <Card style={{  marginVertical: 15, backgroundColor: "#e6e6e6"}}>
            <Card.Content>
                <Title style={{fontSize:18}}>Name: {food.name}</Title>
                <Title style={{fontSize:18}}>Date Posted: {food.dataPosted}</Title>
                <Title style={{fontSize:18}}>Manuf date: {food.manfDateVal}</Title>
                <Title style={{fontSize:18}}>Exp date: {food.expDateVal}</Title>
                <Title style={{fontSize:18}}>Type: {food.type}</Title>
                <Title style={{fontSize:18}}>Accepted: {food.accepted ? 'YES' : 'NO'}</Title>
                <Title style={{fontSize:18}}>Accepted By: {food.acceptedBy}</Title>
                <Title style={{fontSize:18}}>Delivery Status: {food.isApproved == undefined? 'Not Delivered': 'Delivered'}</Title>
                {/* <Title>Delivered: {food.isApproved == undefined? 'NO': 'YES'}</Title> */}
                <Title style={{fontSize:18}}>Description: {food.description}</Title>
            </Card.Content>
            <Card.Cover source={{ uri: food.img}} />
            <Card.Actions>
                <Button style={{width: "27%",
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
                
                
                <Button style={{width: "27%",
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
                        <Button style={{width: "44%",
                                    backgroundColor: "#006666",
                                    borderRadius: 25,
                                    marginVertical: 16,
                                    paddingVertical: 12,
                                    marginRight: 5}}
                                    onPress={showDialog}>

                        <Icon name="qrcode" size={15} style={{ color: 'white', marginRight: '20' }} />
                        <Text style={{fontSize: 14,
                                        fontWeight: '500',
                                        color: 'white',
                                        textAlign: "center"}} > Delivered</Text>
                        
                        </Button>
                        <QRdialog visible={visible} showDialog={showDialog} hideDialog={hideDialog} food={food} />
                    </>
                )} 
            </Card.Actions>
        </Card>
    )
};

export default FoodReceiverAccepted;