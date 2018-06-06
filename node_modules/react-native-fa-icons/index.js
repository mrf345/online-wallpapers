// @flow

import React, { PureComponent, PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import Icons from './lib/FontAwesomeIconUnicodes';

/**
  * Example usage:
  *
  <Icon
    name='STRING'
    style={OBJECT}
    allowFontScaling={BOOLEAN}
    onPress={FUNCTION}
  />
  *
**/


type Props = {
  name: string,
  style?: any,
  allowFontScaling?: boolean,
  onPress?: Function
};


export default class Icon extends PureComponent<Props, void> {  

  render() {
    const { name, style, allowFontScaling, onPress } = this.props;

    return (
      <Text 
        allowFontScaling={allowFontScaling} 
        style={[styles.icon, style]}
        onPress={onPress}
      >
        {Icons[name]}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'FontAwesome',
    backgroundColor: 'transparent'
  },
});
