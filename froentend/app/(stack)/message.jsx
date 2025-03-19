import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseurl } from '../../components/baseurl';
import {io} from "socket.io-client"



export default function index() {
  const flatListRef = useRef(null);
const socket = io("http://192.168.1.28:8000")
  const route= useRoute();
  const { id } = route.params 
const [messegeid,setMessageID]=useState()
const [senderid,setSenderId]=useState()
const [message,setMessage]=useState("")
const [messageSended,setMessagesende]=useState(true)
const [allmessae,setAllmessage]=useState('')
const [typing,setTyping]=useState(false)
const [isUserTyping, setIsUserTyping] = useState(false);


  const fetchRequest=async()=>{

 
    const Token =await  AsyncStorage.getItem("auth_token")
  const respose= await axios.get(`${baseurl}/friend/allfriends/${Token}`)
   const sender = await  respose.data?.getuser?._id
   setSenderId(sender)
const friendresponse= await axios.post(`${baseurl}/message/allmessage`,{sender,receiver:id})
  const MessageId= await friendresponse.data.messageroom._id
  
  setMessageID(MessageId)
  socket.emit("joinRoom", MessageId);
  const allmesg= await axios.get(`${baseurl}/message/allmessage/${MessageId}`)
  if(allmesg.data.success){
 setAllmessage(allmesg.data?.allmessae)
  }

  } 
  
useEffect(()=>{
  
  
  fetchRequest()
  if (flatListRef.current) {
    flatListRef.current.scrollToEnd({ animated: true });
  }
  socket.on("message", (msg) => {
    console.log(msg)
    if(msg.message){    setAllmessage((prevMessages) => [...prevMessages, msg]);
    }
  });


  socket.on("typing", (msg) => {
    if (!isUserTyping) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
    }, 3000);
  }

  });
  return () => {
    socket.off("message");
  };
},[])



// useEffect(()=>{
//   setIsUserTyping(true);
// socket.emit("tping",messegeid)
// setTimeout(() => {
//   // setIsUserTyping(false);
// }, 2000);
// },[message])

  
const handelsendmessage=async()=>{

  if(!message.trim){
    return 
  }

  if (message.trim()) {
    await axios.post(`${baseurl}/message/sendmessage`,{sender:senderid,message,friend:messegeid})

    socket.emit("sendMessage", {room:messegeid,sender:senderid,message });
    setMessage("");
setMessagesende(!messageSended)
   
  
  }

}

  return (
    <View style={{flex:1}}>
      <View style={{flex:1,backgroundColor:""}}>

<Text>
  { typing && "typing"}
</Text>

<FlatList
  ref={flatListRef}
data={allmessae}
renderItem={({item})=><MessagesList item={item} senderid={senderid}/>}


keyExtractor={(item, index) => index.toString()}
      onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
/>


      </View>
      <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:10,paddingVertical:3,borderTopWidth:1,borderTopRightRadius:3,borderTopLeftRadius:3}}>
        <TextInput value={message} placeholder='Message' style={{flex:1}} onChangeText={(text)=>setMessage(text)} />
        <TouchableOpacity activeOpacity={0.8} onPress={()=>handelsendmessage()} style={{backgroundColor:"blue",padding:9,borderRadius:30}}>
        <FontAwesome name="send" size={24} color="white" />

        </TouchableOpacity>
      </View>
    </View>
  )
}

const MessagesList=({item,senderid})=>{


  return(
    <View  style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: item.sender != senderid ? 'flex-start' : 'flex-end', 
      margin: 5, 
      marginHorizontal: 10 
    }}>
    
    <View style={{  backgroundColor: item.sender != senderid ? "#b5b5b5": 'lightgreen',padding:7,paddingHorizontal:13,borderRadius:10 }}>
      <Text style={{fontSize:17}}>{item?.message}</Text>
   
    </View>
    
  </View>

  )
}