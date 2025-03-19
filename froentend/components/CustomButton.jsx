import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';

export default function CustomButton({ title, onPress, layoutstyle, textstyle }) {
  return (
    <Pressable 
      onPress={onPress} 
      style={[layoutstyle, { opacity: title === "loader" ? 0.7 : 1 }]} 
      // disabled={title === "loader"}
    >
      {title === "loader" ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text style={textstyle}>{title}</Text>
      )}
    </Pressable>
  );
}
