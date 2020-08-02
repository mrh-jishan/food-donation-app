import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';

const FoodReceiverAccepted = ({ food, acceptFood }) => {

    const [uri, setUri] = useState()
    useEffect(() => {
        storage()
            .ref(food.img)
            .getDownloadURL().then(url => {
                setUri(url)
            })
    });


    return (
        <Card style={{ marginVertical: 15 }}>
            <Card.Content>
                <Title>Name: {food.name}</Title>
                <Text>Date Posted: {food.dataPosted}</Text>
                <Text>Manuf date: {food.manfDateVal}</Text>
                <Text>Exp date: {food.expDateVal}</Text>
                <Text>Type: {food.type}</Text>
                <Text>Accepted: {food.accepted? 'YES': 'NO'}</Text>
                <Text>Accepted By: {food.acceptedBy}</Text>
                <Paragraph>Description: {food.description}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: uri }} />
            {/* <Card.Actions>
                <Button onPress={() => acceptFood(food)}>Accept</Button>
            </Card.Actions> */}
        </Card>
    )
};

export default FoodReceiverAccepted;