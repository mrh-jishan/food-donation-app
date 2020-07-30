import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#1c313a" barStyle="light-content" />
                <Text style={{ color: '#ffffff', fontSize: 18 }}>Hi friend</Text>
                <Button style={{ margin: 10 }} mode="contained" onPress={() => this.props.navigation.navigate('Login')}>Go TO LOGIN</Button>
                <Button style={{ margin: 10 }} mode="contained" onPress={() => this.props.navigation.navigate('Signup')}>Go TO Register</Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#455a64',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        paddingLeft: 15,
        paddingRight: 15

    }
});

export default Home;