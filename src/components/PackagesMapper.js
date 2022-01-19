import React from 'react';
import {FlatList, StyleSheet, Text, View, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../assets/colors';
import Button from './Button';
import Heading from './Heading';
import PackageFeaturesMapper from './PackageFeaturesMapper';

const {width, height} = Dimensions.get('window');

const PackagesMapper = ({item, index, onPress, current_package}) => {
  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        data={item?.description}
        keyExtractor={item => item?.id?.toString()}
        ListHeaderComponentStyle={styles.flatListHeaderStyle}
        ListFooterComponentStyle={styles.flatListFooterStyle}
        renderItem={({item, index}) => (
          <PackageFeaturesMapper item={item} index={index} />
        )}
        ListHeaderComponent={() => (
          <Heading
            title={item.name}
            passedStyle={styles.packageName}
            fontType="semi-bold"
          />
        )}
        ListFooterComponent={() =>
          current_package?.id === item.id ? (
            <View
              style={{
                width: width * 0.7,
                paddingVertical: height * 0.01,
                borderRadius: width * 0.07,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: colors.themeYellow,
              }}>
              <Heading
                title={'Activated'}
                fontType={'semi-bold'}
                passedStyle={{fontSize: width * 0.06, color: 'black'}}
              />
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.btnStyle}
              onPress={() => onPress(item, index)}>
              <Heading
                title="Get Started"
                passedStyle={styles.btnTextStyle}
                fontType={'semi-bold'}
              />
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
};

export default PackagesMapper;

const styles = StyleSheet.create({
  container: {
    width: width * 0.85,
    marginBottom: height * 0.05,
    borderRadius: width * 0.05,
    backgroundColor: colors.themePurple1,
    paddingVertical: height * 0.07,
    paddingHorizontal: width * 0.1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
  },
  packageName: {
    color: 'white',
    fontSize: width * 0.09,
    textTransform: 'capitalize',
  },
  flatListHeaderStyle: {
    paddingBottom: height * 0.025,
  },
  flatListFooterStyle: {
    marginTop: height * 0.045,
  },
  btnStyle: {
    backgroundColor: 'white',
    width: width * 0.65,
    paddingVertical: height * 0.018,
    borderRadius: width * 0.08,
    alignItems: 'center',
  },
  btnTextStyle: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
});
