import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { Link, useNavigation } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseurl } from '../../components/baseurl';



export default function index() {

  const [showPassword,SetShowPassword]=useState(false)
 
const [userData,setUserData]=useState({
  email:"",
  password:""
})
const navigation =useNavigation()

  const handelLoging =async()=>{
    if(!userData.email || userData.password.length <5){
      return
    }
  
const response = await axios.post(`${baseurl}/user/login`,{...userData})
if(response.data.success){

await AsyncStorage.setItem("auth_token",response.data.Token)
         navigation.navigate("(auth)/(tabs)")
  
}
  }

  return (
    <View style={styles.container}>
     <View style={{flex:1,alignItems:"center",paddingTop:20}}>
    <Image source={require("../../assist/logo.jpg")} width={20} height={20}  style={styles.logo} />
   
   


     </View>

     <View style={{flex:1,backgroundColor:"#BDDAFC",position:"relative"}}>
      <View style={styles.absoluteLogin}>
        <Text style={{fontSize:40,fontWeight:800}}>Login</Text>
      </View>
     


<View style={{flex:1,padding:10, paddingHorizontal:40,flexDirection:"column", gap:30  }}>
<View >
<Text style={{fontWeight:600}}>Email:</Text>
<TextInput keyboardType='email-address' autoCapitalize="none" autoCorrect={false}  placeholder='Enter Your Email'
 style={{borderBottomWidth:2,borderRadius:10, paddingHorizontal:10}} value={userData.email} onChangeText={(text)=>setUserData({...userData,email:text})}  />
</View>


<View style={{position:"relative"}}>
<Text style={{fontWeight:600}}>Password:</Text>
<TextInput secureTextEntry={!showPassword} autoCapitalize="none" autoCorrect={false}  placeholder='Enter Your Password'
 style={{borderBottomWidth:2,borderRadius:10, paddingHorizontal:10}} value={userData.password} onChangeText={(text)=>setUserData({...userData,password:text})}  />


<Entypo onPress={()=>SetShowPassword(!showPassword)} name={showPassword?"eye":"eye-with-line"} size={24} color="black" style={{position:"absolute",right:14,bottom:9}} />

</View>

<View>
  <Link style={{color:"blue"}} href={"./forgot"}>Forgot Password?</Link>
</View>

<View style={{flexDirection:"column", gap:7}}> 
<CustomButton  title={"login"} onPress={()=>handelLoging()} textstyle={{color:"white",fontSize:19,}} layoutstyle={{backgroundColor:"blue",alignItems:"center",padding:10,borderRadius:10}} />
<Text style={{textAlign:"center"}}>OR</Text>
<CustomButton  title={"signup"} onPress={()=>{navigation.navigate("Signup")}} textstyle={{color:"white",fontSize:19}} layoutstyle={{backgroundColor:"green",alignItems:"center",padding:10,borderRadius:10}} />
</View>
</View>
       
     </View>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{flex:1,
  
    backgroundColor:"white"
  },
  logo:{
    width:200,
    height:200
  },
  absoluteLogin:{
position:"absolute",
top:"-40%",
backgroundColor:"#BDDAFC",
width:"100%",
justifyContent:"center",
alignItems:"center",
height:"40%",
borderTopRightRadius:"",
borderTopLeftRadius:1000,

  }
})