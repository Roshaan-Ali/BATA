import React, {useEffect, useState} from 'react';
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
import {connect} from 'react-redux';
import colors from '../assets/colors';
import Button from '../components/Button';
import Heading from '../components/Heading';
import LottieView from 'lottie-react-native';
import Inputbox from '../components/Inputbox';
import IconComp from '../components/IconComp';
import AlertModal from '../components/AlertModal';
import * as actions from '../store/actions/actions';
import AppStatusBar from '../components/AppStatusBar';
import background_img from '../assets/background_img.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomDropdownModal from '../components/CustomDropdownModal';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = ({
  navigation,
  user_signup,
  UserReducer,
  setErrorModal,
  getAllPackages,
}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  let packages = UserReducer?.packages;
  let p_language = UserReducer?.languages;
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showPasswordMismatchAlert, setShowPasswordMismatchAlert] =
    useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedPrimaryLang, setSelectedPrimaryLang] = useState(null);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [showSignupFailedModal, setShowSignupFailedModal] = useState(false);

  const _onPressSignUp = async () => {
    if (password === confirmPassword) {
      if (
        firstname === '' ||
        lastname === '' ||
        email === '' ||
        password === '' ||
        confirmPassword === '' ||
        phone === '' ||
        selectedPrimaryLang === '' ||
        selectedService === ''
      ) {
        setShowAlert(true);
      } else {
        setIsLoading(true);
        const data = {
          first_name: firstname,
          last_name: lastname,
          email: email,
          phone: phone,
          password: password,
          confirmPassword: confirmPassword,
          language: [selectedPrimaryLang?.id],
          service_type: selectedService?.name,
        };
        await user_signup(data, _onSuccess);

        setIsLoading(false);
      }
    } else {
      setShowPasswordMismatchAlert(true);
    }
  };

  const _onSuccess = () => {
    navigation.navigate('Otp', {
      first_name: firstname,
      last_name: lastname,
      email: email,
      phone: phone,
      password: password,
      confirmPassword: confirmPassword,
      language: [selectedPrimaryLang?.id],
      service_type: selectedService,
    });
  };

  const _onPresslogin = () => {
    navigation.navigate('LogIn');
  };

  const _onPressShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  // on language selection
  const _onDropdownSelectionPress = item => {
    if (showLanguageModal) {
      setSelectedPrimaryLang(item);
    }
    if (showServicesModal) {
      setSelectedService(item);
    }
    setShowLanguageModal(false);
    setShowServicesModal(false);
  };

  useEffect(() => {
    if (UserReducer?.errorModal?.status === true) {
      setShowSignupFailedModal(true);
    }
    if (UserReducer?.errorModal?.status === false) {
      setShowSignupFailedModal(false);
    }
  }, [UserReducer?.errorModal]);

  useEffect(() => {
    getAllPackages();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EF2692'}}>
      {/* <AppStatusBar
        backgroundColor={colors.themePurple1}
        barStyle="light-content"
      /> */}
      <ImageBackground source={background_img} style={styles.image}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.formStyle}>
            {/* Sign Up Heading  */}
            <Heading
              title="Sign Up Now"
              passedStyle={styles.heading}
              fontType="bold"
            />

            {/* First Name  */}
            <Inputbox
              value={firstname}
              setTextValue={setFirstname}
              placeholderTilte="First Name"
              isShowIcon={true}
              names={'person'}
            />

            {/* Last Name  */}
            <Inputbox
              value={lastname}
              setTextValue={setLastname}
              placeholderTilte="Last Name"
              isShowIcon={true}
              names={'person'}
            />

            {/* Email  */}
            <Inputbox
              value={email}
              setTextValue={setEmail}
              placeholderTilte="Email"
              names={'email'}
            />

            {/* Password  */}
            <Inputbox
              value={password}
              setTextValue={setPassword}
              placeholderTilte="Password"
              isSecure={!isShowPassword}
              isPassword={true}
              isShowIcon={true}
              names={'lock'}
              onPressIcon={_onPressShowPassword}
              iconStyle={{
                color: 'white',
                paddingLeft: width * 0.006,
              }}
              iconWrapperStyle={{
                position: 'absolute',
                right: width * 0.04,
                left: width * 0.7,
              }}
            />

            {/* Confirm Password  */}
            <Inputbox
              value={confirmPassword}
              setTextValue={setConfirmPassword}
              placeholderTilte="Confirm Password"
              isSecure={!isShowPassword}
              isPassword={true}
              isShowIcon={true}
              names={'lock'}
              iconStyle={{
                color: 'white',
                paddingLeft: width * 0.006,
              }}
              iconWrapperStyle={{
                position: 'absolute',
                right: width * 0.04,
                left: width * 0.7,
              }}
              onPressIcon={_onPressShowPassword}
            />

            {/* Phone   */}
            <Inputbox
              value={phone}
              setTextValue={setPhone}
              placeholderTilte="Phone"
              keyboardType="numeric"
              names={'smartphone'}
            />
            <Heading
              title="Mention your country code e.g: 1, 92 etc"
              passedStyle={{fontSize: width * 0.038, color: 'white'}}
            />
            {/* Primary Language  */}
            <TouchableOpacity
              style={styles.dropdown}
              activeOpacity={0.8}
              onPress={() => setShowLanguageModal(true)}>
              <Heading
                title={
                  selectedPrimaryLang === null
                    ? 'Primary Language'
                    : selectedPrimaryLang?.language_name
                }
                passedStyle={styles.languageText}
              />
              <IconComp
                name="caretdown"
                type="AntDesign"
                iconStyle={styles.downIcon}
              />
            </TouchableOpacity>

            {/* Account Type  */}
            <TouchableOpacity
              style={styles.dropdown}
              activeOpacity={0.8}
              onPress={() => setShowServicesModal(true)}>
              <Heading
                title={
                  selectedService === null
                    ? 'Join As,'
                    : `Join As, ${selectedService?.name}`
                }
                passedStyle={styles.languageText}
              />
              <IconComp
                name="caretdown"
                type="AntDesign"
                iconStyle={styles.downIcon}
              />
            </TouchableOpacity>

            {/* Next Button  */}

            {isLoading ? (
              <TouchableOpacity
                style={styles.loadingComponent}
                activeOpacity={1}>
                <LottieView
                  speed={1}
                  style={styles.lottieStyles}
                  autoPlay
                  colorFilters={'blue'}
                  loop
                  source={require('../assets/Lottie/purple-loading-2.json')}
                />
              </TouchableOpacity>
            ) : (
              <Button
                title="Next >"
                onBtnPress={() => _onPressSignUp()}
                btnStyle={{
                  borderRadius: width * 0.08,
                  backgroundColor: 'white',
                  paddingVertical: height * 0.015,
                }}
                btnTextStyle={{
                  color: colors.themePurple1,
                  fontFamily: 'Poppins-SemiBold',
                }}
                isBgColor={false}
              />
            )}
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                justifyContent: 'center',
              }}>
              <Heading
                passedStyle={{color: 'white', fontSize: width * 0.035}}
                title="Already have an Account?"
              />
              <TouchableOpacity onPress={() => _onPresslogin()}>
                <Heading
                  passedStyle={{
                    color: 'white',
                    fontSize: width * 0.035,
                    textDecorationLine: 'underline',
                    marginLeft: width * 0.02,
                  }}
                  title="Login"
                />
              </TouchableOpacity>
            </View>
          </View>
          {showLanguageModal && (
            <CustomDropdownModal
              array={p_language}
              onPress={_onDropdownSelectionPress}
              isModalVisible={showLanguageModal}
              setIsModalVisible={setShowLanguageModal}
            />
          )}

          {showServicesModal && (
            <CustomDropdownModal
              array={packages}
              onPress={_onDropdownSelectionPress}
              isModalVisible={showServicesModal}
              setIsModalVisible={setShowServicesModal}
            />
          )}
        </ScrollView>

        {showAlert && (
          <AlertModal
            title="Oh Snaps!"
            message="Look out, one or more requried fields are left empty."
            isModalVisible={showAlert}
            setIsModalVisible={setShowAlert}
          />
        )}
        {showSignupFailedModal && (
          <AlertModal
            title="Oh Snaps!"
            message={UserReducer?.errorModal?.msg}
            isModalVisible={showSignupFailedModal}
            onPress={() => setErrorModal()}
            setIsModalVisible={setShowSignupFailedModal}
          />
        )}

        {showPasswordMismatchAlert && (
          <AlertModal
            title="Oh Snaps!"
            message={'Passwords Mismatch!'}
            isModalVisible={showPasswordMismatchAlert}
            setIsModalVisible={setShowPasswordMismatchAlert}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingComponent: {
    borderRadius: 50,
    position: 'relative',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.08,
    width: width * 0.8,
    marginVertical: height * 0.02,
  },
  lottieStyles: {
    height: height * 0.15,
    position: 'absolute',
    left: 0,
    right: 0,
    top: height * -0.02,
  },
  formStyle: {
    // paddingVertical: height * 0.1,
    paddingBottom: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downIcon: {
    position: 'absolute',
    right: width * 0.045,
    // top: height * 0.027,
    color: 'white',
    fontSize: width * 0.03,
    paddingLeft: width * 0.02,
  },
  dropdown: {
    borderWidth: 1,
    position: 'relative',
    borderColor: '#E3E3E3',
    borderRadius: 15,
    width: width * 0.8,
    marginVertical: height * 0.025,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: width * 0.045,
    height: 50,
  },
  languageText: {
    fontSize: width * 0.045,
    color: 'white',
    textTransform: 'capitalize',
  },
  image: {
    justifyContent: 'center',
    height: height,

    alignItems: 'center',
  },
  inputBoxes: {
    marginTop: height * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: 'white',
    fontSize: width * 0.11,
    marginTop: height * 0.01,
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(SignUp);
