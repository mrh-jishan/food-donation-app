import React from 'react';
import { Linking, Text } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const NearestHome = ({ vHome, acceptRequest }) => {




    return (
        <Card style={{ marginVertical: 15, backgroundColor: "#e6e6e6"}}>
            <Card.Content>
                <Title style={{fontSize:15}}>Orphanage Home Name: {vHome.oName}</Title>
                <Title style={{fontSize:15}}>Care Taker Name: {vHome.name}</Title>
                <Title style={{fontSize:15}}>Email: {vHome.email}</Title>
                <Title style={{fontSize:15}}>Contact: {vHome.contact}</Title>
                <Title style={{fontSize:15}}>Address: {vHome.address}</Title>
                <Title style={{fontSize:15}}>Distance: {vHome.distance} KM</Title>
                <Title style={{fontSize:15}}>Coords: {vHome.coords.longitude}, {vHome.coords.latitude}</Title>
                <Title style={{fontSize:15}}>Account Holder Name: {vHome.accountHolder}</Title>
                <Title style={{fontSize:15}}>Bank Name: {vHome.bankName}</Title>
                <Title style={{fontSize:15}}>Account Number: {vHome.accountNum}</Title>
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