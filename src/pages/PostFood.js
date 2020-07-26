import { Picker } from '@react-native-community/picker';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

class PostFood extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataPosted: new Date().toLocaleString(),
            contact: '020394837',
            email: 'user1@gmai.com',
            password: 'User121032',
            type: 'donor'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ padding: 20 }}>This is Post Food page</Text>
                <Text>Date Posted: {this.state.dataPosted}</Text>
                <TextInput placeholder="Food Name"  style={styles.textInput}/>
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
                        <Picker.Item label="Select User Type" value="" />
                        <Picker.Item label="Donor" value="donor" />
                        <Picker.Item label="Receiver" value="receiver" />
                    </Picker>
                </View>
                <TextInput placeholder="Food Coverage" style={styles.textInput}/>
                <TextInput multiline={true} numberOfLines={4} placeholder="Food Description"/>
                <Button mode="contained" style={{margin: 10}}>Post Food</Button>
            </View>
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