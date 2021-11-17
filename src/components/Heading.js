import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import colors from '../assets/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Heading = ({title,passedStyle}) => {
  return (
    <Text
    style={styles.text,passedStyle}
    >
      {title}
    </Text>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: colors.themePurple,
    fontWeight: 'bold',
  },
});

export default Heading;
