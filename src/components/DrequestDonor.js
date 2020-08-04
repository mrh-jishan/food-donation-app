import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';

const DrequestDonor = ({ dRequests, acceptRequest }) => {




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
                <Button onPress={() => acceptRequest(dRequests)}>Accept</Button>
            </Card.Actions>
        </Card>
    )
};

export default DrequestDonor;