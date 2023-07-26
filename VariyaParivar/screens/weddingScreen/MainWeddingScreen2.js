import React,{useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,Image,TouchableOpacity,FlatList, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
   Avatar,
    List
} from 'react-native-paper';

import AppTouchacleOpacity from '../design/AppTouchacleOpacity';  
const width = Dimensions.get('window').width
 
const MainWeddingScreen2 = ({route,navigation}) => {

  useEffect(() => {
  
   Promise.all([  
  fetch(`http://192.168.225.234:8085/getyear/${yearId}`)
      .then((response) => response.json())
      .then((responseJson) => {           
        setCoupleDetail(responseJson.coupleDetails);
        console.log(responseJson.coupleDetails[0].groom);
      })
      .catch((error) => {
        // console.error(error);
      })
    
             ]);

       
  }, [])

const {yearId} = route.params;
const {year} = route.params;
  const [coupleDetail, setCoupleDetail] = useState([]);

 return (
      <View style={styles.container}>
        {/* <Text>MainWeddingScreen2222:{width}</Text> */}
         <AppTouchacleOpacity text="Couple"  width={width/1.2} fontSize={width/29.38775} onPress={() =>   navigation.navigate('CoupleList',{yearId:yearId, year:year})}/>
         <AppTouchacleOpacity text="Donor"  width={width/1.2} fontSize={width/29.38775} onPress={() =>   navigation.navigate('MainDonor',{yearId:yearId, year:year})} />
         <AppTouchacleOpacity text="Gallary"  width={width/1.2} fontSize={width/29.38775}/>
       
      </View>
    );
} 

export default MainWeddingScreen2;

const styles = StyleSheet.create({
container:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
}
    });