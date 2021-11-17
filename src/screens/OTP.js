import React from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import background_img from '../assets/background_img.png';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Otp = ({navigation}) => {
  const _onPressSignUp = () => {
    // if (cardnumber === '') {
    //   alert('All fields required');
    // } else {
      navigation.navigate('Home');
    // }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground source={background_img} style={styles.image}>
      <Heading title="Enter OTP Code" passedStyle={styles.heading} />

        <View style={styles.inputBoxes}></View>
        <Button title="Confirm" onBtnPress={() => _onPressSignUp()} />
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: width * 0.5,
  },
  image: {
    justifyContent: 'center',
    width: width,
    height: height,
    alignSelf: 'center',
    alignItems: 'center',
  },
  scrollview: {
    height: height,
  },
  inputBoxes: {
    marginTop: height * 0.02,
  },
  heading: {
    color: 'white',
    fontSize: width * 0.11,
    fontWeight: 'bold',
  },
});

export default Otp;
