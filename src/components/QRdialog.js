import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const QRdialog = ({visible,showDialog, hideDialog, food}) => {
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Scan this QR</Dialog.Title>
          <Dialog.Content>
  <Paragraph>{JSON.stringify(food)}</Paragraph>
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