import React, {useState} from 'react';
import moment from 'moment';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import colors from '../assets/colors';
import Button from '../components/Button';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import DatePicker from 'react-native-date-picker';
import MapView, {Marker} from 'react-native-maps';
import AppStatusBar from '../components/AppStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as actions from '../store/actions/actions';
import Geolocation from 'react-native-geolocation-service';
import CustomDropdownModal from '../components/CustomDropdownModal';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {connect} from 'react-redux';
import {useEffect} from 'react';
import Inputbox from '../components/Inputbox';
import AlertModal from '../components/AlertModal';

const {width, height} = Dimensions.get('window');

const Translator = ({
  navigation,
  UserReducer,
  getCurrentLocation,
  getOccasions,
}) => {
  const accessToken = UserReducer.accessToken;
  const [mapRef, setMapRef] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  );
  const [location, setLocation] = useState('Karachi');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [coordinates, setCoordinates] = useState(UserReducer?.coords);
  const [showIncompleteFormAlert, setShowIncompleteFormAlert] = useState(false);
  //   Submit Button Handler
  const _onNextPress = () => {
    // if (location && startDate && endDate && coordinates) {
    //   navigation.navigate('Language', {
    //     translation_address: location,
    //     start_date: startDate.toString(),
    //     end_date: endDate.toString(),
    //     lat: coordinates.lat.toString(),
    //     longe: coordinates.lng.toString(),
    //   });
    // } else {
    //   setShowIncompleteFormAlert(true);
    // }
    navigation.navigate('Language', {
      translation_address: location,
      start_date: startDate.toString(),
      end_date: endDate.toString(),
      lat: coordinates.lat.toString(),
      longe: coordinates.lng.toString(),
    });
  };

  // My Location Handler
  const _onMicPress = () => {
  };

  useEffect(() => {
    getCurrentLocation();
    getOccasions(accessToken);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        {/* <AppStatusBar
          backgroundColor={colors.themePurple1}
          barStyle="dark-content"
        /> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="always">
          {/* Map View  */}
          <View style={styles.mapView}>
            <MapView
              style={{height: height * 0.45, width: width}}
              ref={ref => {
                setMapRef(ref);
              }}
              showsMyLocationButton={true}
              zoomEnabled={true}
              followsUserLocation={true}
              scrollEnabled={true}
              region={{
                latitude: coordinates?.lat,
                longitude: coordinates?.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.001,
              }}
              // initialRegion={{
              //   latitude: coordinates?.lat,
              //   longitude: coordinates?.lng,
              //   latitudeDelta: 0.0922,
              //   longitudeDelta: 0.0421,
              // }}
              onMapReady={() => {
                mapRef.fitToCoordinates(coordinates, {
                  animated: true,
                  edgePadding: {
                    top: 150,
                    right: 50,
                    bottom: 100,
                    left: 50,
                  },
                });
              }}
              onRegionChangeComplete={movedCoords => {
                setCoordinates({
                  lat: movedCoords.latitude,
                  lng: movedCoords.longitude,
                  longitudeDelta: movedCoords.longitudeDelta,
                  latitudeDelta: movedCoords.latitudeDelta,
                });
              }}>
              {/* <Marker
                draggable={true}
                coordinate={coordinates}
                position={coordinates}

                onDragEnd={e => {
                  setCoordinates(e.nativeEvent.coordinate);
                  console.log('dragEnd', e.nativeEvent.coordinate);
                }}
              /> */}
            </MapView>
            <Image
              source={require('../assets/Images/pointer-purple.png')}
              resizeMode="contain"
              style={{
                position: 'absolute',
                top: height * 0.17,
                right: width * 0.45,
                width: width * 0.1,
                height: height * 0.07,
              }}
            />
          </View>

          {/* Filters View  */}
          <View style={styles.filterView}>
            {/* Location Search  */}
            <GooglePlacesAutocomplete
              enablePoweredByContainer={false}
              placeholder={'Translational Address'}
              // currentLocationLabel={location}
              fetchDetails={true}
              onPress={(data, details) => {
                // 'details' is provided when fetchDetails = true
                console.log('Google Search Api : ', data.description);
                setCoordinates(details.geometry.location);
                setLocation(data.description);
              }}
              query={{
                key: 'AIzaSyBTsC4XcbDQgH_tBwHdKAUUXyVtdOTL4l0',
                language: 'en',
              }}
              GooglePlacesDetailsQuery={{fields: 'geometry'}}
              renderLeftButton={() => (
                <IconComp
                  name="search"
                  type="MaterialIcons"
                  iconStyle={styles.iconStyle}
                />
              )}
              // renderRightButton={() => (
              //   <TouchableOpacity onPress={() => _onMicPress()}>
              //     <IconComp
              //       name="mic"
              //       type="Ionicons"
              //       iconStyle={styles.myLocationIconStyle}
              //     />
              //   </TouchableOpacity>
              // )}
              styles={{
                textInputContainer: {
                  alignSelf: 'center',
                  width: width * 0.9,
                  borderRadius: width * 0.04,
                  borderWidth: 1.2,
                  height: height * 0.084,
                  borderColor: colors.themePurple1,
                },
                textInput: {
                  height: height * 0.084,
                  fontFamily: 'Poppins-Regular',
                  color: '#5d5d5d',
                  backgroundColor: 'rgba(0,0,0,0.006)',
                  fontSize: width * 0.04,
                },
              }}
            />

            {/* Date Pickers  */}
            <View style={styles.rowView}>
              {/* start date  */}
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={styles.datePickerView}
                  activeOpacity={0.7}
                  onPress={() => {
                    setShowStartDatePicker(true);
                  }}>
                  <Heading
                    title={moment(startDate).format('DD-MMM-YYYY')}
                    passedStyle={styles.additionalInfoText}
                  />
                  <Heading
                    title={moment(startDate).format('hh:mm A')}
                    passedStyle={styles.additionalInfoText}
                  />
                </TouchableOpacity>
                <IconComp
                  type="Ionicons"
                  name="calendar"
                  iconStyle={styles.eventStyle}
                />
              </View>

              {/* end date  */}
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={styles.datePickerView}
                  activeOpacity={0.7}
                  onPress={() => {
                    setShowEndDatePicker(true);
                  }}>
                  <Heading
                    title={moment(endDate).format('DD-MMM-YYYY')}
                    passedStyle={styles.additionalInfoText}
                  />
                  <Heading
                    title={moment(endDate).format('hh:mm A')}
                    passedStyle={styles.additionalInfoText}
                  />
                </TouchableOpacity>
                <IconComp
                  type="Ionicons"
                  name="calendar"
                  iconStyle={styles.eventStyle}
                />
              </View>
            </View>

            {/* Next Button  */}
            <Button
              title="Next"
              onBtnPress={() => _onNextPress()}
              btnStyle={styles.btnStyle}
              isBgColor={false}
              btnTextStyle={{fontFamily: 'Poppins-SemiBold', color: 'white'}}
            />
          </View>
        </ScrollView>

        {showIncompleteFormAlert && (
          <AlertModal
            title="Oh Snaps :("
            message={'Some fields have been left empty.'}
            isModalVisible={showIncompleteFormAlert}
            setIsModalVisible={setShowIncompleteFormAlert}
          />
        )}

        {/* Start Date Picker  */}
        <DatePicker
          modal
          // mode="date"
          open={showStartDatePicker}
          minimumDate={startDate}
          date={startDate}
          onConfirm={date => {
            setShowStartDatePicker(false);
            setStartDate(date);
          }}
          onCancel={() => {
            setShowStartDatePicker(false);
          }}
        />
        {/* End Date Picker  */}
        <DatePicker
          modal
          // mode="date"
          minimumDate={endDate}
          open={showEndDatePicker}
          date={endDate}
          onConfirm={date => {
            setShowEndDatePicker(false);
            setEndDate(date);
          }}
          onCancel={() => {
            setShowEndDatePicker(false);
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(Translator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dropdown: {
    marginTop: height * 0.03,
    paddingLeft: width * 0.03,
    borderWidth: 1.2,
    borderColor: colors.themePurple1,
    borderRadius: width * 0.04,
    width: width * 0.9,
    backgroundColor: 'rgba(0,0,0,0.05)',
    height: height * 0.085,
  },
  inputField: {
    marginTop: height * 0.03,
    height: height * 0.23,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1.2,
    borderColor: colors.themePurple1,
    borderRadius: width * 0.05,
    width: width * 0.9,
    fontSize: width * 0.04,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.025,
    textAlignVertical: 'top',
  },
  mapView: {
    height: height * 0.45,
    width: width,
    position: 'relative',
  },
  map: {
    width: '120%',
    marginLeft: -30,
    height: '100%',
  },
  filterView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.02,
  },
  btnStyle: {
    marginTop: height * 0.03,
    backgroundColor: colors.themePurple1,
    borderRadius: width * 0.07,
    width: width * 0.9,
  },
  iconStyle: {
    color: 'grey',
    fontSize: width * 0.06,
    alignSelf: 'center',
    paddingLeft: width * 0.05,
    paddingVertical: height * 0.02,
    // backgroundColor: 'rgba(0,0,0,0.03)',
  },
  eventStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.07,
    alignSelf: 'center',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.02,
    // backgroundColor: 'rgba(0,0,0,0.03)',
  },
  languageStyle: {
    color: 'grey',
    fontSize: width * 0.06,
    alignSelf: 'center',
    paddingLeft: width * 0.05,
    paddingVertical: height * 0.02,
  },
  myLocationIconStyle: {
    color: 'grey',
    fontSize: width * 0.05,
    marginTop: height * 0.005,
    paddingRight: width * 0.04,
    paddingVertical: height * 0.02,
    // backgroundColor: 'rgba(0,0,0,0.03)',
  },
  additonalInfoView: {
    marginVertical: height * 0.03,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width * 0.9,
    borderRadius: width * 0.04,
    borderWidth: 1.2,
    height: height * 0.084,
    borderColor: colors.themePurple1,
    position: 'relative',
  },
  menuStyle: {
    color: '#5d5d5d',
    fontSize: width * 0.04,
    paddingHorizontal: width * 0.05,
  },
  caretdown: {
    color: '#5d5d5d',
    fontSize: width * 0.03,
    position: 'absolute',
    bottom: height * 0.03,
    right: width * 0.045,
  },
  additionalInfoText: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: width * 0.04,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.015,
  },
  datePickerView: {
    // marginVertical: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.32,
    borderRadius: width * 0.04,
    borderWidth: 1.2,
    height: height * 0.084,
    borderColor: colors.themePurple1,
  },
});
