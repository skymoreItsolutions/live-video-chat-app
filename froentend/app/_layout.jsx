import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Redirect, Stack} from "expo-router"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseurl } from '../components/baseurl';


export default function _layout() {
    const [authanticate,setAuth]=useState(false);



useEffect(()=>{
  const handelasync=async()=>{
const user= await AsyncStorage.getItem("auth_token")
console.log(user)
  if(user){


  

 setAuth(true)
  }}
  handelasync()
},[])
  return (
    <>
    <Stack screenOptions={{headerShown:false}}>
<Stack.Screen name='(auth)' />
<Stack.Screen name='(notauth)' />
    </Stack>

    {authanticate?<Redirect href={"/(auth)"} />:<Redirect href={"/(notauth)"} />}
    </>
  )
}