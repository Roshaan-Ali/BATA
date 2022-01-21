import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
// import {MotiView} from 'moti';
import {connect} from 'react-redux';
import colors from '../assets/colors';
import Header from '../components/Header';
import Heading from '../components/Heading';
// import MapView, {Marker} from 'react-native-maps';
import * as actions from '../store/actions/actions';
import AppStatusBar from '../components/AppStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapViewDirections from 'react-native-maps-directions';
import RatingsAndReviewsModal from '../components/RatingsAndReviewsModal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
// import Geolocation from 'react-native-geolocation-service';
import CurrentInterpreter from '../components/CurrentInterpreter';
import AlertModal from '../components/AlertModal';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useIsFocused} from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0925;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const API_MAP_KEY = 'AIzaSyBTsC4XcbDQgH_tBwHdKAUUXyVtdOTL4l0';
const Home = ({
  navigation,
  UserReducer,
  setErrorModal,
  completeEvent,getCurrentBooking,
  submitReviewsAndRatings,
}) => {
  var watchID = useRef(null);
  const isFocused = useIsFocused();
  const [mapRef, setMapRef] = useState(null);
  const accessToken = UserReducer?.accessToken;
  const [isLoading, setIsLoading] = useState(false);
  const [bookingId, setBookingId] = useState(false);
  const currentBooking = UserReducer?.currentBooking;
  const [hasAlreadyBooked, setHasAlreadyBooked] = useState(false);
  const [showRatingsReviewsModal, setShowRatingsReviewsModal] = useState(false);
  const [showMustBuyPackageModal, setShowMustBuyPackageModal] = useState(false);
  const [showFailedCompletingModal, setShowFailedCompletingModal] =
    useState(false);

  //
  const username = UserReducer?.userData?.first_name;
  // const [coordinates, setCoordinates] = useState({
  //   latitude: UserReducer?.coords?.lat,
  //   longitude: UserReducer?.coords?.lng,
  // });\

  const [coordinates2, setCoordinates2] = useState({
    latitude: 24.9298,
    longitude: 67.1148,
  });

  const [coordinatesLat, setCoordinatesLat] = useState(
    UserReducer?.coords?.lat,
  );
  const [coordinatesLong, setCoordinatesLong] = useState(
    UserReducer?.coords?.lng,
  );
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');
        console.log(position, 'getOneTimeLocation');

        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };

        // if(mapRef){
        //   // alert("SAD")
        //   mapRef.animateToRegion(region,1000)
        // }
        //getting the Longitude from the location json
        // const currentLongitude =
        //   JSON.stringify(position.coords.longitude);

        // //getting the Latitude from the location json
        // const currentLatitude =
        //   JSON.stringify(position.coords.latitude);

        // //Setting Longitude state
        // setCurrentLongitude(currentLongitude);

        // //Setting Longitude state
        // setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };

        // if(mapRef){
        //   mapRef.animateToRegion(region,1000)
        // }
        setLocationStatus('You are Here');
        console.log(position, 'subscribeLocationLocation');
        setCoordinatesLat(position.coords.latitude);
        setCoordinatesLong(position.coords.longitude);
        //getting the Longitude from the location json
        // const currentLongitude =
        //   JSON.stringify(position.coords.longitude);

        // //getting the Latitude from the location json
        // const currentLatitude =
        //   JSON.stringify(position.coords.latitude);

        // //Setting Longitude state
        // setCurrentLongitude(currentLongitude);

        // //Setting Latitude state
        // setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  async function fitMapToBounds() {
    // console.log(coordinatesLat)
    // console.log(coordinatesLong)
    // const region = {
    //   latitude: position.coords.latitude,
    //   longitude: position.coords.longitude,
    //   latitudeDelta: LATITUDE_DELTA,
    //   longitudeDelta: LONGITUDE_DELTA,
    // }

    if (mapRef) {
      // console.log(mapRef)
      // mapRef.animateToRegion(region,1000)
    }
    // mapRef.fitToCoordinates([coordinatesLat, coordinatesLong] ,{ edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false });
  }

  // const watchLocation = () => {
  //   watchID.current = Geolocation.watchPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       const newCoordinate = {
  //         latitude,
  //         longitude,
  //       };
  //       setCoordinates(newCoordinate);
  //     },
  //     error => console.log(error),

  //     {
  //       enableHighAccuracy: true,
  //       timeout: 2000,
  //     },
  //   );
  // };

  const _onSucessSubmitReview = () => {
    setShowRatingsReviewsModal(false);
  };

  const _onPressSubmitReview = async (review, ratings) => {
    const data = {
      // interpreter: 1,
      comment: review,
      booking: bookingId,
      rate: ratings,
    };
    setIsLoading(true);
    await submitReviewsAndRatings(data, accessToken, _onSucessSubmitReview);
    setIsLoading(false);
  };

  const _onPressComplete = async () => {
    setIsLoading(true);
    await completeEvent(
      UserReducer?.currentBooking?.id,
      accessToken,
      _onSuccessCompleteEvent,
    );
    setIsLoading(false);
  };

  const _onSuccessCompleteEvent = id => {
    setShowRatingsReviewsModal(true);
    setBookingId(id);
  };

  useEffect(() => {
    if (UserReducer?.errorModal?.status) {
      setShowFailedCompletingModal(true);
    }
    if (UserReducer?.errorModal?.status === false) {
      setShowFailedCompletingModal(false);
    }
  }, [UserReducer.errorModal]);

  useEffect(() => {
    getCurrentBooking();
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        {/* <AppStatusBar
          backgroundColor={colors.themePurple1}
          barStyle="light-content"
        /> */}
        {/* Header  */}
        <Header title="Menu" navigation={navigation} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          {/* Greeting Container  */}
          <View style={styles.greetingContainer}>
            <View style={styles.animationView}>
              {/* <MotiView
                from={{
                  opacity: 0.5,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  type: 'timing',
                  loop: true,
                  duration: 1000,
                }}> */}
              <Heading
                title="Welcome,"
                passedStyle={styles.heading}
                fontType="light"
              />
              <Heading
                title={username}
                passedStyle={[
                  styles.heading_username,
                  username?.length > 7 && {fontSize: width * 0.08},
                ]}
                fontType="bold"
              />
              {/* </MotiView> */}
            </View>
            {/* Wave Image  */}
            {/* <MotiView
            from={{
              opacity: 1,
              scale: 1,
              rotate: '0 deg',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: '1 deg',
            }}
            transition={{
              type: 'timing',
              loop: true,
              duration: 1000,
            }}> */}
            <Image
              source={require('../assets/Images/handeshake.png')}
              style={styles.imageStyle}
            />
            {/* </MotiView> */}
          </View>

          {/* Home Options  */}
          <View style={styles.optionsWrapper}>
            {/* Translators  */}
            <TouchableOpacity
              style={styles.optionContainer}
              activeOpacity={0.7}
              onPress={() => {
                if (
                  UserReducer?.userData?.current_package === null ||
                  UserReducer?.userData?.current_package === undefined
                ) {
                  setShowMustBuyPackageModal(true);
                } else if (
                  UserReducer?.currentBooking !== null &&
                  UserReducer?.currentBooking !== undefined
                ) {
                  setHasAlreadyBooked(true);
                } else {
                  navigation.navigate('Translator');
                }
              }}>
              <View style={styles.optionImageContainer}>
                <Image
                  source={require('../assets/Images/translate.png')}
                  style={styles.optionImageStyle}
                />
              </View>
              <Heading
                passedStyle={styles.textStyle}
                title={'Interpreters'}
                fontType="regular"
              />
            </TouchableOpacity>

            {/* Packages  */}
            <TouchableOpacity
              style={styles.optionContainer}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Packages')}>
              <View style={styles.optionImageContainer}>
                <Image
                  source={require('../assets/Images/package.png')}
                  style={styles.optionImageStyle}
                />
              </View>
              <Heading
                passedStyle={styles.textStyle}
                title={'Packages'}
                fontType="regular"
              />
            </TouchableOpacity>
          </View>

          {/* Map  */}
          <View style={styles.map}>
            <MapView
              style={{width: width * 0.8, height: height * 0.36}}
              ref={ref => setMapRef(ref)}
              // showsMyLocationButton={true}
              showsCompass={true}
              zoomEnabled={true}
              maxZoomLevel={18}
              minZoomLevel={9}
              followsUserLocation={true}
              scrollEnabled={true}
              mapType={Platform.OS == 'android' ? 'terrain' : 'standard'}
              initialRegion={{
                latitude: coordinatesLat || UserReducer?.coords?.lat,
                longitude: coordinatesLong || UserReducer?.coords?.lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              provider={PROVIDER_GOOGLE}
              // lat: "24.9180588",
              // lng: "67.0947953"
              onMapReady={() => {
                fitMapToBounds();
              }}
              // onRegionChangeComplete={e => {
              //   mapRef.animateCamera({
              //     center: {
              //       latitude: coordinatesLat,
              //       longitude: coordinatesLong,
              //       latitudeDelta: LATITUDE_DELTA,
              //       longitudeDelta: LONGITUDE_DELTA
              //     },
              //     heading: 10,
              //     pitch: 80,
              //     altitude: 400,
              //     zoom: 10,
              //   });
              // }}
            >
              {/* <MapViewDirections
                origin={coordinates}
                destination={coordinates2}
                apikey={
                  'AIzaSyBTsC4XcbDQgH_tBwHdKAUUXyVtdOTL4l0'
                  // 'AIzaSyCyY4IPLEvPRxEtaWFcRWHkWG6n0nFYzEE'
                }
                strokeWidth={4}
                strokeColor="#81246C"
              /> */}
              <Marker
                coordinate={{
                  latitude: coordinatesLat,
                  longitude: coordinatesLong,
                }}
              />
              {/* <Marker coordinate={coordinates2} /> */}
              {/* <Marker ref={markerRef} coordinate={coordinates2}>
                <Image
                  source={require('../assets/Images/translator.png')}
                  resizeMode="contain"
                  style={{
                    width: width * 0.1,
                    height: height * 0.03,
                  }}
                />
              </Marker> */}
            </MapView>
          </View>
          {currentBooking !== null &&
            currentBooking !== undefined &&
            currentBooking?.status !== 'completed' && (
              <>
                <Heading
                  title="Booking Detail"
                  fontType={'bold'}
                  passedStyle={{
                    color: 'black',
                    fontSize: width * 0.06,
                    marginLeft: width * 0.05,
                  }}
                />
                <CurrentInterpreter
                  item={currentBooking}
                  isLoading={isLoading}
                  onPress={_onPressComplete}
                  // key={currentBooking.id}
                />
              </>
            )}
          {showRatingsReviewsModal && (
            <RatingsAndReviewsModal
              isModalVisible={showRatingsReviewsModal}
              onPress={_onPressSubmitReview}
              isLoading={isLoading}
              setIsModalVisible={setShowRatingsReviewsModal}
            />
          )}
          {hasAlreadyBooked && (
            <AlertModal
              title="Not allowed!"
              message={'You have already booked an interpreter.'}
              isModalVisible={hasAlreadyBooked}
              setIsModalVisible={setHasAlreadyBooked}
            />
          )}
          {showMustBuyPackageModal && (
            <AlertModal
              title="Not allowed!"
              message={'You need to buy a package first.'}
              isModalVisible={showMustBuyPackageModal}
              setIsModalVisible={setShowMustBuyPackageModal}
            />
          )}
          {isFocused && showFailedCompletingModal && (
            <AlertModal
              title="Oh Snaps :("
              // message={"idher se araha ha"}
              message={UserReducer?.errorModal?.msg}
              isModalVisible={showFailedCompletingModal}
              setIsModalVisible={setShowFailedCompletingModal}
              onPress={() => {
                setErrorModal();
                setShowFailedCompletingModal(false);
              }}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  animationView: {
    flexDirection: 'column',
    marginLeft: width * 0.05,
  },
  optionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.025,
    width: width * 0.9,
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
  textStyle: {
    fontSize: width * 0.04,
    color: 'black',
    textTransform: 'capitalize',
  },
  myRatings: {
    fontSize: width * 0.04,
    color: 'white',
    marginTop: height * 0.01,
  },
  optionImageContainer: {
    paddingVertical: height * 0.032,
    paddingHorizontal: width * 0.12,
    marginBottom: height * 0.018,
    backgroundColor: colors?.themePurple1,
    borderRadius: width * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingsContainer: {
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.1,
    marginBottom: height * 0.018,
    backgroundColor: colors?.themePurple1,
    borderRadius: width * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionImageStyle: {
    width: width * 0.1,
    height: height * 0.05,
  },
  reviewImageStyle: {
    width: width * 0.1,
    height: height * 0.05,
  },
  optionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.02,
    width: width * 0.4,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    marginVertical: height * 0.04,
    width: width * 0.8,
    height: height * 0.36,
    alignSelf: 'center',
    borderRadius: width * 0.05,
    overflow: 'hidden',
  },
  img_wave: {
    marginTop: height * 0.15,
    marginLeft: width * 0.12,
  },
  heading: {
    color: 'black',
    fontSize: width * 0.11,
  },
  heading_username: {
    color: colors.themePurple1,
    fontSize: width * 0.11,
    textTransform: 'capitalize',
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    textTransform: 'capitalize',
    marginTop: height * 0.02,
    marginHorizontal: width * 0.05,
  },
  imageStyle: {
    width: width * 0.16,
    marginLeft: width * 0.05,
    height: height * 0.08,
  },
  flatListStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.045,
  },
  paymentOptionsContainer: {
    borderWidth: 1.2,
    paddingVertical: height * 0.02,
    width: width * 0.8,
    marginHorizontal: width * 0.1,
    borderRadius: width * 0.04,
    borderColor: colors.themePurple1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardTextView: {
    flexDirection: 'column',
    marginRight: width * 0.1,
  },
  cardPaymenLabelText: {
    color: 'black',
    fontSize: width * 0.045,
  },
  cardImage: {
    width: width * 0.2,
    height: height * 0.07,
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(Home);
