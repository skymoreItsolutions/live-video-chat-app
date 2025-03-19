import { View, Text,Image, TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { baseurl } from './baseurl';
import axios from 'axios';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function SearchFriendCompo({item}) {
const [friend,setFriend]=useState("nofriend")
const [token,setToken]=useState()
const navigation= useNavigation()

  useEffect(()=>{
   
    const gettoken=async()=>{
  
      const Token =await  AsyncStorage.getItem("auth_token")
  
      const response= await axios.get(`${baseurl}/user/getuser/${Token}`)
     if(!response.data.success){
      navigation.navigate("(notauth)")
  
     }
     else{
      setToken(response.data.getuser)
      if(item.friendreq.includes(response.data.getuser._id)){
        setFriend("send")
      }
      if(
        item.friends.includes(response.data.getuser._id)
      ){
        setFriend("friend")
      }
     }
  
    }
    gettoken()
  },[])
const handelRequest=async(receiver)=>{
    setFriend("send")
    await axios.post(`${baseurl}/friend/request/send`,{receiver,sender:token._id})
}

const handelUnsend=async(receiver)=>{
    setFriend("send")
    await axios.post(`${baseurl}/friend/request/unsend`,{receiver,sender:token._id})
}


  return(
     <View style={{marginVertical:7,padding:5,paddingHorizontal:10,flexDirection:"row",alignItems:"center",padding:5,justifyContent:"space-between",backgroundColor: "white",
       shadowColor: "gray",shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4,  elevation: 5,}}>
         <View style={{flexDirection:"row",alignItems:"center",gap:5}}> 
      { item.gender=="male" &&<Image source={require("../assist/male.png")}  style={{height:50,width:50,backgroundColor:"gray",padding:5,borderRadius:40}}/> }
      { item.gender=="female" &&<Image source={require("../assist/female.png")}  style={{height:50,width:50,backgroundColor:"purple",padding:5,borderRadius:40}}/> }
 
       <Text style={{fontSize:19}}>{item.name}</Text>
 </View>
 {friend=="nofriend" &&
 <TouchableOpacity onPress={()=>handelRequest(item._id)}>
       <Ionicons name="person-add-sharp" size={24} color="black"  />
       </TouchableOpacity>
}

{friend=="send" &&
 <TouchableOpacity onPress={()=>handelUnsend(item._id)}>
   
       <Ionicons name="send-outline" size={24} color="blue"  />
       </TouchableOpacity>
}

{
    friend=="friend" &&
    <TouchableOpacity >
      
      <MaterialIcons name="handshake" size={24} color="black"  />
          </TouchableOpacity>

}



     </View>
   )
}