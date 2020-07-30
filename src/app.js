import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Providers from './navigation';


class App extends React.Component {
    render() {
        return (
            <PaperProvider>
                <Providers />
            </PaperProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCC'
    },

    textInput: {
        paddingLeft: 15,
        paddingRight: 15

    }
});

export default App;