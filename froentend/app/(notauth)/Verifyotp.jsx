import { View, Text, StyleSheet, Image, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import { baseurl } from '../../components/baseurl';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from 'expo-router';

export default function Verifyotp() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, name, password, user_name, gender } = route.params;
  const [buttonLoader, setButtonLoader] = useState(false);
  const [countdown, setCountdown] = useState(55);
  const [otpval, setOtpval] = useState('');
  const inputRefs = useRef([]);

  const focusInput = (index) => {
    if (index >= 0 && index < inputRefs.current.length) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleChange = (val, index) => {
    if (!/^\d?$/.test(val)) return; // Only allow digits
    let newOtpValue = otpval.split('');
    newOtpValue[index] = val;
    setOtpval(newOtpValue.join(''));
    if (val && index < 3) {
      focusInput(index + 1);
    } else if (!val && index > 0) {
      focusInput(index - 1);
    }
  };

  const handelVerify = async () => {
    if (otpval.length <= 3) return;
    setButtonLoader(true);
    const newdate = { email, name, password, user_name, otpval, gender };
    const response = await axios.post(`${baseurl}/user/signup`, newdate);
    if (response.data.success) {
      await AsyncStorage.setItem("auth_token", response.data.token);
      navigation.navigate("(auth)");
    }
    setButtonLoader(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior based on platform
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Fine-tune offset if needed
    >
      <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
        <Image source={require("../../assist/logo.jpg")} style={styles.logo} />
      </View>

      <View style={{ flex: 1, backgroundColor: "#BDDAFC", position: "relative" }}>
        <View style={styles.absoluteLogin}>
          <Text style={{ fontSize: 40, fontWeight: "800" }}>Verify Otp</Text>
        </View>
        <View style={{ paddingHorizontal: 40, gap: 14 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            {[...Array(4)].map((_, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                ref={(ref) => (inputRefs.current[index] = ref)}
                onChangeText={(val) => handleChange(val, index)}
                value={otpval[index] || ""}
              />
            ))}
          </View>
          <Text style={{ textAlign: "right", margin: 15 }}>
            Resend Otp in {countdown} second
          </Text>
          <CustomButton
            title={buttonLoader ? "Loading..." : "Verify"}
            onPress={() => handelVerify()}
            layoutstyle={{ backgroundColor: "green", padding: 10, borderRadius: 15 }}
            textstyle={{ color: "white", fontSize: 19, textAlign: "center" }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
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
});