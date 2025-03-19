import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from 'axios'
import { useNavigation } from 'expo-router'
import { baseurl } from '../../../components/baseurl'
import CustomButton from '../../../components/CustomButton'

export default function index() {
const [userToken,setUserToken]=useState("okk")
const navigation=useNavigation()
  useEffect(()=>{
    const gettoken=async()=>{

      const Token =await  AsyncStorage.getItem("auth_token")

      const response= await axios.get(`${baseurl}/user/getuser/${Token}`)
     if(!response.data.success){
      navigation.navigate("(notauth)")
     }

    }
    gettoken() 
  },[])


  const handelLogout=async()=>{
AsyncStorage.removeItem("auth_token")

navigation.navigate("(notauth)")
  }


  return (
    <View>
      <Text>{userToken}</Text>
      <CustomButton title={"logout"} onPress={()=>handelLogout()} />
    </View>
  )
}