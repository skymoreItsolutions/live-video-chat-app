import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { baseurl } from './baseurl'
import Entypo from '@expo/vector-icons/Entypo';

export default function RequestFriendList() {
const [request,setRequest]=useState()
    const fetchRequest=async()=>{


      const Token =await  AsyncStorage.getItem("auth_token")
    const respose= await axios.get(`${baseurl}/friend/allrequest/${Token}`)
    setRequest(respose.data?.getuser)
    
    }
      useEffect(()=>{
        fetchRequest()
      },[])




      const handelAccept=async(sender)=>{
        
const response= await axios.post(`${baseurl}/friend/request/accept`,{sender ,receiver:request._id})

console.log(response.data)
      }





  return (
    <View>
      <FlatList
       data={request?.friendreq}
renderItem={({item})=><List item={item} handelAccept={handelAccept} />}
      />
    </View>
  )
}


const List=({item,handelAccept})=>{





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
    <TouchableOpacity onPress={()=>handelAccept(item._id)} activeOpacity={0.9}>
<Entypo name="check" size={27} color="green" />
</TouchableOpacity>
<TouchableOpacity activeOpacity={0.9} >
<Entypo name="cross" size={32} color="#660900" />
</TouchableOpacity>
</View>

 </View>
)
}