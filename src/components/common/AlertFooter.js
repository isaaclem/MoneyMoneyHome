import React from 'react';
import { View } from 'react-native';

const AlertFooter = (props) => {
  const { children, style } = props;
  const { alertFooterStyle } = styles;

  return (
    <View style={[alertFooterStyle, style]}>
      {children}
    </View>
  );
};

const styles = {
  alertFooterStyle: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25
  }
};

export { AlertFooter };
