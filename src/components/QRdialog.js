import * as React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

const QRdialog = ({ visible, showDialog, hideDialog, food }) => {
    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Scan this QR</Dialog.Title>
                    <Dialog.Content style={{ alignSelf: 'center' }}>
                        <QRCode
                            logoSize={350}
                            size={200}
                            value={JSON.stringify(food)}
                        />

                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default QRdialog;