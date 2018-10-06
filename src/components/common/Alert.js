import React from 'react';
import { View, Text } from 'react-native';

const Alert = (props) => {
  const { titleText, children } = props;
  const { titleViewStyle, titleTextStyle } = alertStyles;

  const renderTitle = () => {
    const text = titleText || '';

    if (text.trim().length > 0) {
      return (
        <View style={titleViewStyle}>
          <Text style={titleTextStyle}>{text}</Text>
        </View>
      );
    }
  };

  return (
    <View style={alertStyles.containerStyle}>
      {renderTitle()}
      {children}
    </View>
  );
};

const alertStyles = {
  titleViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    position: 'relative'
  },
  titleTextStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  containerStyle: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  }
};

export { Alert };
