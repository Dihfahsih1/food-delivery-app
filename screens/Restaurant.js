import React from 'react';
import {View,SafeAreaView,Image, TouchableOpacity, StyleSheet,FlatList, Text, Animated} from 'react-native';

import {COLORS, icons, images, SIZES,FONTS} from '../constants'
const Restaurant = ({route, navigation}) => {
  const scrollX = new Animated.Value(0)
  const[restaurant, setRestaurant] = React.useState(null);
  const[currentLocation, setcurrentLocation] = React.useState(null);
  const[orderItems, setOrderItems] = React.useState([]);

  React.useEffect(() =>{
    let{item, currentLocation} = route.params

    setRestaurant(item)
    setcurrentLocation(currentLocation)
  })

  function editOrder(action, menuId, price){
    let orderList = orderItems.slice()
    let item = orderList.filter(a =>a.menuId == menuId)
    if (action == "+"){
            
      if (item.length > 0){
        let newQty = item[0].qty + 1
        item[0].qty = newQty
        item[0].total = item[0].qty * price
    }else{
      const newItem ={
        menuId: menuId,
        qty:1,
        price: price,
        total: price
      }
      orderList.push(newItem)
    }
    setOrderItems(orderList)

    }else{
      if(item.length > 0){
        if (item[0]?.qty > 0){
          let newQty = item[0].qty -1
          item[0].qty=newQty
          item[0].total=newQty*price
        }
      }
      setOrderItems(orderList)
    }
  }

function getOrderQty(menuId){
  let orderItem = orderItems.filter(a => a.menuId == menuId)

  if(orderItem.length > 0){
    return orderItem[0].qty

  }
  return 0
}
function getBasketItemCount(){
  let itemCount = orderItems.reduce((a,b) => a + (b.qty || 0), 0)
  return itemCount
}

function sumOrder(){
 let total = orderItems.reduce((a,b) => a + (b.total || 0), 0)
 return total.toFixed(2)
}
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
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {nativeEvent:{contentOffset:{x: scrollX }}}
          ], {useNativeDriver: false})}
          >
          
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
                        }}
                      onPress={()=> editOrder("-", item.menuId, item.price)}
                      >

                      <Text style={{...FONTS.body1}}>-</Text>
                    </TouchableOpacity>

                    <View 
                        style={{width:50,backgroundColor:COLORS.white,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{...FONTS.h2}}>{getOrderQty(item.menuId)}</Text>
                    </View>

                    <TouchableOpacity
                        style={{
                          width:50,
                          backgroundColor: COLORS.white,
                          alignItems:'center',
                          justifyContent:'center',
                          borderTopRightRadius:25,
                          borderBottomRightRadius:25,
                        }}
                        onPress={() =>editOrder("+", item.menuId, item.price)}
                        >

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
    const dotPositem = Animated.divide(scrollX, SIZES.width)
    return(
      <View style={{height:30}}>
        <View
          style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            height:SIZES.padding }}>

            {/* work on scrolling products on details page */}
            {restaurant?.menu.map((item, index)=>{
              const opacity = dotPositem.interpolate({
                inputRange:[index - 1, index, index + 1],
                outputRange:[0.3, 1, 0.3 ],
                extrapolate:"clamp"
              })

              const dotSize = dotPositem.interpolate({
                inputRange:[index - 1, index, index + 1],
                outputRange:[SIZES.base * 0.8, 10, SIZES.base *0.8],
                extrapolate:"clamp"
              })

              const dotColor = dotPositem.interpolate({
                inputRange:[index - 1, index, index + 1],
                outputRange:[COLORS.darkGray, COLORS.primary, COLORS.darkGray2],
                extrapolate:"clamp"
              })
              return(
                <Animated.View
                    key={`dot-${index}`}
                    opacity = {opacity}
                    style={{
                      borderRadius: SIZES.radius,
                      marginHorizontal:6,
                      width:dotSize,
                      height:dotSize,
                      backgroundColor: dotColor
                    }} />
              )
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

        <View
            style={{
              backgroundColor:COLORS.white,
              borderTopLeftRadius:40,
              borderTopRightRadius:40
            }}>

          <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: SIZES.padding * 2,
                paddingHorizontal: SIZES.padding *3,
                borderBottomWidth: 1}}>

                <Text style={{...FONTS.h3}}>{getBasketItemCount()} Items in the cart </Text>
                <Text style={{...FONTS.h3}}> $ {sumOrder()}</Text>

          </View>

          <View style={{
            flexDirection:'row',
            justifyContent: 'space-between',
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding *3,

          }}>
            <View style={{
              flexDirection: 'row'}}>
                <Image 
                  source={icons.location}
                  resizeMode = 'contain'
                  style={{
                    width:20,
                    height:20,
                    tintColor:COLORS.darkGray
                  }} />
                  <Text style={{marginLeft:SIZES.padding, ...FONTS.h4}}>Location</Text>
            </View>

            <View style={{flexDirection:'row'}}>
              <Image 
                  source={icons.visa}
                  resizeMode="contain"
                  style={{
                    width:20,
                    height:20,
                    tintColor:COLORS.darkGray
                  }}/>

                  <Text style={{marginLeft:SIZES.padding, ...FONTS.h4}}>8888 </Text>

            </View>
              

          </View>
           {/* order button */}
           <View style={{ padding:SIZES.padding*2, alignment:'center', justifyConetnt:'center'}}>
             <TouchableOpacity
                style={{ width:SIZES.width * 0.9, padding:SIZES.padding, backgroundColor:COLORS.primary, alignItems:'center', borderRadius:SIZES.radius}}
                
                onPress={() => navigation.navigate("OrderDelivery", {
                  restaurant:restaurant,
                  currentLocation:currentLocation
                })}>
              <Text style={{color:COLORS.white, ...FONTS.h2}}>Order</Text>
             </TouchableOpacity>

           </View>
        </View>
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