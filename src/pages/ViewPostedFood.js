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
        firestore().collection('Foods').where('email', '==', user.email).onSnapshot(snap => {
            const foods = [];
            snap.forEach(food => {
                foods.push({
                    ...food.data(),
                    key: food.id,
                });
            });
            this.setState({ foods: foods })
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
                <Text style={{ ...styles.textInput, padding: 20, textAlign: 'center', fontSize: 22 }}>Feedback Form</Text>

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