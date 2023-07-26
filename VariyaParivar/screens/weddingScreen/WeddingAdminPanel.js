import React,{useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,Image,TouchableOpacity,FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
   Avatar,
    List
} from 'react-native-paper';

import AppTouchacleOpacity from '../design/AppTouchacleOpacity';  

 
const WeddingAdminPanel = ({route,navigation}) => {


 return (
      <View style={styles.container}>
        <Text>WeddingAdminPanel</Text>
       
      </View>
    );
} 

export default WeddingAdminPanel;

const styles = StyleSheet.create({

    });