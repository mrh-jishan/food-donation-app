import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';

const NearestHome = ({ vHome, acceptRequest }) => {




    return (
        <Card style={{ marginVertical: 15 }}>
            <Card.Content>
                <Text>Orphanage Home Name: {vHome.oName}</Text>
                <Title>Care Taker Name: {vHome.Name}</Title>
                <Title>Email: {vHome.email}</Title>
                <Title>Contact: {vHome.contact}</Title>
            </Card.Content>
            <Card.Actions>
                {/* <Button onPress={() => acceptRequest(nearestH)}>Accept</Button> */}
            </Card.Actions>
        </Card>
    )
};

export default NearestHome;