import * as React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

const DRequestQRdialog = ({ visible, hideDialog, dRequests }) => {
    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Scan this QR</Dialog.Title>
                    <Dialog.Content style={{ alignSelf: 'center' }}>
                        <QRCode
                            logoSize={350}
                            size={200}
                            value={dRequests.key}
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

export default DRequestQRdialog;