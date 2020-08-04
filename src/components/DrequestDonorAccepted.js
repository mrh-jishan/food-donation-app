import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';

const DrequestDonorAccepted = ({ dRequests, acceptRequest }) => {

    // const [uri, setUri] = useState()
    // useEffect(() => {
    //     storage()
    //         .ref(food.img)
    //         .getDownloadURL().then(url => {
    //             setUri(url)
    //         })
    // });


    return (
        <Card style={{ marginVertical: 15 }}>
            <Card.Content>
            <Text>Date Requested: {dRequests.dateRequested}</Text>
                <Title>Orphanage Home Name: {dRequests.oName}</Title>
                <Title>Care Taker Name: {dRequests.cName}</Title>
                <Text>Needed date: {dRequests.neededDateVal}</Text>
                <Text>Accepted: {dRequests.accepted? 'YES': 'NO'}</Text>
                <Text>Accepted By: {dRequests.acceptedBy}</Text>
                <Paragraph>Description: {dRequests.description}</Paragraph>
            </Card.Content>
            {/* <Card.Cover source={{ uri: uri }} /> */}
            {/* <Card.Actions>
                <Button onPress={() => acceptFood(food)}>Accept</Button>
            </Card.Actions> */}
        </Card>
    )
};

export default DrequestDonorAccepted;