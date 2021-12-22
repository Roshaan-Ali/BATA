import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import Heading from '../components/Heading';
import colors from '../assets/colors';
import HomeOptions from '../components/HomeOptions';
import Header from '../components/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import {MotiView} from 'moti';
import * as actions from '../store/actions/actions';
import {connect} from 'react-redux';
// import BoxComp from '../components/BoxComp';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Home({navigation, UserReducer}) {
  const [username, setUsername] = useState(
    UserReducer?.userData?.username?.split(' ')[0],
  );

  // const _onPressOption = (item, index) => {
  //   navigation.navigate(item?.routeName);
  // };

  console.log(UserReducer?.userData);
  const _onPaymentCardPress = () => {
    console.log('Payment Card Selected');
  };

  return (
    <View style={styles.container}>
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
            showsMyLocationButton={true}
            zoomEnabled={true}
            scrollEnabled={true}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onRegionChangeComplete={e => {
              console.log(e);
            }}></MapView>
        </View>
      </ScrollView>
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
    marginTop: height * -0.03,
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
