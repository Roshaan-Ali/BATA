import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import colors from '../assets/colors';
import Header from '../components/Header';
import Heading from '../components/Heading';
import PackagesMapper from '../components/PackagesMapper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// on Packages Press
const _onPackagePress = ({item, index}) => {
  console.log('Pressed Pacakages');
};

const Packages = ({navigation}) => {
  const history = navigation.getState();
  
  console.log({history})
  return (
    <View style={styles.container}>
      {/* Header  */}
      <Header title="Menu" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Our Packages  */}
        <View style={styles.rowView}>
          <Heading title="Our" passedStyle={styles.ourLabel} />
          <Heading title="Packages" passedStyle={styles.packageLabel} />
        </View>

        {/* Packages Rendering  */}
        <FlatList
          data={dummyPackages}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={styles.flatListStyle}
          renderItem={({item, index}) => (
            <PackagesMapper
              item={item}
              index={index}
              onPress={_onPackagePress}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Packages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowView: {
    marginTop: height * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: width * 0.05,
  },
  ourLabel: {
    fontSize: width * 0.09,
    color: 'black',
    paddingRight: width * 0.02,
  },
  packageLabel: {
    fontSize: width * 0.09,
    color: colors.themePurple1,
    fontWeight: '800',
  },
  flatListStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.06,
    paddingBottom:100,
  },
});

const dummyPackages = [
  {
    _id: 1,
    package: {
      name: 'package 1',
      features: [
        {
          _id: 1,
          name: 'lorem ipsum',
        },
        {
          _id: 2,
          name: 'lorem ipsum',
        },
        {
          _id: 3,
          name: 'lorem ipsum',
        },
        {
          _id: 4,
          name: 'lorem ipsum',
        },
        {
          _id: 5,
          name: 'lorem ipsum',
        },
      ],
    },
  },

  {
    _id: 2,
    package: {
      name: 'package 2',
      features: [
        {
          _id: 1,
          name: 'lorem ipsum',
        },
        {
          _id: 2,
          name: 'lorem ipsum',
        },
        {
          _id: 3,
          name: 'lorem ipsum',
        },
        {
          _id: 4,
          name: 'lorem ipsum',
        },
        {
          _id: 5,
          name: 'lorem ipsum',
        },
      ],
    },
  },

  {
    _id: 3,
    package: {
      name: 'package 3',
      features: [
        {
          _id: 1,
          name: 'lorem ipsum',
        },
        {
          _id: 2,
          name: 'lorem ipsum',
        },
        {
          _id: 3,
          name: 'lorem ipsum',
        },
        {
          _id: 4,
          name: 'lorem ipsum',
        },
        {
          _id: 5,
          name: 'lorem ipsum',
        },
      ],
    },
  },
];
