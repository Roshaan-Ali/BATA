import React from 'react';
import {View, Text} from 'react-native';
import Header from '../components/Header';

const Payment = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Header title="back" showBackBtn={true} navigation={navigation} />
    </View>
  );
};

export default Payment;
