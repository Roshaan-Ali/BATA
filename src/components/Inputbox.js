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
  isPassword,
  passedStyle,
}) => {
  return (
    <View style={{position: 'relative'}}>
      <TextInput
        style={[
          styles.input,
          passedStyle && passedStyle,
          {paddingLeft: width * 0.05},
          isShowIcon && isPassword ,
        ]}
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
            paddingLeft: 10,
          }}
          onPress={() => onPressIcon()}>
          <IconComp
            name={names}
            type={'MaterialIcons'}
            // iconStyle={{
            //   marginLeft: isShowIcon && isPassword && width * 0.05,
            // }}
          />
        </TouchableOpacity>
      ) : (
        <IconComp
          name={names}
          type={'MaterialIcons'}
          iconStyle={{
            paddingLeft: isShowIcon && isPassword && width * 0.02,
            position: 'absolute',
            left: width * 0.75,
            paddingLeft: 10,
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
    fontFamily: 'Poppins-Regular',
    borderColor: '#E3E3E3',
    borderRadius: 15,
    color: '#E3E3E3',
    width: width * 0.8,
    margin: height * 0.025,
    // height: height * 0.09,
    paddingRight: width * 0.07,
    paddingLeft: width * 0.05,
    fontSize: width * 0.045,
  },
});

export default Inputbox;
