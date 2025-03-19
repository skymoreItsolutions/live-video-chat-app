
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';






export default function _layout() {
  
  return (
   <Tabs screenOptions={{headerShown:false}}>
    <Tabs.Screen  name='index'  options={{
          title: 'Call',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Entypo 
                name="video-camera" 
                size={focused ? size + 4 : size} 
                color={focused ? "blue" : "gray"} 
              />
            );
          }
        }}  />


<Tabs.Screen  name='Search'  options={{
          title: 'Search',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <AntDesign 
                name="search1" 
                size={focused ? size + 4 : size} 
                color={focused ? "blue" : "gray"} 
              />
            );
          }
        }}  />



<Tabs.Screen  name='Friend'  options={{
          title: 'Friend',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <FontAwesome5 
                name="user-friends" 
                size={focused ? size + 4 : size} 
                color={focused ? "blue" : "gray"} 
              />
            );
          }
        }}  />



<Tabs.Screen  name='Profile'  options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <FontAwesome5 
                name="user-secret" 
                size={focused ? size + 4 : size} 
                color={focused ? "blue" : "gray"} 
              />
            );
          }
        }}  />









   </Tabs>
  )
}