import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const IconComp = ({name, type, iconStyle}) => {
  switch (type) {
    case 'MaterialIcons':
      return <MaterialIcons name={name} size={20} color={'#fff'} style={iconStyle}/>;

    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name} size={20} color={'#fff'} style={iconStyle}/>;

    default:
      return null
      break;
  }
};

export default IconComp;
