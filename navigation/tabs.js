
import {View,Image, TouchableOpacity} from 'react-native'

import {createBottomTabNavigator, BottomTabBar} from '@react-navigation/bottom-tabs'

import {Home} from '../screens'

import {Colors, Icons} from '../constants'

const Tab = createBottomTabNavigator

import React from 'react';

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon:({focused})=>(
          <Image 
            source={Icons.cutlery}
            resizeMode ='contain'
            style={{
              width:25,
              height:25,
              tintColor: focused? COLORS.primary: COLORS.secondary
            }}
          
          />
          )
        }}
      />
    </Tab.Navigator>
  )
};

export default Tabs;
