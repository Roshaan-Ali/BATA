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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = ({navigation}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [p_language, setP_language] = useState([
    {label: 'Language1', value: '1'},
    {label: 'Language2', value: '2'},
    {label: 'Language3', value: '3'},
  ]);
  const [address, setAddress] = useState('');
  const [selectedPrimaryLang, setSelectedPrimaryLang] = useState({});

  const _onPressSignUp = () => {
    if (lastname === '' || p_language === '' || firstname === '') {
      alert('All fields required');
    } else {
      navigation.navigate('Otp', {
        firstname,
        lastname,
        address,
      });
    }
  };
  const _onPresslogin = () => {
    navigation.navigate('LogIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground source={background_img} style={styles.image}>
        <Heading title="Sign Up Now" passedStyle={styles.heading} />
        {/* <View style={styles.inputBoxes}> */}
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
          value={address}
          setTextValue={setAddress}
          placeholderTilte="Address"
          isSecure={true}
        />
        <DropdownComp
          data={p_language}
          selectedValue={selectedPrimaryLang}
          setSelectedValue={setSelectedPrimaryLang}
        />
        <Button title="Next >" onBtnPress={() => _onPressSignUp()} />
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white'}}>Already have an Account?</Text>
          <TouchableOpacity onPress={() => console.log("pressed")}>
            <Text style={{color: 'white'}} > Login</Text>
          </TouchableOpacity>
        </View>
        {/* <Button
          title="Sign up as an Enterprise"
          onBtnPress={() => _onPressSignUp()}
          isBgColor={false}
        /> */}
      </ImageBackground>
    </ScrollView>
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
    fontWeight: 'bold',
    marginTop: height * 0.06,
  },
});

export default SignUp;
