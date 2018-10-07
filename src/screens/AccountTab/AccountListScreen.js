import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Card, CardItem, Left, Thumbnail, Body, Text, Right } from 'native-base';

import * as actions from '../../actions';
import Strings from '../../Strings';

class AccountListScreen extends Component {
  renderAccountList() {
    return this.props.accountList.map(acc => {
      const source = acc.displayImage ? { uri: acc.displayImage } : require('../../../assets/flat_thumbnail.png');

      return (
        <Card 
          key={acc.id}
          style={{ height: 100 }}
        >
          <CardItem style={{ flex: 1 }}>
            <TouchableWithoutFeedback>
              <Left>
                <Thumbnail source={source} />
                <Body>
                  <Text style={Style.titleStyle}>{Strings.labelAccountName}</Text>
                  <Text style={Style.titleStyle}>{Strings.labelCurrency}</Text>
                  <Text />
                </Body>
                <Right>
                  <Text style={Style.contentStyle}>{acc.accountName}</Text>
                  <Text style={Style.contentStyle}>{acc.accountCurrency}</Text>
                  <Text note style={{ fontSize: 10 }}>{`${acc.startDate} - ${acc.endDate}`}</Text>
                </Right>
              </Left>
            </TouchableWithoutFeedback>
          </CardItem>
        </Card>
      );
    });
  }

  render() {
    return (
      <Container>
        <Content padder>
          {this.renderAccountList()}
        </Content>
      </Container>
    );
  }
}

const Style = StyleSheet.create({
  titleStyle: {
    color: '#96A0AA',
    fontWeight: 'bold',
    fontSize: 14
  },
  contentStyle: {
    color: '#4F9AEA',
    fontWeight: 'bold',
    fontSize: 14
  }
});

const mapStateToProps = ({ account }) => {
  return {
    accountList: account.accountList
  };
};

export default connect(mapStateToProps, actions)(AccountListScreen);
