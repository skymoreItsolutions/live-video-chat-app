import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { baseurl } from './baseurl'
import AntDesign from '@expo/vector-icons/AntDesign';
import {useNavigation} from "expo-router"

export default function FriendList() {
const navigation=useNavigation()


  const [request,setRequest]=useState()

  const fetchRequest=async()=>{

 
    const Token =await  AsyncStorage.getItem("auth_token")
  const respose= await axios.get(`${baseurl}/friend/allfriends/${Token}`)
  setRequest(respose.data?.getuser)
  
  }

useEffect(()=>{
  fetchRequest()

},[])



const handelMessagepage=(id)=>{
  navigation.navigate("(stack)",{screen:"message", params: { id }}) }

  return (
    <View>
      <FlatList
             data={request?.friends}
      renderItem={({item})=><List item={item}  handelMessagepage={handelMessagepage} />}
            />
    </View>
  )
}



const List=({item,handelMessagepage})=>{





return(
 <View style={{flexDirection:"row",alignItems:"center",marginVertical:10,paddingHorizontal:10,justifyContent:"space-between"}}>
    <View  style={{flexDirection:"row",alignItems:"center", gap:10}}>
    { item.gender=="male" &&<Image source={require("../assist/male.png")}  style={{height:50,width:50,backgroundColor:"gray",padding:5,borderRadius:40}}/> }
         { item.gender=="female" &&<Image source={require("../assist/female.png")}  style={{height:50,width:50,backgroundColor:"purple",padding:5,borderRadius:40}}/> }

<View>
     <Text style={{fontSize:19}}>{item.name}</Text>
     <Text style={{fontSize:16,color:"gray"}}>{item.user_name}</Text>

</View>
</View>
<View style={{flexDirection:"row",gap:10,alignItems:"center"}}> 
    <TouchableOpacity onPress={()=>handelMessagepage(item._id)}  activeOpacity={0.9}>
<AntDesign name="message1" size={24} color="black" />
</TouchableOpacity>

</View>

 </View>
)
}