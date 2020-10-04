import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Food = ({ food, deleteFood, navigation }) => {

    const [uri, setUri] = useState()
    // useEffect(() => {
    //     storage()
    //         .ref(food.uri)
    //         .getDownloadURL().then(url => {
    //             setUri(url)
    //         })
    // });


    return (
        <Card style={{  marginVertical: 15, backgroundColor: "#e6e6e6"}}>
            <Card.Content>
                <Title style={{fontSize:18}}>Name: {food.name}</Title>
                <Title style={{fontSize:18}}>Date Posted: {food.dataPosted}</Title>
                <Title style={{fontSize:18}}>Manuf date: {food.manfDateVal}</Title>
                <Title style={{fontSize:18}}>Exp date: {food.expDateVal}</Title>
                <Title style={{fontSize:18}}>Type: {food.type}</Title>
                <Title style={{fontSize:18}}>Coverage: {food.coverage}</Title>
                <Title style={{fontSize:18}}>Description: {food.description}</Title>
            </Card.Content>
            <Card.Cover source={{ uri: food.img}} />

            <Card.Actions>
                    <Button style={{width: "49%",
                                    backgroundColor: "#006666",
                                    borderRadius: 25,
                                    marginVertical: 16,
                                    paddingVertical: 12,
                                    marginRight: 10}} 
                                    onPress={() => navigation.navigate('UpdateFood', { foodId: food.key })}>
                        <Icon name="edit" size={20} style={{ color: 'white', marginRight: '20' }} />
                        <Text style={{fontSize: 16,
                                        fontWeight: '500',
                                        color: 'white',
                                        textAlign: "center"}} >   Edit</Text>
                    </Button>

                    <Button style={{width: "49%",
                                    backgroundColor: "#006666",
                                    borderRadius: 25,
                                    marginVertical: 16,
                                    paddingVertical: 12,
                                    marginRight: 5}} 
                                    onPress={() => deleteFood(food)}>
                        <Icon name="trash-o" size={20} style={{ color: 'white', marginRight: '20' }} />
                        <Text style={{fontSize: 16,
                                        fontWeight: '500',
                                        color: 'white',
                                        textAlign: "center"}} >   Delete</Text>
                    </Button>

           
            </Card.Actions>
        </Card>
    )
};

export default Food;