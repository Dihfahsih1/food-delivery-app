import React from 'react';
import {View,SafeAreaView,Image, TouchableOpacity, StyleSheet,FlatList, Text} from 'react-native';

import {COLORS, icons, images, SIZES,FONTS} from '../constants'

const Home = () => {
  return (
    <View>
      <Text></Text>

    </View>
  )

};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: COLORS.lightGray1

  },
  shadow:{
    shadowColor: '#000',
    shadowOffset:{
      widith:0,
      height: 3,
    },
    shadowOpacity:0.1,
    shadowRadius:3,
    elevation:1
  }
})

export default Home;
