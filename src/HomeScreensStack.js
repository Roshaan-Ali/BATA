import {connect} from 'react-redux';
import React, {useEffect} from 'react';
import Home from './screens/Home';
import Booking from './screens/Booking';
import Profile from './screens/Profile';
import Packages from './screens/Packages';
import Translators from './screens/Translators';
import Interpreter from './screens/Interpreter';
import SearchingScreen from './screens/SearchingScreen';
import LanguageSelection from './screens/LanguageSelection';
import CreateCustomPackage from './screens/CreateCustomPackage';
import ConfirmTranslatorModal from './components/ConfirmTranslatorModal';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Reviews from './screens/Reviews';
import ChangePassword from './screens/ChangePassword';
import OTP from './screens/OTP';
import * as actions from './store/actions/actions';

const HomeStack = createNativeStackNavigator();

const HomeScreensStack = ({
  fcmNotificationsListener,
  navigation,
  UserReducer,
  getCurrentLocation,
  getCurrentBooking,
  getAllLanguages,
}) => {
  const accessToken = UserReducer?.accessToken;

  useEffect(() => {
    getCurrentLocation();
    getAllLanguages();
    // if (accessToken !== undefined && accessToken !== null) {
    //   getCurrentBooking(accessToken);
    // }
    console.log('==========ALL FUNCTIONS RAN SUCCESSFULLY==========');
  }, []);
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={UserReducer?.userData?.verify === 1 ? 'Home' : 'Otp'}>
      <HomeStack.Screen name="Home" component={Home} {...navigation} />

      <HomeStack.Screen name="Otp" component={OTP} {...navigation} />

      <HomeStack.Screen
        name="Language"
        component={LanguageSelection}
        {...navigation}
      />
      <HomeStack.Screen name="Packages" component={Packages} {...navigation} />
      <HomeStack.Screen
        name="Translator"
        component={Translators}
        {...navigation}
      />
      <HomeStack.Screen name="Booking" component={Booking} {...navigation} />
      <HomeStack.Screen
        name="Interpreter"
        component={Interpreter}
        {...navigation}
      />
      <HomeStack.Screen
        name="Searching"
        component={SearchingScreen}
        {...navigation}
      />
      <HomeStack.Screen name="Reviews" component={Reviews} {...navigation} />
      <HomeStack.Screen
        name="ConfirmModal"
        component={ConfirmTranslatorModal}
        {...navigation}
      />
      <HomeStack.Screen name="Profile" component={Profile} {...navigation} />
      <HomeStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        {...navigation}
      />

      <HomeStack.Screen
        name="CustomPackage"
        component={CreateCustomPackage}
        {...navigation}
      />
    </HomeStack.Navigator>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(HomeScreensStack);
