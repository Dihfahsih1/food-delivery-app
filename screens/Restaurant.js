import React from 'react';
import {View,SafeAreaView,Image, TouchableOpacity, StyleSheet,FlatList, Text, Animated} from 'react-native';

import {COLORS, icons, images, SIZES,FONTS} from '../constants'
const Restaurant = ({route, navigation}) => {
  const scrollx = new Animated.Value(0)
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
        style={{width:50, paddingLeft:SIZES.padding * 2, justifyContent:'center'}}
        
        onPress={() => navigation.goBack()}>

        <Image
          source={icons.back}
          resizeMode='contain'
          style={{width:30, height:30}}/>
      </TouchableOpacity>

      {/* restaurant name */}

      <View style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center',

      }}>

        <View style={{
          height:50,
          alignItems:'center',
          justifyContent:'center',
          paddingHorizontal: SIZES.padding *3,
          borderRadius:SIZES.radius,
          backgroundColor: COLORS.lightGray2
        }}>
          <Text style={{...FONTS.h3}}>{restaurant?.name}</Text>

        </View>

      </View>
      <TouchableOpacity style={{
        width:50,
        paddingRight:SIZES.padding * 2,
        justifyContent:'center',
        
        }}>

        <Image 
          source={icons.menu}
          resizeMode='contain'
          style={{width:30, height:30}}
        
        />


      </TouchableOpacity>

    </View>
  )
}
  function renderFoodInfo(){
    return(
      <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment='center'
          showsHorizontalScrollIndicator={false}>
          
          {
            restaurant?.menu.map((item, index) =>(
              <View
              key={`menu-${index}`}
              style={{alignItems:'center'}}>
                <View style={{height:SIZES.height *0.35}}>

                  {/* food image */}

                  <Image
                      source={item.photo}
                      resizeMode = 'cover'
                      style={{
                        width:SIZES.width,
                        height:'100%'
                      }}/>
                  {/* Quantity section */}
                  <View style={{position:'absolute', bottom: -20, width:SIZES.width, height:50, justifyContent:'center',flexDirection:'row'}}>
                    <TouchableOpacity
                        style={{
                          width:50,
                          backgroundColor: COLORS.white,
                          alignItems:'center',
                          justifyContent:'center',
                          borderTopLeftRadius:25,
                          borderBottomLeftRadius:25,
                        }}>

                      <Text style={{...FONTS.body1}}>-</Text>
                    </TouchableOpacity>
                    <View style={{width:50,backgroundColor:COLORS.white,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{...FONTS.h2}}>5</Text>
                    </View>

                    <TouchableOpacity
                        style={{
                          width:50,
                          backgroundColor: COLORS.white,
                          alignItems:'center',
                          justifyContent:'center',
                          borderTopRightRadius:25,
                          borderBottomRightRadius:25,
                        }}>

                      <Text style={{...FONTS.body1}}>+</Text>
                    </TouchableOpacity>

                  </View>

                </View>

                {/* Name and the description */}

                <View style={{
                  width:SIZES.width,
                  alignItem:'center',
                  marginTop:15,
                  paddingHorizontal:SIZES.padding * 2
                }}>

                  <Text style={{
                    marginVertical:10, textAlign:'center',...FONTS.h3
                  }}>{item.name} - {item.price.toFixed(2)}</Text>

                  <Text style={{textAlign:'center', ...FONTS.body3}}>{item.description}

                  </Text>

                </View>

                {/* calories */}
                <View style={{ flexDirection:'row', marginTop:10}}>
                  <Image 
                      source={icons.calories}
                      style={{
                        width:30,
                        height:25,
                        marginRight:10
                      }} />
                  <Text style={{...FONTS.body3, color:COLORS.darkGray}}>{item.calories.toFixed(2)} cal</Text>


                </View>

              </View> 
            ))
          }

      </Animated.ScrollView>
    )
  }
  function renderDots(){
    const dotPosition = Animated.divide(scrollX, SIZES.width)
    return(
      <View style={{height:30}}>
        <View
          style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            height:SIZES.padding }}>


            {restaurant?.menu.map((item, index)=>{
              const opacity = dotPositem.interpolate({
                inputRange:[index - 1, index, index + 1],
                outputRange:[SIZES.base * 0.8, 10, SIZES.base *0.8],
                extrapolate:"clamp"
              })

              const dotSize = dotPositem.interpolate({
                inputRange:[index - 1, index, index + 1],
                outputRange:[0.3, 1, 0.3],
                extrapolate:"clamp"
              })

              const dotColor = dotPositem.interpolate({
                inputRange:[index - 1, index, index + 1],
                outputRange:[COLORS.darkGray, COLORS.primary, COLORS.darkGray2],
                extrapolate:"clamp"
              })
            })}
        </View>
      </View>

    )
  }
  function renderOrder(){
    return(
      <View>
        {
          renderDots()
        }
      </View>
    )
  }
  return (
    <SafeAreaView>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrder()}
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