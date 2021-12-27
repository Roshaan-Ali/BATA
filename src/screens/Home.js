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
import {MotiView} from 'moti';
import {connect} from 'react-redux';
import colors from '../assets/colors';
import Header from '../components/Header';
import Heading from '../components/Heading';
import MapView, {Marker} from 'react-native-maps';
import * as actions from '../store/actions/actions';
import AppStatusBar from '../components/AppStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapViewDirections from 'react-native-maps-directions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Home({navigation, UserReducer}) {
  var watchID = useRef(null);
  const [mapRef, setMapRef] = useState(null);
  var markerRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [username, setUsername] = useState(
    UserReducer?.userData?.username?.split(' ')[0],
  );
  const [coordinates, setCoordinates] = useState({
    latitude: 24.9219,
    longitude: 67.0941,
  });

  const [coordinates2, setCoordinates2] = useState({
    latitude: 24.9298,
    longitude: 67.1148,
  });
  // const _onPressOption = (item, index) => {
  //   navigation.navigate(item?.routeName);
  // };

  const _onPaymentCardPress = () => {
    console.log('Payment Card Selected');
  };

  async function fitMapToBounds() {
    mapRef.fitToCoordinates(coordinates);
  }

  const watchLocation = () => {
    // const coordinate = state
    watchID = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        alert("SAD")
        const newCoordinate = {
          latitude,
          longitude
        };
        console.log("latitude, longitude ",latitude, longitude )
        // if (Platform.OS === "android") {
        //   if (markerRef) {
        //       markerRef._component.animateMarkerToCoordinate(
        //       newCoordinate,
        //       500 // 500 is the duration to animate the marker
        //     );
        //   }
        // } else {
        //   coordinate.timing(newCoordinate).start();
        // }
        // onChangeLong(latitude)
        // onChangeLat(longitude)
        // setState({
        //   latitude: parseFloat(latitude),
        //   longitude: parseFloat(longitude)
        // });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  };

  // const watchMyPosition = () => {
  //   // Geolocation.requestAuthorization();
  //   watchID = Geolocation.watchPosition(
  //     pos => {
  //       console.log("sssssssssssssss--------",pos)
  //       setPosition(pos);
  //     },
  //     err => {
  //       console.log("sssssssssssssss--------")
  //       console.warn('ERROR(' + err.code + '): ' + err.message);
  //     },
  //   );
  // };
  // const watchLocation = () => {
  //   const coordinate = {...position};
  //   console.log("test")
  //   // const config = {
  //   //   enableHighAccuracy: true,
  //   //   timeout: 2000,
  //   //   maximumAge: 3600000,
  //   // };
  //   // Geolocation.getCurrentPosition(
  //   //   info => console.log(info),
  //   //   er => console.log(er),
  //   //   config  
  //   // );
  //   watchID = Geolocation.watchPosition(
  //     pos => {
  //       const {latitude, longitude} = pos.coords;

  //       const newCoordinate = {
  //         latitude,
  //         longitude,
  //       };
  //       console.log('latitude, longitude ', latitude, longitude);
  //       if (Platform.OS === 'android') {
  //         if (markerRef) {
  //           markerRef._component.animateMarkerToCoordinate(
  //             newCoordinate,
  //             500, // 500 is the duration to animate the marker
  //           );
  //         }
  //       } else {
  //         coordinate.timing(newCoordinate).start();
  //       }
  //       // onChangeLong(latitude);
  //       // onChangeLat(longitude);
  //       // setPosition({
  //       //   latitude: parseFloat(latitude),
  //       //   longitude: parseFloat(longitude),
  //       // });
  //     },
  //     error => console.log(error),
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 20000,
  //       maximumAge: 1000,
  //       distanceFilter: 10,
  //     },
  //   );
  // };

  // useEffect(() => {
  //   console.log({position});
  //   console.log({watchID});
  // }, [position]);

  useEffect(() => {
    watchLocation();
    // return Geolocation.clearWatch(watchID);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <AppStatusBar
          backgroundColor={colors.themePurple1}
          barStyle="light-content"
        />
        {/* Header  */}
        <Header title="Menu" navigation={navigation} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          {/* Greeting Container  */}
          <View style={styles.greetingContainer}>
            <View style={{flexDirection: 'column', marginLeft: width * 0.05}}>
              <MotiView
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
                }}>
                <Heading
                  title="Welcome,"
                  passedStyle={styles.heading}
                  fontType="light"
                />
                <Heading
                  title={username}
                  // title={username.length > 8 ? `${username.substring(0,8)}...` : username}
                  passedStyle={[
                    styles.heading_username,
                    username?.length > 7 && {fontSize: width * 0.08},
                  ]}
                  fontType="bold"
                />
              </MotiView>
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
          {/* <FlatList
          nestedScrollEnabled={true}
          data={options}
          contentContainerStyle={styles.flatListStyle}
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={item => item._id.toString()}
          renderItem={({item, index}) => {
            return (
              <HomeOptions item={item} index={index} onPress={_onPressOption} />
            );
          }}
        /> */}

          {/* Home Options  */}
          <View style={styles.optionsWrapper}>
            {/* Translators  */}
            <TouchableOpacity
              style={styles.optionContainer}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Translator')}>
              <View style={styles.optionImageContainer}>
                <Image
                  source={require('../assets/Images/translate.png')}
                  style={styles.optionImageStyle}
                />
              </View>
              <Heading
                passedStyle={styles.textStyle}
                title={'Translators'}
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

          {/* Payment Options  */}
          {/* <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => _onPaymentCardPress()}
          style={styles.paymentOptionsContainer}>
          <View style={styles.cardTextView}>
            <Heading
              title="Card"
              passedStyle={styles.cardPaymenLabelText}
              fontType="medium"
            />
            <Heading
              title="Payment"
              passedStyle={styles.cardPaymenLabelText}
              fontType="medium"
            />
          </View>

          <Image
            source={require('../assets/Images/mastercard.png')}
            style={styles.cardImage}
          />
        </TouchableOpacity> */}

          {/* Map  */}
          <View style={styles.map}>
            <MapView
              style={{width: width * 0.8, height: height * 0.36}}
              ref={ref => {
                setMapRef(ref);
              }}
              showsMyLocationButton={true}
              zoomEnabled={true}
              followsUserLocation={true}
              scrollEnabled={true}
              initialRegion={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onMapReady={() => {
                fitMapToBounds();
              }}
              onRegionChangeComplete={e => {
                // mapRef.animateCamera({
                //   center: {
                //     latitude: coordinates.latitude,
                //     longitude: coordinates.longitude,
                //   },
                //   heading: 0,
                //   pitch: 90,
                //   altitude: 200,
                //   zoom: 12,
                // });
              }}>
              <MapViewDirections
                origin={coordinates}
                destination={coordinates2}
                apikey={
                  'AIzaSyBTsC4XcbDQgH_tBwHdKAUUXyVtdOTL4l0'
                  // 'AIzaSyCyY4IPLEvPRxEtaWFcRWHkWG6n0nFYzEE'
                }
                strokeWidth={4}
                strokeColor="#81246C"
              />
              <Marker coordinate={coordinates} />
              {/* <Marker coordinate={coordinates2} /> */}
              <Marker
              ref={markerRef}
                coordinate={coordinates2}
                >
                <Image
                  source={require('../assets/Images/translator.png')}
                  resizeMode="contain"
                  style={{
                    width: width * 0.1,
                    height: height * 0.03,
                  }}
                />
              </Marker>
            </MapView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.025,
    // backgroundColor: 'red',
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
    // backgroundColor:'yellow'
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
    // marginLeft: width * 0.12,
    fontSize: width * 0.11,
  },
  heading_username: {
    color: colors.themePurple1,
    fontSize: width * 0.11,
    // marginTop: height * -0.03,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
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

const options = [
  {
    _id: 1,
    image: require('../assets/Images/translate.png'),
    text: 'translator',
    routeName: 'Translator',
  },
  {
    _id: 2,
    image: require('../assets/Images/package.png'),
    text: 'packages',
    routeName: 'Packages',
  },
];
