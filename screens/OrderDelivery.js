import React from 'react';
import {View,SafeAreaView,Image, TouchableOpacity, StyleSheet,FlatList, Text, Animated} from 'react-native';
import MapView ,{PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import {COLORS, icons, images, SIZES,FONTS, GOOGLE_API_KEY} from '../constants'
const OrderDelivery = (route, navigation) => {
  
  const [restaurant, setRestaurant] = React.useState(restaurantData)
  const [ streetName, setStreetName] = React.useState('')
  const [fromLocation, setFromLocation] = React.useState(null)
  const [toLocation, setToLocation] = React.useState(null)
  const [region, setRegion] = React.useState(null)
  
  React.useEffect(() =>{
    let{restaurant, currentLocation} = route.params;
    let fromLoc = currentLocation.gps
    let toLoc = restaurant.toLocation
  }, [])
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