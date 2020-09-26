import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Food from '../components/Food';

class ViewPostedFood extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            foods: [],
        }
    }

    componentDidMount() {
        const user = auth().currentUser;
        const nowTime = new Date().getTime();
        firestore().collection('Foods')
            // .orderBy("expDateVal")
            .where('email', '==', user.email)
            .onSnapshot(snap => {
                const foods = snap.docs
                    .map(food => {

                        return {
                            ...food?.data(),
                            key: food.id
                        }
                    })

                .filter(data => data.accepted == undefined && data.isApproved == undefined)
                .filter(data => new Date(data.expDateVal).getTime() > nowTime)
                this.setState({ foods: foods.sort((obj1, obj2) => new Date(obj1.expDateVal).getTime() - new Date(obj2.expDateVal).getTime()) })
            })
    }

    deleteFood = (food) => {
        firestore()
            .collection('Foods')
            .doc(food.key)
            .delete()
            .then(() => {
                console.log('Food deleted!');
            });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* <Text style={{ ...styles.textInput, padding: 20, textAlign: 'center', fontSize: 22 }}>Update Posted Food</Text> */}

                {this.state.foods.length > 0 && (
                    this.state.foods.map((food, index) => (
                        <Food food={food}
                            deleteFood={this.deleteFood}
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


export default ViewPostedFood;