

import React, {useEffect} from 'react';
import { View, Text, Button, StyleSheet, ScrollView,TouchableOpacity,Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

 const DpOpen = ({ route,navigation}) => {

const { dpuri } = route.params;
     


       return (
      <View style={{flex:1,paddingVertical:40,backgroundColor:'black'}}>
        {/* <View> */}
        {/* <Text style={{color:"white"}}>Hiii:{dpuri}</Text> */}
           <Image
            source={{ uri: `${dpuri}` }}
        style={styles.stretch}
      />
      </View>
       );
 };


export default DpOpen;

const styles = StyleSheet.create({

   

   stretch: {
     
    width: "100%", 
    height: "100%",
    backgroundColor:"#333333",
  },

});


