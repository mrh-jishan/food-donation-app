import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const FoodReceiver = ({ food, acceptFood }) => {

    const [uri, setUri] = useState()
    // useEffect(() => {
    //     storage()
    //         .ref(food.img)
    //         .getDownloadURL().then(url => {
    //             setUri(url)
    //         })
    // }, []);


    return (
        <Card style={{  marginVertical: 15, backgroundColor: "#e6e6e6"}}>
            <Card.Content>
                <Title style={{fontSize:18}}>Name: {food.name}</Title>
                <Title style={{fontSize:18}}>Date Posted: {food.dataPosted}</Title>
                <Title style={{fontSize:18}}>Manufactured date: {food.manfDateVal}</Title>
                <Title style={{fontSize:18}}>Expiry date: {food.expDateVal}</Title>
                <Title style={{fontSize:18}}>Type: {food.type}</Title>
                <Title style={{fontSize:18}}>Description: {food.description}</Title>
            </Card.Content>
            <Card.Cover source={{ uri: food.img}} />
            <Card.Actions>
                <Button style={{width: "100%",
                                backgroundColor: "#006666",
                                borderRadius: 25,
                                marginVertical: 16,
                                paddingVertical: 12,
                                marginRight: 5}}
                                onPress={() => acceptFood(food)}>

                    <Icon name="check" size={20} style={{ color: 'white', marginRight: '20' }} />
                    <Text style={{fontSize: 16,
                                        fontWeight: '500',
                                        color: 'white',
                                        textAlign: "center"}}>   Accept Posted Food</Text>
                
                </Button>
            </Card.Actions>
        </Card>
    )
};

export default FoodReceiver;