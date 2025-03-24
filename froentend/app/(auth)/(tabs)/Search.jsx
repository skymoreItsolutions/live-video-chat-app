import { View, Text,SafeAreaView, TextInput, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import { baseurl } from '../../../components/baseurl'
import { useNavigation } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SearchFriendCompo from '../../../components/SearchFriendCompo'




export default function Search() {
const inputref= useRef(null)
const [token,setToken]=useState()
const [name,setname]=useState()
const navigation=useNavigation();
const [serachData,setSearchDate]=useState()
const [loader,setLoader]=useState(false)

useEffect(()=>{
  if(inputref.current){
  inputref.current.focus()
  }
  const gettoken=async()=>{

    const Token =await  AsyncStorage.getItem("auth_token")

    const response= await axios.get(`${baseurl}/user/getuser/${Token}`)
   if(!response.data.success){
    navigation.navigate("(notauth)")

   }
   else{
    setToken(Token)
   }

  }
  gettoken()
},[])

const fetchfriend=async()=>{
  setLoader(true)
  if(!name){
    return 
  }
  const res= await axios.post(`${baseurl}/friend/serchfriend`,{token,name})
  if(res.data.success){
    setSearchDate(res.data.serachfriend)
  }
  setLoader(false)
}


useEffect(()=>{
const inter=setTimeout(() => {
  fetchfriend()
}, 1000);
return ()=>clearTimeout(inter)
},[name])

  return (
    <SafeAreaView style={{flex:1,backgroundColor:""}}>
     <TextInput ref={inputref} value={name} onChangeText={(text)=>setname(text)} placeholder='Search Friend' style={{margin:10,borderWidth:1,padding:10,borderRadius:10,borderColor: "#ccc"}} />
   
{ !loader && serachData &&
<FlatList
data={serachData}
renderItem={({item})=><SearchFriendCompo item={item} /> }
/>

}



{loader && name && <ActivityIndicator size={50} color="red" />}


    </SafeAreaView>
  )
}