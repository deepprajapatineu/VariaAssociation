import React,{useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,Image,TouchableOpacity,FlatList, Dimensions } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
// import AppAlert from './AppAlert';  
const width = Dimensions.get('window').width
const AppTouchacleOpacity = ({ text, onPress, width, onPressText,fontSize }) => {



    return (
    
       <TouchableOpacity 
       onPress={onPress}>
          <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.signIn}
                    style={[styles.signIn, {
                width:width
            }]}
                >
      <View style={styles.btnContainerStyle}>
        <Text style={[styles.btnTextStyle, {
                fontSize:fontSize
            }]} onPress={onPressText} > {text} </Text>
      </View>
      </LinearGradient>

    </TouchableOpacity>
    );
};



export default AppTouchacleOpacity;

const styles = StyleSheet.create({
  // ...
   btnContainerStyle: {
    // backgroundColor: '#3F51B5',
    paddingVertical: 8,
    width: width / 1.3,
    borderRadius: 5,
  },
  btnTextStyle: {
    color: '#ffffff',
    fontSize: width/29.38775,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    fontWeight:"bold"
  },
  signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    margin:10

    },
});