import React from 'react';
import {Button, Modal, StyleSheet, Text, View} from 'react-native';

const ConfirmModal = props => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.toggleVisible();
      }}>
      <View style={Styles.modalContainer}>
        <View style={Styles.innerContainer}>
          <Text style={Styles.title}>Confirmation</Text>
          <Text>{props.message}</Text>
          <View style={Styles.buttonRow}>
            <View style={Styles.buttonContainer}>
              <Button
                title="Close"
                onPress={() => {
                  props.outputResolver(false);
                  props.toggleVisible();
                }}
              />
            </View>
            <View style={Styles.buttonContainer}>
              <Button
                color="green"
                title="Confirm"
                onPress={() => {
                  props.outputResolver(true);
                  props.toggleVisible();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
  },
  innerContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: '30%',
    borderRadius: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonRow: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    margin: 10,
  },
});

export default ConfirmModal;
