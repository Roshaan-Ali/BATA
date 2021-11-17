import React from 'react';
import {StyleSheet, View, Image, Dimensions, Text} from 'react-native';
import Heading from '../components/Heading';
import colors from '../assets/colors';
// import BoxComp from '../components/BoxComp';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Home(props) {
  const {navigation} = props;
  let name = 'Minhal';
  return (
    <View style={styles.container}>
      {/* <Image source={wave} style={styles.img_wave} />

      <View style={{flexDirection:"row"}}>
        <Heading title="Hello," passedStyle={styles.heading} />
        <Heading title={name} passedStyle={styles.heading_username} />
        <BoxComp/>
      </View> */}

      <Text style={{fontSize: 24, fontWeight: 'bold'}}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img_wave: {
    marginTop: height * 0.15,
    marginLeft: width * 0.12,
  },
  heading: {
    color: 'black',
    marginLeft: width * 0.12,
    fontSize: width * 0.11,
    fontWeight: 'bold',
  },
  heading_username: {
    color: colors.themePurple,
    fontSize: width * 0.11,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default Home;
