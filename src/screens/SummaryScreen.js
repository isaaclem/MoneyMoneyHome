import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Container, Text, Content, Fab, Icon, Card, CardItem, Body, Right } from 'native-base';
import moment from 'moment';
import Accordion from '@ercpereda/react-native-accordion';

import currencies from '../Currencies.json';
import Strings from '../Strings';
import { calculateBalance, filterRecords, groupBy } from '../Globals';


class SummaryScreen extends Component {
  renderContent({ rows }) {
    const massagedList = groupBy(rows, 'account_id');

    return (
      <View 
        style={{
          display: 'flex',
          backgroundColor: 'white',
        }}
      >
        {
          <Card>
            {
              Object.entries(massagedList).map(x => {
                const account = this.props.accountList.find(acc => acc.id === x[0]);

                const sorted = x[1].sort((a, b) => a.type < b.type);
                return (
                  <View>
                    <CardItem header bordered>
                      <Text>{account.accountName}</Text>
                    </CardItem>
                    {
                      sorted.map(indiRec => {
                        const color = indiRec.type === 'expense' ? '#8C2424' : '#258C5F';

                        return (
                          <CardItem key={indiRec.id} bordered>
                            <Body>
                              <Text style={{ color }}>{indiRec.description.trim()}</Text>
                            </Body>
                            <Right>
                              <Text style={{ color }}>{indiRec.amount}</Text>
                            </Right>
                          </CardItem>
                        );
                      })
                    }
                  </View>
                );
              })
            }
          </Card>
        }
      </View>
    );
  }
  render() {
    const { records, accountList } = this.props;
    const year = moment().year();
    const month = moment().format('MMM');

    const balanceObj = calculateBalance({ year, month, records });
    const filteredResults = filterRecords({ year, records, month });
    
    const currencySymbol = currencies[accountList[0].accountCurrency].symbol;
    const totalExpenses = (records[year] && records[year][month] && records[year][month].totalExpenses) || 0;


    return (
      <Container>
        <View style={Style.summaryStyle}>
          <View style={Style.containerStyle}>
            <Text style={[Style.textStyle, { color: balanceObj.color, fontSize: 30, marginBottom: 2, fontWeight: 'bold' }]}>{`${currencySymbol} ${balanceObj.balance}`}</Text>
            <Text style={[Style.textStyle, Style.subTextStyle]}>{Strings.labelCurrentBalance}</Text>
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
              <View>
                <Text style={[Style.textStyle, Style.subTextStyle]}>{`${currencySymbol} ${this.props.monthLimit - totalExpenses}`}</Text>
                <Text style={[Style.textStyle, Style.subTextStyle]}>{Strings.labelRemaining}</Text>
              </View>
              <View>
                <Text style={[Style.textStyle, Style.subTextStyle]}>{` / ${currencySymbol} ${this.props.monthLimit}`}</Text>
                <Text style={[Style.textStyle, Style.subTextStyle]}>{Strings.labelBudget}</Text>
              </View>
            </View>
          </View>
        </View>
        <Content padder>
          {
            Object.entries(filteredResults).map(x => {
              return (
                <Accordion
                  key={x[0]}
                  header={({ isOpen }) => {
                    return (
                      <View
                        style={{
                          paddingTop: 15,
                          paddingRight: 15,
                          paddingLeft: 15,
                          paddingBottom: 15,
                          borderColor: '#C8CECB',
                          backgroundColor: '#C8CECB',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          flexDirection: 'row'
                        }}
                      >
                        {isOpen ? 
                          <Icon type='Entypo' name='chevron-up' style={{ color: '#50565B' }} /> : 
                          <Icon type='Entypo' name='chevron-down' style={{ color: '#50565B' }} />
                        }
                        <Text style={{ color: '#50565B', fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>{x[0]}</Text>
                      </View>
                    );
                  }}
                  content={this.renderContent({ rows: x[1] })}
                  duration={200}
                />
              );
            })
          }
        </Content>
        <Fab
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: '#fa5d66' }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('recordDetails')}
        >
          <Icon name='plus' type='Entypo' />
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = ({ account, settings, main }) => {
  return {
    accountList: account.accountList,
    records: account.records,
    dailyLimit: settings.dailyLimit,
    monthLimit: settings.monthLimit,
    selectedMonth: main.selectedMonth
  };
};

const Style = StyleSheet.create({
  summaryStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    height: 140,
    backgroundColor: '#F2F9F6', 
    alignItems: 'flex-end'
  },
  containerStyle: {
    marginRight: 20,
    marginTop: 20
  },
  textStyle: {
    textAlign: 'right'
  },
  subTextStyle: {
    fontSize: 13, 
    color: 'grey'
  }
});

export default connect(mapStateToProps)(SummaryScreen);
