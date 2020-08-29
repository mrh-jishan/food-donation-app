import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const DonationCard = ({ dRequests, deleteDonationRequest, navigation }) => {
    return (
        <Card style={{  marginVertical: 15, backgroundColor: "#e6e6e6"}}>
            <Card.Content>
                <Title>Date Requested: {dRequests.dateRequested}</Title>
                <Title>Orphanage Home Name: {dRequests.oName}</Title>
                <Title>Care Taker Name: {dRequests.name}</Title>
                <Title>Needed date: {dRequests.neededDateVal}</Title>
                <Title>Description: {dRequests.description}</Title>
            </Card.Content>
            <Card.Actions>
                <Button style={{width: "49%",
                                    backgroundColor: "#006666",
                                    borderRadius: 25,
                                    marginVertical: 16,
                                    paddingVertical: 12,
                                    marginRight: 5}} 
                                    onPress={() => navigation.navigate('UpdateDonationRequest', { dRequestsId: dRequests.key })}>

                        <Icon name="edit" size={15} style={{ color: 'white', marginRight: '20' }} />
                        <Text style={{fontSize: 14,
                                        fontWeight: '500',
                                        color: 'white',
                                        textAlign: "center"}} > Edit</Text>
                </Button>
                
                <Button style={{width: "49%",
                                    backgroundColor: "#006666",
                                    borderRadius: 25,
                                    marginVertical: 16,
                                    paddingVertical: 12,
                                    marginRight: 5}}
                                    onPress={() => deleteDonationRequest(dRequests)}>

                        <Icon name="trash-o" size={15} style={{ color: 'white', marginRight: '20' }} />
                        <Text style={{fontSize: 14,
                                        fontWeight: '500',
                                        color: 'white',
                                        textAlign: "center"}} > Delete</Text>
                </Button>
            </Card.Actions>
        </Card>
    )
};

export default DonationCard;