import React from 'react';
import {View,SafeAreaView,Image, TouchableOpacity, StyleSheet,FlatList, Text, Animated} from 'react-native';
import MapView ,{PROVIDER_GOOGLE, Marker} from 'react-native-maps'
const OrderDelivery = () => {
  function renderMap(){
    return(
      <View style={{flex: 1}}>
        <MapView style={{flex: 1}}>

        </MapView>
        
      </View>

    )
  }
  return (
    <View style={{ flex: 1}}>
      {renderMap()}
      

    </View>
  )

};

export default OrderDelivery;