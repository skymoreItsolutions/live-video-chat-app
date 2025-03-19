import { View, Text, StyleSheet, Image, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { Link, useNavigation } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import axios from "axios";
import { baseurl } from "../../components/baseurl";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [signupData, setSignupData] = useState({
    email: "",
    name: "",
    password: "",
    user_name: "",
    gender:"male"
  });

  const navigation = useNavigation();

  const handleLogin = async () => {
    setButtonLoader(true);
    
    if (!signupData.email || !signupData.name || signupData.password.length < 5 || !signupData.user_name) {
      Alert.alert("Error", "Enter all required data");
      setButtonLoader(false); // Ensure loader stops
      return;
    }

    let response = await axios.post(`${baseurl}/user/sendotp`, {email:signupData.email});

    if(response.data.success){
      navigation.navigate("Verifyotp",{...signupData})
    }
    else{
      Alert.alert(response.data.message)
    }
    // setTimeout(() => {
        setButtonLoader(false);

    // }, 2000);
    
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
        <Image source={require("../../assist/logo.jpg")} style={styles.logo} />
      </View>

      <View style={{ flex: 1, backgroundColor: "#BDDAFC", position: "relative" }}>
        <View style={styles.absoluteLogin}>
          <Text style={{ fontSize: 40, fontWeight: "800" }}>SignUp</Text>
        </View>

        <ScrollView>
          <View style={styles.formContainer}>
            {/* Name Input */}
            <View>
              <Text style={styles.label}>Name:<Text style={{ color: "red" }}> *</Text></Text>
              <TextInput
                autoCorrect={false}
                placeholder="Enter Full Name"
                style={styles.input}
                value={signupData.name}
                onChangeText={(text) => setSignupData({ ...signupData, name: text })}
              />
            </View>

            {/* Username Input */}
            <View>
              <Text style={styles.label}>UserName:<Text style={{ color: "red" }}> *</Text></Text>
              <TextInput
                autoCorrect={false}
                placeholder="Enter User Name"
                style={styles.input}
                value={signupData.user_name}
                onChangeText={(text) => setSignupData({ ...signupData, user_name: text })}
              />
            </View>

            {/* Email Input */}
            <View>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Enter Your Email"
                style={styles.input}
                value={signupData.email}
                onChangeText={(text) => setSignupData({ ...signupData, email: text })}
              />
            </View>

            {/* Password Input */}
            <View style={{ position: "relative" }}>
              <Text style={styles.label}>Password:</Text>
              <TextInput
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Enter Your Password"
                style={styles.input}
                value={signupData.password}
                onChangeText={(text) => setSignupData({ ...signupData, password: text })}
              />
              <Entypo
                onPress={() => setShowPassword(!showPassword)}
                name={showPassword ? "eye" : "eye-with-line"}
                size={24}
                color="black"
                style={styles.eyeIcon}
              />
            </View>

            {/* Forgot Password Link */}
            <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
              <Text style={{fontSize:18}}>Gender</Text>
              <TouchableOpacity activeOpacity={0.9} onPress={()=>setSignupData({ ...signupData, gender:"male" })} style={{flexDirection:"row",alignItems:"center",gap:5}}> 
                <View style={{width:20 ,height:20,borderWidth:1,borderRadius:40,justifyContent:"center",alignItems:"center"}}>
             {signupData.gender=="male" &&     <View style={{width:15 ,height:15,borderRadius:40,backgroundColor:"#41d69b"}} ></View>}
                </View>
                <Text style={{fontSize:18}}>Male</Text>
              </TouchableOpacity>



              <TouchableOpacity activeOpacity={0.9}  onPress={()=>setSignupData({ ...signupData, gender:"female" })} style={{flexDirection:"row",alignItems:"center",gap:5}}> 
                <View style={{width:20 ,height:20,borderWidth:1,borderRadius:40,justifyContent:"center",alignItems:"center"}}>
             {signupData.gender=="female" &&     <View style={{width:15 ,height:15,borderRadius:40,backgroundColor:"#41d69b"}} ></View>}
                </View>
                <Text style={{fontSize:18}}>Female</Text>
              </TouchableOpacity>
            </View>

            {/* Buttons */}
            <View style={{ flexDirection: "column", gap: 7 }}>
              <CustomButton
                title={buttonLoader ? "Loading..." : "Signup"}
                onPress={handleLogin}
                textstyle={styles.buttonText}
                layoutstyle={[styles.button, { backgroundColor: "blue" }]}
              />
              <Text style={{ textAlign: "center" }}>OR</Text>
              <CustomButton
                title="Login"
                onPress={() => navigation.navigate("index")} 
                textstyle={styles.buttonText}
                layoutstyle={[styles.button, { backgroundColor: "green" }]}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    width: 200,
    height: 200,
  },
  absoluteLogin: {
    position: "absolute",
    top: "-40%",
    backgroundColor: "#BDDAFC",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
    borderTopLeftRadius: 9000,
    borderTopRightRadius: 0, 
  },
  formContainer: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 40,
    flexDirection: "column",
    gap: 30,
  },
  label: {
    fontWeight: "600",
  },
  input: {
    borderBottomWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    position: "absolute",
    right: 14,
    bottom: 9,
  },
  buttonText: {
    color: "white",
    fontSize: 19,
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
});
