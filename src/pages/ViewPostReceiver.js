import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import FoodReceiver from '../components/FoodReceiver';

class ViewPostedReceiver extends React.Component {

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
                if (data.accepted == undefined) {
                    foods.push({
                        ...data,
                        key: food.id,
                    });
                }
            });
            this.setState({ foods: foods })
        })
    }

    acceptFood = (food) => {
        firestore()
            .collection('Foods')
            .doc(food.key)
            .update({ accepted: true, acceptedBy: auth().currentUser.email })
            .then(() => {
                console.log('Food updated!');
            });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 22
                }}>Update Posted Food</Text>

                {this.state.foods.length > 0 && (
                    this.state.foods.map((food, index) => (
                        <FoodReceiver food={food}
                            acceptFood={this.acceptFood}
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


export default ViewPostedReceiver;