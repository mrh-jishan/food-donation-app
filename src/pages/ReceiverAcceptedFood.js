import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import ReceiverViewFoodReceiverAccepted from '../components/ReceiverViewFoodReceiverAccepted';

class ReceiverAcceptedRequest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            foods: [],
        }
    }

    componentDidMount() {
        firestore().collection('Foods').onSnapshot(snap => {
            const foods = [];
            snap.forEach(food => {
                const data = food.data();
                if (data.accepted == true && data.acceptedBy == auth().currentUser.email) {
                    foods.push({
                        ...data,
                        key: food.id,
                    });
                }
            });
            this.setState({ foods: foods })
        })
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 22
                }}>Receiver Accepted Food</Text>

            <Button mode="contained" style={{ margin: 10 }} onPress={()=>this.props.navigation.navigate('QRscannerPage')}>Scan QR</Button>

                {this.state.foods.length > 0 && (
                    this.state.foods.map((food, index) => (
                        <ReceiverViewFoodReceiverAccepted food={food}

                            key={index}
                            navigation={this.props.navigation}
                        />
                    ))
                )}

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 15,

    },
    textInput: {
        width: "100%",
        marginVertical: 10,
        color: '#008080',
        borderRadius: 25,
        paddingHorizontal: 16

    },

    button: {
        width: 300,
        backgroundColor: "#006666",
        borderRadius: 25,
        marginVertical: 16,
        paddingVertical: 12,
        marginLeft: 30

    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: "center"
    },


});


export default ReceiverAcceptedRequest;