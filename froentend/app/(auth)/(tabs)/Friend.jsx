import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import FriendList from '../../../components/FriendList';

import RequestFriendList from '../../../components/RequestFriendList';

export default function Friend() {
  const [req,setreq]=useState(false);
 



  return (
    <View  >
<View style={{ flexDirection: "row"}}>
 
  <TouchableOpacity activeOpacity={9}  onPress={()=>setreq(!req)} style={{flex: !req ? 2 : 1,
      backgroundColor: "#2d7814", height: 30,
      padding: 1,
      }} >
  <Text
    style={{
     
      color: "white",
      fontSize: 19,
     
      fontWeight: "bold",
      textAlign: "center",
   
    }}
  >
    Friends
  </Text>
  </TouchableOpacity>

  <TouchableOpacity activeOpacity={9} onPress={()=>setreq(!req)} style={{flex: req ? 2 : 1,
      backgroundColor: "#791c7a", height: 30,
      padding: 1,
      }}>
  <Text
    style={{
      
      fontWeight: "bold",
      color: "white",
      fontSize: 19,
      textAlign: "center"
     
    }}
  >
    Requests
  </Text>
  </TouchableOpacity>
</View>
    
    {!req && <FriendList />

    }
     {req && <RequestFriendList />

}




    </View>
  )
}