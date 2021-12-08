import React, {useState,useEffect} from 'react';
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
import logo from '../assets/Logo.png';
import background_img from '../assets/background_img.png';
import {connect} from 'react-redux';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import IconComp from '../components/IconComp';
import * as actions from '../store/actions/actions'
import HomeScreenStack from '../HomeScreensStack'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LogIn = ({navigation,user_login,get_data,UserReducer}) => {
  
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const _onPressSignUp = () => {
    navigation.navigate('SignUp');
  };
  const _onPresspassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const _onPressShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

useEffect(() => {
    console.log(UserReducer.userData,"data")
}, [UserReducer])

  const _logIn = () => {
    // user_login(user);    
    // console.log({UserReducer})


    // if (user == 'admin' && password == 'admin') {
    //   user_login();
    // } else {
    //   console.log('Failed');
    // }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{backgroundColor: 'blue'}}
        showsVerticalScrollIndicator={false}>
        <ImageBackground source={background_img} style={styles.image}>
          <Image resizeMode="contain" source={logo} style={styles.logo} />

          <Inputbox
            value={user}
            setTextValue={setUser}
            placeholderTilte="User Name"
            isShowIcon={true}
            names={'person'}
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
          <Button title="Login" onBtnPress={user_login} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white'}}>Forgot Password?</Text>
            <TouchableOpacity onPress={() => console.log({UserReducer},"0000000000000")}>
              <Text style={{color: 'white'}}> Click Here</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.horizontalLinePosition}>
            <View style={styles.horizontalLine} />
            <View>
              <Text style={{width: 30, textAlign: 'center', color: 'white'}}>
                Or
              </Text>
            </View>
            <View style={styles.horizontalLine} />
          </View>
          {/* <View style={{position: 'relative'}}> */}
          <Button
            title="Sign Up Now"
            onBtnPress={() => _onPressSignUp()}
            isBgColor={false}
          />

          {/* <Button
            title="Counter"
            onBtnPress={() => (dispatch(changeCount()))}
            isBgColor={false}
          /> */}
          {/* <Text>
          {reducerData}
          </Text> */}
          {/* </View> */}
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.5,
    marginVertical: height * 0.02,
  },
  // inputView: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: '#E3E3E3',
  //   borderRadius: 15,
  //   width: width * 0.8,
  //   height: height * 0.08,
  // },
  logo: {
    width: width * 0.4,
    // height: height * 0.22,
    marginTop: height * 0.1,
  },

  image: {
    // flex: 1,
    // justifyContent: 'center',
    // width: width,
    height: height,
    // alignSelf: 'center',
    alignItems: 'center',
  },
  // scrollview: {
  //   height: height,
  // },
  inputBoxes: {
    // marginTop: height * 0.02,
    // height: height * 0.2,
    backgroundColor: 'yellow',
    justifyContent: 'space-around',
  },
});

const mapStateToProps=({UserReducer}) =>{
  return {UserReducer};
}
export default connect(mapStateToProps,actions)(LogIn);
