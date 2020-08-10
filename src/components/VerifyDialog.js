import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';

const VerifyDialog = ({ visible, submitCode, setCode, code }) => {
    return (
        <View>
            <Portal>
                <Dialog visible={visible} >
                    <Dialog.Title>Verify Profile</Dialog.Title>
                    <Dialog.Content style={{ alignSelf: 'center' }}>
                        <View style={styles.container}>
                            <TextInput style={styles.textInput}
                                placeholder="Enter code"
                                value={code}
                                onChangeText={(value) => setCode(value)} />
                            <Button mode="contained" onPress={submitCode}>Verify</Button>
                        </View>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: 150
    },

    textInput: {
        width: "100%",
        marginVertical: 5,
        fontSize: 30,
        textAlign: "center"

    },



});

export default VerifyDialog;