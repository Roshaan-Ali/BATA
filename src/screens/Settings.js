import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';

const Settings = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
    <Header title="back" showBackBtn={true} navigation={navigation} />
  </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
