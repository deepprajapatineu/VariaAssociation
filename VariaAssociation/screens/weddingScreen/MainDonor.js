import React,{useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,Image,TouchableOpacity,FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
   Avatar,
    List
} from 'react-native-paper';

import AppTouchacleOpacity from '../design/AppTouchacleOpacity';  

 
const MainDonor = ({route,navigation}) => {


 return (
      <View style={styles.container}>
        <Text>MainDonor</Text>
       
      </View>
    );
} 

export default MainDonor;

const styles = StyleSheet.create({

    });