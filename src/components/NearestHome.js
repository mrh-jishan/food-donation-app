import React from 'react';
import { Linking, Text } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';

const NearestHome = ({ vHome, acceptRequest }) => {




    return (
        <Card style={{ marginVertical: 15 }}>
            <Card.Content>
                <Text>Orphanage Home Name: {vHome.oName}</Text>
                <Title>Care Taker Name: {vHome.Name}</Title>
                <Title>Email: {vHome.email}</Title>
                <Title>Contact: {vHome.contact}</Title>
                <Text>Address: {vHome.address}</Text>
                <Text>Distance: {vHome.distance} KM</Text>
                <Text>Coords: {vHome.coords.longitude}, {vHome.coords.latitude}</Text>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => Linking.openURL('google.navigation:q=' + vHome.coords.latitude + '+' + vHome.coords.longitude)}>Follow In Map</Button>
            </Card.Actions>
        </Card>
    )
};

export default NearestHome;