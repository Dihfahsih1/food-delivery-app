import React from 'react';
import {View,Image, TouchableOpacity} from 'react-native'

import {createBottomTabNavigator, BottomTabBar} from '@react-navigation/bottom-tabs'

import {Home} from '../screens'

import {COLORS, icons} from '../constants'

// set the tab
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator 
    tabBarOptions={{
      showLabel:false,
      style:{
        borderTopWidth:0,
        backgroundColor: "transparent",
        elevation:0
      }
    }}
    >
      
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon:({focused})=>(
          <Image 
            source={icons.coupon}
            resizeMode = "contain"
            style={{
              width:25,
              height:25,
              tintColor: focused ? COLORS.primary : COLORS.secondary
            }}
          
          />
          ),
            tabBarButton:(props) =>(
              <TabBarCustomButton
              {...props}
              />
            )
        }}
      />

      <Tab.Screen
        name="search"
        component={Home}
        options={{
          tabBarIcon:({focused})=>(
          <Image 
            source={icons.search}
            resizeMode = "contain"
            style={{
              width:25,
              height:25,
              tintColor: focused ? COLORS.primary : COLORS.secondary
            }}
          
          />
          ),
          tabBarButton:(props) =>(
            <TabBarCustomButton
            {...props}
            />
          )
        }}
      />

      <Tab.Screen
        name="Like"
        component={Home}
        options={{
          tabBarIcon:({focused})=>(
          <Image 
            source={icons.check_circle}
            resizeMode = "contain"
            style={{
              width:25,
              height:25,
              tintColor: focused ? COLORS.primary : COLORS.secondary
            }}
          
          />
          ),
          tabBarButton:(props) =>(
            <TabBarCustomButton
            {...props}
            />
          )
        }}
      />

      <Tab.Screen
          name="User"
              component={Home}
              options={{
                tabBarIcon:({focused})=>(
                <Image 
                  source={icons.user}
                  resizeMode = "contain"
                  style={{
                    width:25,
                    height:25,
                    tintColor: focused ? COLORS.primary : COLORS.secondary
                  }}
                
                />
                ),
                tabBarButton:(props) =>(
                  <TabBarCustomButton
                  {...props}
                  />
                )
              }}
            />
    </Tab.Navigator>
  )
}

export default Tabs;
