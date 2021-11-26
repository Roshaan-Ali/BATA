import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import IconComp from './IconComp';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Inputbox = ({
  value,
  setTextValue,
  placeholderTilte,
  isSecure,
  keyboardType,
  isShowIcon,
  names,
  onPressIcon,
  isPassword
}) => {
  return (
    <View style={{position: 'relative'}}>
      <TextInput
        style={styles.input}
        onChangeText={setTextValue}
        value={value}
        placeholder={placeholderTilte}
        placeholderTextColor="#E3E3E3"
        secureTextEntry={isSecure || false}
        keyboardType={keyboardType || 'default'}
      />

      {isShowIcon && isPassword ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: width * 0.75,
            top: height * 0.046,
          }}
          onPress={() => onPressIcon()}>
          <IconComp
            name={names}
            type={'MaterialIcons'}
          />
        </TouchableOpacity>
      ) : (
        <IconComp
          name={names}
          type={'MaterialIcons'}
          iconStyle={{
            position: 'absolute',
            left: width * 0.75,
            top: height * 0.046,
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 15,
    color: '#E3E3E3',
    width: width * 0.8,
    margin: height * 0.025,
    // height: height * 0.09,
    paddingLeft: width * 0.05,
    fontSize: width * 0.045,
  },
});

export default Inputbox;
