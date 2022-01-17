import React, {useEffect, useState, InteractionManager, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Heading from '../components/Heading';
import * as actions from '../store/actions/actions';
import background_img from '../assets/background_img.png';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {connect} from 'react-redux';
import colors from '../assets/colors';
import LottieView from 'lottie-react-native';
import AlertModal from '../components/AlertModal';
import AppStatusBar from '../components/AppStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MotiView} from 'moti';
import {NavigationContainer} from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Otp = ({
  route,
  verifySignUpOtpCode,
  UserReducer,
  setErrorModal,
  user_signup,
  navigation,
}) => {
  const [otpCode, setOtpCode] = useState('');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const inputRef = useRef()

  useEffect(() => {
    // setTimeout(() => inputRef.current.focus(), 100);
    console.log(inputRef.current)
    setErrorModal();
  }, []);

  // Confirm Code
  const _onConfirmOtp = async code => {
    setIsVerifying(true);

    setTimeout(async () => {
      await verifySignUpOtpCode(
        {
          phone: UserReducer?.userData?.phone,
          code,
        },
        _onSuccess,
        _onFailure,
      );
    }, 5000);
  };

  // Request New Code
  const _onPressRequestNewCode = async () => {
    setIsRequesting(true);
    // setIsRequesting(false);
    // setShowAlertModal(false);
    const data = {
      ...route.params,
      service_type: route.params?.selectedService?.name,
    };
    setTimeout(async () => {
      await user_signup(data, () => {});
      setShowAlertModal(false);
      setOtpCode('');
      setIsRequesting(false);
    }, 5000);
  };

  const _onSuccess = () => {
    navigation.navigate('SignupPackage', {
      ...route.params,
    });
  };

  const _onFailure = () => {
    setIsVerifying(false);
    setOtpCode('');
    setShowAlertModal(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EF2692'}}>
      {/* <AppStatusBar
        backgroundColor={colors.themePurple1}
        barStyle="light-content"
      /> */}
      <ImageBackground source={background_img} style={styles.image}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          {isVerifying ? (
            <View style={styles.verifyingView}>
              <Heading
                title="Verifying OTP Code"
                passedStyle={styles.verifyingOtpCode}
                fontType="light"
              />
              <LottieView
                speed={1}
                style={styles.lottieStyles}
                autoPlay
                loop
                source={require('../assets/Lottie/purple-loading-2.json')}
              />
            </View>
          ) : (
            <View style={styles.inputBoxes}>
              <Heading title="Enter OTP Code" passedStyle={styles.heading} />
              <OTPInputView
                // ref={inputRef}
                style={{width: '80%', height: 100}}
                pinCount={4}
                code={otpCode} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={code => {
                  setOtpCode(code);
                }}
                autoFocusOnLoad={false}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                  _onConfirmOtp(code);
                }}
              />
            </View>
          )}

          {showAlertModal && (
            <AlertModal
              buttonText={'Request New Code'}
              title="Verification Failed :("
              onPress={_onPressRequestNewCode}
              showLoader={isRequesting}
              isModalVisible={showAlertModal}
              setIsModalVisible={setShowAlertModal}
              message="Your 4 digit verification code is invalid."
            />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  verifyingView: {
    alignItems: 'center',
    position: 'relative',
    height: height * 0.3,
    justifyContent: 'center',
  },
  verifyingOtpCode: {
    color: 'white',
    fontSize: width * 0.085,
    // position: 'absolute',
    marginBottom: height * 0.2,
  },

  lottieStyles: {
    height: height * 0.35,
    position: 'absolute',
    // bottom: height * 0.0012,
  },
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
    width: width,
    height: height,
    alignSelf: 'center',
    flex: 1,
  },

  inputBoxes: {
    marginHorizontal: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: width * 0.11,
  },

  // OTP Styles
  underlineStyleBase: {
    width: width * 0.15,
    height: height * 0.08,
    fontSize: width * 0.07,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: width * 0.02,
    color: colors?.themePurple1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(Otp);
