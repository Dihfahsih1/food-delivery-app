import React from 'react';
import {View,SafeAreaView,Image, TouchableOpacity, StyleSheet,FlatList, Text, Animated} from 'react-native';

import {COLORS, icons, images, SIZES,FONTS} from '../constants'
const Restaurant = ({route, navigation}) => {

  const[restaurant, setRestaurant] = React.useState(null);
  const[currentLocation, setcurrentLocation] = React.useState(null);

  React.useEffect(() =>{
    let{item, currentLocation} = route.params

    setRestaurant(item)
    setcurrentLocation(currentLocation)
  })

function renderHeader(){
  return (
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity
        style={{width:50, paddingLeft:SIZES.padding * 1, justifyContent:'center'}}
        
        onPress={() => navigation.goBack()}>

        <Image
          source={icons.back}
          resizeMode='contain'
          style={{width:30, height:30}}/>
      </TouchableOpacity>

    </View>
  )
}

  return (
    <SafeAreaView>
      {renderHeader()}
    </SafeAreaView>
  )

};
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:COLORS.lightGray2

  }

})

export default Restaurant;