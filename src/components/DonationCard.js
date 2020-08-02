import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';

const DonationCard = ({ dRequests, deleteDonationRequest, navigation }) => {

    // const [uri, setUri] = useState()
    // useEffect(() => {
    //     storage()
    //         .ref(DonationRequest.img)
    //         .getDownloadURL().then(url => {
    //             setUri(url)
    //         })
    // });


    return (
        <Card style={{ marginVertical: 15 }}>
            <Card.Content>
                    {/* oName: this.state.oName,
                    cName: this.state.cName,
                    dateRequested: this.state.dateRequested, */}
                    {/* location: '',
                    contact: '', */}
                    {/* description: this.state.description,
                    neededDateVal: this.state.neededDateVal, */}
                <Text>Date Requested: {dRequests.dateRequested}</Text>
                <Title>Orphanage Home Name: {dRequests.oName}</Title>
                <Title>Care Taker Name: {dRequests.cName}</Title>
                <Text>Needed date: {dRequests.neededDate}</Text>
                <Paragraph>Description: {dRequests.description}</Paragraph>
            </Card.Content>
            {/* <Card.Cover source={{ uri: uri }} /> */}
            <Card.Actions>
                <Button onPress={() => navigation.navigate('UpdateDonationRequest', { dRequestsId: dRequests.key })}>Edit</Button>
                <Button onPress={() => deleteDonationRequest(dRequests)}>Delete</Button>
            </Card.Actions>
        </Card>
    )
};

export default DonationCard;