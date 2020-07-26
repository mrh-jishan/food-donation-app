import { Picker } from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, TextInput } from 'react-native-paper';

class PostFood extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            dataPosted: new Date().toLocaleString(),
            type: '',
            manfDateVal: '',
            expfDateVal: '',
            coverage: '',
            description: '',
            manfData: false,
            expDate: false,
        }
    }

    toggleManfDate = (value) => {
        this.setState({ manfData: !this.state.manfData, manfDateVal: value.dateString });
    }

    toggleExpDate = (value) => {
        this.setState({ expDate: !this.state.expDate, expfDateVal: value.dateString });
    }

    postFoodHandle = () => {
        firestore().collection('Foods').add(this.state).then(res => {
            this.props.navigation.navigate('DonorDashboard');
        }).catch(err => {

        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={{ padding: 20 }}>This is Post Food page</Text>
                <Text>Date Posted: {this.state.dataPosted}</Text>
                <TextInput placeholder="Food Name" 
                 onChangeText={text => this.setState({ name: text })}
                style={styles.textInput} />
                <View style={{
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.3)',
                    overflow: 'hidden',
                    width: "100%"
                }}>
                    <Picker
                        selectedValue={this.state.type}
                        style={{
                            ...styles.textInput,
                            color: '#595959',
                            marginVertical: 0
                        }}
                        mode='dropdown'
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ type: itemValue })
                        }>
                        <Picker.Item label="Select Food Type" value="" />
                        <Picker.Item label="Raw" value="raw" />
                        <Picker.Item label="Cooked" value="cooked" />
                    </Picker>
                </View>

                <TouchableOpacity onPress={() => this.toggleManfDate('')}>
                    <TextInput
                        placeholder="Manufactured Date"
                        style={styles.textInput}
                        value={this.state.manfDateVal}
                        disabled={true} />
                </TouchableOpacity>
                {this.state.manfData && (
                    <Calendar onDayPress={value => this.toggleManfDate(value)} />
                )}

                <TouchableOpacity onPress={() => this.toggleExpDate('')}>
                    <TextInput
                        placeholder="Expiry Date"
                        style={styles.textInput}
                        value={this.state.expfDateVal}
                        disabled={true} />
                </TouchableOpacity>
                {this.state.expDate && (
                    <Calendar onDayPress={value => this.toggleExpDate(value)} />
                )}

                <TextInput
                    placeholder="Food Coverage"
                    onChangeText={text => this.setState({ coverage: text })}
                    style={styles.textInput} />
                <TextInput multiline={true} numberOfLines={4}
                 placeholder="Food Description"
                 onChangeText={text => this.setState({ description: text })}
                 />
                <Button mode="contained" style={{ margin: 10 }} onPress={this.postFoodHandle}>Post Food</Button>
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

    },

});
export default PostFood;