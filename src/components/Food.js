import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';

const Food = ({ food, deleteFood, navigation }) => {

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
                <Text>Manuf date: {food.manfDate}</Text>
                <Text>Exp date: {food.expDate}</Text>
                <Text>Type: {food.type}</Text>
                <Paragraph>Description: {food.description}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: uri }} />
            <Card.Actions>
                <Button onPress={() => navigation.navigate('UpdateFood')}>Edit</Button>
                <Button onPress={() => deleteFood(food)}>Delete</Button>
            </Card.Actions>
        </Card>
    )
};

export default Food;