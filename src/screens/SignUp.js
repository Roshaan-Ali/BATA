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
import DropdownComp from '../components/DropdownComp';
import colors from '../assets/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = ({navigation}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [p_language, setP_language] = useState([
    {label: 'Language1', value: '1'},
    {label: 'Language2', value: '2'},
    {label: 'Language3', value: '3'},
  ]);
  const [person, setPerson] = useState([
    {label: 'Enterprise', value: '1'},
    {label: 'Interpenure', value: '2'},
    {label: 'Indivisual', value: '3'},
  ]);
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [selectedPrimaryLang, setSelectedPrimaryLang] = useState({});
  const [selectedPerson, setSelectedPerson] = useState({});

  const _onPressSignUp = () => {
    if (
      lastname === '' ||
      p_language === '' ||
      firstname === '' ||
      email === ''
    ) {
      alert('All fields required');
    } else {
      navigation.navigate('Otp', {
        firstname,
        lastname,
        password,
        email,
      });
    }
  };
  const _onPresslogin = () => {
    navigation.navigate('LogIn');
  };

  const _onPressShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <ImageBackground source={background_img} style={styles.image}>
      <ScrollView showsVerticalScrollIndicator={false} style="">
        <View
          style={{
            paddingVertical: height * 0.1,
            paddingBottom:200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Heading
            title="Sign Up Now"
            passedStyle={styles.heading}
            fontType="bold"
          />
          <Inputbox
            value={firstname}
            setTextValue={setFirstname}
            placeholderTilte="First Name"
            isShowIcon={true}
            names={'person'}
          />
          <Inputbox
            value={lastname}
            setTextValue={setLastname}
            placeholderTilte="Last Name"
            isShowIcon={true}
            names={'person'}
          />
          <Inputbox
            value={email}
            setTextValue={setEmail}
            placeholderTilte="Email"
            names={'email'}
          />
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
          <DropdownComp
            data={p_language}
            selectedValue={selectedPrimaryLang}
            setSelectedValue={setSelectedPrimaryLang}
          />
          <DropdownComp
            data={person}
            selectedValue={selectedPerson}
            setSelectedValue={setSelectedPerson}
          />
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
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
