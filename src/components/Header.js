import React from 'react';
import {StyleSheet, Dimensions, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../assets/colors';
import Heading from './Heading';

const {width, height} = Dimensions.get('window');

const Header = ({navigation, showBackBtn = false, title}) => {
  return (
    <View style={styles.container}>
      {showBackBtn ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backBtnView}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="long-arrow-left" style={styles.backIconStyle} />
          <Heading
            passedStyle={styles.backTextStyle}
            title={'Back'}
            fontType="medium"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backBtnView}
          onPress={() => navigation.toggleDrawer()}>
          <Feather name="menu" style={styles.menuIconStyle} />
          <Heading
            passedStyle={styles.titleStyle}
            title={title}
            fontType="medium"
          />
        </TouchableOpacity>
      )}

      {showBackBtn === false && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            resizeMode="contain"
            source={require('../assets/Images/user.png')}
            style={styles.userImage}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.025,
    alignItems: 'center',
  },
  menuIconStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.075,
    paddingRight: width * 0.025,
    marginTop: height * -0.008,
  },
  backIconStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.06,
    paddingRight: width * 0.025,
  },
  backBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    color: 'black',
    fontSize: width * 0.065,
    width: width * 0.7,
    color: colors.themePurple1,
    fontWeight: '600',
  },
  backTextStyle: {
    fontSize: width * 0.05,
    width: width * 0.7,
    color: colors.themePurple1,
    fontWeight: '600',
  },
  userImage: {
    width: width * 0.08,
    height: height * 0.044,
  },
});
