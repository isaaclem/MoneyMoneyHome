import React, { Component } from 'react';
import { ImageBackground, View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Icon, Item, Label, Input, Content, Picker, Button } from 'native-base';
import Hr from 'react-native-hr-plus';
import Modal from 'react-native-modal';

import currencies from '../../Currencies.json';
import Strings from '../../Strings';
import * as actions from '../../actions';
import { AlertModal } from '../../components';

class AccountCreationScreen extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      showErrorModal: false,
      errorMessage: ''
    };
  }

  toggleErrorModal = () =>
    this.setState({ showErrorModal: !this.state.showErrorModal });

  submitForm = () => {
    if (!this.props.accountName) {
      this.setState({ showErrorModal: true, errorMessage: Strings.errorMessageRequireAccountName });
    } else if (!this.props.accountCurrency) {
      this.setState({ showErrorModal: true, errorMessage: Strings.errorMessageRequireCurrency });
    } else {
      this.props.addNewAccount({ accountDetails: this.props.accountDetails });
      this.props.navigation.goBack();
    }
  }

  render() {
    const source = require('../../../assets/flat_thumbnail.png');

    return (
      <Container>
        <View style={{ height: 200 }}>
          <ImageBackground source={source} style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }}>
            <Icon type='FontAwesome' name='camera' style={{ color: 'white', marginLeft: 5, marginBottom: 5 }} />
          </ImageBackground>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#96A0AA', height: 30 }}>
          <Text style={{ fontStyle: 'italic', color: 'white' }}>{`${Strings.labelCreateAt} ${this.props.startDate}`}</Text>
        </View>
        <Content padder style={{ flex: 1 }}>
          <Hr color='#50565B' width={2} style={{ marginVertical: 10 }}>
            <Text style={{ color: '#50565B', fontWeight: 'bold', marginHorizontal: 10 }}>{Strings.labelAccountDetails}</Text>
          </Hr>
          <Item fixedLabel>
            <Label style={Style.labelStyle}>{Strings.labelAccountName}</Label>
            <Input
              style={[Style.valueStyle, { textAlign: 'right' }]} 
              placeholder={Strings.labelAccountNamePlaceholder}
              value={`${this.props.accountName}`}
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={value => this.props.accountDetailFormUpdate({ prop: 'accountName', value })}
            />
          </Item>
          <Item fixedLabel disabled>
            <Label style={Style.labelStyle}>{Strings.labelCurrency}</Label>
            <Picker
              enabled
              mode='dropdown'
              iosIcon={<Icon name='ios-arrow-down' type='Ionicons' />}
              selectedValue={this.props.accountCurrency}
              onValueChange={value => this.props.accountDetailFormUpdate({ prop: 'accountCurrency', value })}
              style={{ width: 200, backgroundColor: 'white', marginLeft: 0, marginTop: 10 }}
              textStyle={{ color: 'grey' }}
            >
              {
                Object.entries(currencies).map(row => <Item value={row[0]} label={row[1]} key={row[0]} />)
              }
            </Picker>
            {
              Platform.OS === 'android' && <Icon name='ios-arrow-down' type='Ionicons' />
            }
          </Item>
        </Content>
        <View style={{ flexDirection: 'row' }}>
          <Button
            block
            success
            onPress={() => this.submitForm()}
            style={{ margin: 2, height: 50, flex: 1 }}
          >
            <Text style={{ fontWeight: 'bold', color: 'white' }}>{Strings.labelSave}</Text>
          </Button>
          <Button
            block
            warning
            onPress={() => this.props.navigation.goBack()}
            style={{ margin: 2, height: 50, flex: 1 }}
          >
            <Text style={{ fontWeight: 'bold', color: 'white' }}>{Strings.labelCancel}</Text>
          </Button> 
        </View>
        <AlertModal
          isVisible={this.state.showErrorModal}
          // onModalHide={() => this.onLogoutModalHide()}
          alertTitle={Strings.errorMessageValidationError}
          alertMessage={this.state.errorMessage}
          onOkButtonPress={() => this.toggleErrorModal()}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ accountDetails }) => {
  return {
    id: accountDetails.id,
    accountName: accountDetails.accountName,
    accountCurrency: accountDetails.accountCurrency,
    displayImage: accountDetails.displayImage,
    status: accountDetails.status,
    startDate: accountDetails.startDate,
    accountDetails
  };
};

const Style = StyleSheet.create({
  labelStyle: {
    color: '#297ED8',
    fontSize: 15,
    fontWeight: 'bold'
  },
  valueStyle: {
    color: '#50565B',
    fontSize: 15
  }
});

export default connect(mapStateToProps, actions)(AccountCreationScreen);
