import React from 'react';
import { Linking, Text } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const NearestHome = ({ vHome, acceptRequest }) => {




    return (
        <Card style={{ marginVertical: 15, backgroundColor: "#e6e6e6"}}>
            <Card.Content>
                <Title>Orphanage Home Name: {vHome.oName}</Title>
                <Title>Care Taker Name: {vHome.name}</Title>
                <Title>Email: {vHome.email}</Title>
                <Title>Contact: {vHome.contact}</Title>
                <Title>Address: {vHome.address}</Title>
                <Title>Distance: {vHome.distance} KM</Title>
                <Title>Coords: {vHome.coords.longitude}, {vHome.coords.latitude}</Title>
                <Title>Account Holder Name: {vHome.accountHolder}</Title>
                <Title>Bank Name: {vHome.bankName}</Title>
                <Title>Account Number: {vHome.accountNum}</Title>
            </Card.Content>
            <Card.Actions>
                    <Button style={{width: "60%",
                                    backgroundColor: "#006666",
                                    borderRadius: 25,
                                    marginVertical: 16,
                                    paddingVertical: 12,
                                    marginRight: 5}} 
                                    onPress={() => Linking.openURL('google.navigation:q=' + vHome.coords.latitude + '+' + vHome.coords.longitude)}>
                        <Icon name="map-o" size={20} style={{ color: 'white', marginRight: '20' }} />
                        <Text style={{fontSize: 16,
                                        fontWeight: '500',
                                        color: 'white',
                                        textAlign: "center"}} >   Follow In Map</Text>
                    </Button>

                    <Button style={{width: "38%",
                                    backgroundColor: "#006666",
                                    borderRadius: 25,
                                    marginVertical: 16,
                                    paddingVertical: 12,
                                    marginRight: 5}} 
                                    onPress={() => Linking.openURL(`tel:${vHome.contact}`)}>
                            
                            <Icon name="phone" size={15} style={{ color: 'white', marginRight: '20' }} />
                            <Text style={{fontSize: 14,
                                        fontWeight: '500',
                                        color: 'white',
                                        textAlign: "center"}}> Call</Text>
                        </Button>
               
            </Card.Actions>
        </Card>
    )
};





export default NearestHome;