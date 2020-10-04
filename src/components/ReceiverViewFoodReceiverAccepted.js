import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Linking, Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
// import QRdialog from './QRdialog';

const ReceiverViewFoodReceiverAccepted = ({ food,  navigation}) => {

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);


    const [uri, setUri] = useState();
    // const [receiver, setReceiver] = useState({
    const [donor, setDonor] = useState({
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
                setDonor(profile)
            })
    }, [food]);


    return (
        <Card style={{ marginVertical: 15 }}>
            <Card.Content>
                <Title style={{fontSize:18}}>Name: {food.name}</Title>
                <Title style={{fontSize:18}}>Date Posted: {food.dataPosted}</Title>
                <Title style={{fontSize:18}}>Manuf date: {food.manfDateVal}</Title>
                <Title style={{fontSize:18}}>Exp date: {food.expDateVal}</Title>
                <Title style={{fontSize:18}}>Type: {food.type}</Title>
                <Title style={{fontSize:18}}>Accepted: {food.accepted ? 'YES' : 'NO'}</Title>
                <Title style={{fontSize:18}}>Posted By: {food.email}</Title>
                <Title style={{fontSize:18}}>Delivery Check-in: {food.isApproved == undefined? 'Not Delivered': 'Delivered'}</Title>
                <Title style={{fontSize:18}}>Description: {food.description}</Title>
            </Card.Content>
            <Card.Cover source={{ uri: food.img}} />
            <Card.Actions>
                
                        <Button  style={{width: "30%",
                                    backgroundColor: "#006666",
                                    borderRadius: 25,
                                    marginVertical: 16,
                                    paddingVertical: 12,
                                    marginRight: 5}} 
                                    onPress={() => Linking.openURL('google.navigation:q=' + donor.coords.latitude + '+' + donor.coords.longitude)}>
                        
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
                                    onPress={() => Linking.openURL(`tel:${donor.contact}`)}>
                        
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
                                    onPress={()=>navigation.navigate('QRscannerPage')}>
                        
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