import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, Text, Alert } from 'react-native';
import FoodReceiver from '../components/FoodReceiver';

class ViewPostReceiver extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            foods: [],
        }
    }

    // componentDidMount() {
    //     firestore().collection('Foods').onSnapshot(snap => {
    //         const foods = [];
    //         snap.forEach(food => {
    //             const data = food.data();
    //             if (data.accepted == undefined) {
    //                 foods.push({
    //                     ...data,
    //                     key: food.id,
    //                 });
    //             }
    //         });
    //         this.setState({ foods: foods })
    //     })
    // }

    componentDidMount() {
        const nowTime = new Date().getTime();
        firestore().collection('Foods')
            //.orderBy("expDateVal")
            .onSnapshot(snap => {
                const foods = snap.docs
                    .map(food => {

                        return {
                            ...food?.data(),
                            key: food.id
                        }
                    })
                    .filter(data => data.accepted == undefined)
                .filter(data => new Date(data.expDateVal).getTime() > nowTime)
                this.setState({ foods: foods.sort((obj1, obj2) => new Date(obj1.expDateVal).getTime() - new Date(obj2.expDateVal).getTime()) })
            })
    }

    acceptFood = (food) => {
        firestore()
            .collection('Foods')
            .doc(food.key)
            .update({ accepted: true, acceptedBy: auth().currentUser.email })
            .then(() => {
                //console.log('Food Accepted!');
                Alert.alert(
                    "Message",
                    "Donation has been Accepted!!",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* <Text style={{
                    textAlign: 'center',
                    fontSize: 22
                }}>Update Posted Food</Text> */}

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


export default ViewPostReceiver;