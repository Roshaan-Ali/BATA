import React, {useState} from 'react';
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
import Button from '../components/Button';
import Inputbox from '../components/Inputbox';
import background_img from '../assets/background_img.png';
import Heading from '../components/Heading';
import CustomDropdownModal from '../components/CustomDropdownModal';
import colors from '../assets/colors';
import IconComp from '../components/IconComp';
import AlertModal from '../components/AlertModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppStatusBar from '../components/AppStatusBar';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [selectedPrimaryLang, setSelectedPrimaryLang] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showAccountTypeModal, setShowAccountTypeModal] = useState(false);
  const [p_language, setP_language] = useState([
    {_id: 1, label: 'Burmese'},
    {_id: 11, label: 'Chin'},
    {_id: 3, label: 'Kachin'},
    {_id: 4, label: 'Karen'},
    {_id: 22, label: 'Mon'},
    {_id: 2, label: 'Rohingya'},
  ]);
  const [person, setPerson] = useState([
    {label: 'Individual', _id: 2},
    {label: 'Enterprise', _id: 1},
  ]);

  const _onPressSignUp = () => {
    if (
      lastname === '' ||
      p_language === '' ||
      firstname === '' ||
      email === ''
    ) {
      // alert('All fields required');
      setShowAlert(true);
    } else {
      navigation.navigate('SignupPackage', {
        firstname,
        lastname,
        password,
        email,
        selectedPrimaryLang,
        selectedPerson,
      });
    }
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
      setSelectedPrimaryLang(item.label);
    }
    if (showAccountTypeModal) {
      setSelectedPerson(item.label);
    }
    setShowLanguageModal(false);
    setShowAccountTypeModal(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EF2692'}}>
    <AppStatusBar backgroundColor={colors.themePurple1} barStyle="light-content" />
    <ImageBackground source={background_img} style={styles.image}>
      <ScrollView showsVerticalScrollIndicator={false} style="">
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
          />

          {/* Primary Language  */}
          <TouchableOpacity
            style={styles.dropdown}
            activeOpacity={0.8}
            onPress={() => setShowLanguageModal(true)}>
            <Heading
              title={
                selectedPrimaryLang === ''
                  ? 'Primary Language'
                  : selectedPrimaryLang
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
            onPress={() => setShowAccountTypeModal(true)}>
            <Heading
              title={
                selectedPerson === ''
                  ? 'Join As,'
                  : `Join As, ${selectedPerson}`
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

        {showAccountTypeModal && (
          <CustomDropdownModal
            array={person}
            onPress={_onDropdownSelectionPress}
            isModalVisible={showAccountTypeModal}
            setIsModalVisible={setShowAccountTypeModal}
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
    </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    height: 50
  },
  languageText: {
    fontSize: width * 0.045,
    color: 'white',
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

export default SignUp;
