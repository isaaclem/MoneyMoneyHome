import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { 
  Container, 
  Segment, 
  Button, 
  Input,
  Item,
  Label,
  Form,
  Content,
  Picker,
  Icon,
  Textarea
} from 'native-base';
import DatePicker from 'react-native-datepicker';

import Strings from '../Strings';
import * as actions from '../actions';
import { AlertModal } from '../components';

class RecordDetailsScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      type: 'expense',
      showErrorModal: false
    };
  }

  onFormSubmit = () => {
    let pass = true;

    if (!this.props.date) {
      this.setState({ showErrorModal: true, errorMessage: Strings.errorMessageRequireDate });
      pass = false;
    } else if (!this.props.account_id) {
      this.setState({ showErrorModal: true, errorMessage: Strings.errorMessageRequireAccount });
      pass = false;
    } else if (!this.props.description) {
      this.setState({ showErrorModal: true, errorMessage: Strings.errorMessageRequireDescription });
      pass = false;
    } else {
      this.props.addNewRecord({ 
        recordDetails: { ...this.props.recordDetails, type: this.state.type },
        records: this.props.records
      });
    }

    return pass;
  }

  toggleErrorModal = () => this.setState({ showErrorModal: !this.state.showErrorModal });

  renderTypeSegment() {
    return (
      <Segment style={{ flex: 1, marginHorizontal: 30 }}>
        <Button 
          style={{ 
            flex: 1, 
            justifyContent: 'center', 
            backgroundColor: this.state.type !== 'expense' ? '#258C5F' : undefined,
            borderColor: this.state.type !== 'expense' ? '#258C5F' : '#8C2424'
          }} 
          first 
          active={this.state.type !== 'expense'}
          onPress={() => this.setState({ type: 'income' })}
        >
          <Text style={{ color: this.state.type !== 'expense' ? 'white' : '#8C2424' }}>{Strings.labelIncome}</Text>
        </Button>
        <Button
          style={{ 
            flex: 1, 
            justifyContent: 'center',
            backgroundColor: this.state.type === 'expense' ? '#8C2424' : undefined,
            borderColor: this.state.type === 'expense' ? '#8C2424' : '#258C5F'
        }} 
          last 
          active={this.state.type === 'expense'}
          onPress={() => this.setState({ type: 'expense' })}
        >
          <Text style={{ color: this.state.type === 'expense' ? 'white' : '#258C5F' }}>{Strings.labelExpense}</Text>
        </Button>
      </Segment>
    );
  }

  render() {
    return (
      <Container>
        <View style={[Style.numberContainer, { borderColor: this.state.type === 'expense' ? '#8C2424' : '#258C5F' }]}>
          <Input 
            style={[Style.numberStyle, { color: this.state.type === 'expense' ? '#8C2424' : '#258C5F' }]}
            value={this.props.result.toString()}
            keyboardType='decimal-pad'
            onChangeText={value => this.props.recordFormUpdate({ prop: 'result', value })}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          {this.renderTypeSegment()}
        </View>
        <Content padder>
          <Form style={{ marginTop: 20 }}>
            <Item fixedLabel disabled>
              <Label style={Style.labelStyle}>{Strings.labelDate}</Label>
              <DatePicker
                style={{ width: 100 }}
                date={this.props.date}
                mode="date"
                placeholder={Strings.labelSelectDate}
                format="DD MMM YYYY"
                confirmBtnText={Strings.labelConfirm}
                cancelBtnText={Strings.labelCancel}
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderWidth: 0
                  }
                }}
                onDateChange={value => { this.props.recordFormUpdate({ prop: 'date', value }); }}
              />    
            </Item>
            <Item fixedLabel disabled>
              <Label style={Style.labelStyle}>{Strings.labelAccount}</Label>
              <Picker
                enabled
                mode='dropdown'
                iosIcon={<Icon name='ios-arrow-down' type='Ionicons' />}
                selectedValue={this.props.account_id}
                onValueChange={v => this.props.recordFormUpdate({ prop: 'account_id', value: v })}
                style={{ width: 200, backgroundColor: 'white', marginLeft: 0, marginTop: 10 }}
                textStyle={{ color: 'grey', textAlign: 'right' }}
              >
              {
                this.props.accountList.map(acc => {
                  return (<Item value={acc.id} label={acc.accountName} key={acc.id} />);
                })
              }
              </Picker>
              {
                Platform.OS === 'android' && <Icon name='ios-arrow-down' type='Ionicons' />
              }
            </Item>
            <Item stackedLabel disabled>
              <Label style={Style.labelStyle}>{Strings.labelDescription}</Label>
              <Textarea 
                rowSpan={6} 
                bordered 
                placeholder='Grocery at Giant' 
                style={{ width: '100%', marginTop: 10 }} 
                value={this.props.description}
                onChangeText={value => this.props.recordFormUpdate({ prop: 'description', value })}
              />
            </Item>
          </Form>
        </Content>
        <View style={{ flexDirection: 'row' }}>
          <Button
            block
            success
            onPress={() => {
              const pass = this.onFormSubmit();
              if (pass) this.props.navigation.goBack();
            }}
            style={{ margin: 2, height: 50, flex: 1 }}
          >
            <Text style={{ fontWeight: 'bold', color: 'white' }}>{Strings.labelSaveAndQuit}</Text>
          </Button>
          <Button
            block
            info
            onPress={() => this.onFormSubmit()}
            style={{ margin: 2, height: 50, flex: 1 }}
          >
            <Text style={{ fontWeight: 'bold', color: 'white' }}>{Strings.labelSave}</Text>
          </Button> 
        </View>
        <AlertModal
          isVisible={this.state.showErrorModal}
          alertTitle={Strings.errorMessageValidationError}
          alertMessage={this.state.errorMessage}
          onOkButtonPress={() => this.toggleErrorModal()}
        />
      </Container>
    );
  }
}

const Style = StyleSheet.create({
  numberContainer: {
    marginTop: 5,
    marginHorizontal: 5, 
    borderWidth: 2, 
    borderRadius: 5, 
    borderColor: '#8C2424', 
    height: 60,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  numberStyle: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 40,
    paddingRight: 5,
    color: '#8C2424',
    width: 200
  },
  labelStyle: {
    color: '#297ED8',
    fontSize: 15,
    fontWeight: 'bold'
  },
});

const mapStateToProps = ({ recordDetails, account }) => {
  return {
    date: recordDetails.date,
    result: recordDetails.result,
    account_id: recordDetails.account_id,
    description: recordDetails.description,
    accountList: account.accountList,
    records: account.records,
    recordDetails
  };
};

export default connect(mapStateToProps, actions)(RecordDetailsScreen);
