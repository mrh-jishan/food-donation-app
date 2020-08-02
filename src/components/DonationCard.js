import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';

const DonationCard = ({ dRequests, deleteDonationRequest, navigation }) => {
    return (
        <Card style={{ marginVertical: 15 }}>
            <Card.Content>
                <Text>Date Requested: {dRequests.dateRequested}</Text>
                <Title>Orphanage Home Name: {dRequests.oName}</Title>
                <Title>Care Taker Name: {dRequests.cName}</Title>
                <Text>Needed date: {dRequests.neededDateVal}</Text>
                <Paragraph>Description: {dRequests.description}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => navigation.navigate('UpdateDonationRequest', { dRequestsId: dRequests.key })}>Edit</Button>
                <Button onPress={() => deleteDonationRequest(dRequests)}>Delete</Button>
            </Card.Actions>
        </Card>
    )
};

export default DonationCard;