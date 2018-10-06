import React from 'react';
import { Text } from 'react-native';
import Modal from 'react-native-modal';
import {
  Button,
  Icon
} from 'native-base';
import {
  Alert,
  AlertFooter
} from './common';
import Strings from '../Strings';


const AlertModal = (props) => {
  const { alertTitle, alertMessage, isVisible, onModalHide, onOkButtonPress } = props;
  const { alertButtonStyle, alertButtonLightTextStyle } = style;
  const { buttonTextOk } = Strings;

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      isVisible={isVisible}
      onModalHide={onModalHide}
    >
      <Alert titleText={alertTitle}>
        <Text>{alertMessage}</Text>
        <AlertFooter>
          <Button
            iconLeft
            light
            block
            onPress={onOkButtonPress}
            style={alertButtonStyle}
          >
            <Icon name='ios-checkmark-circle-outline' />
            <Text style={alertButtonLightTextStyle}>{buttonTextOk}</Text>
          </Button>
        </AlertFooter>
      </Alert>
    </Modal>
  );
};

const style = {
  alertButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    margin: 2
  },
  alertButtonLightTextStyle: {

  }
};

export { AlertModal };
