import React,{useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,Image,TouchableOpacity,FlatList,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
   Avatar,
    List
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import AppTouchacleOpacity from '../design/AppTouchacleOpacity';  
const width = Dimensions.get('window').width

 
const CoupleList = ({route,navigation}) => {
  useEffect(() => {
  
   Promise.all([  
  fetch(`http://192.168.225.234:8085/getyear/${year}`)
      .then((response) => response.json())
      .then((responseJson) => {           
        console.log("OK:-"+responseJson.coupleDetails)
        setCoupleDetail(responseJson.coupleDetails);
      })
      .catch((error) => {
        // console.error(error);
      })
    
             ]);

       
  }, [])

const {yearId} = route.params;
const {year} = route.params;
  const [coupleDetail, setCoupleDetail] = useState([]);

const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: 'lightgray', 
        }}
      />
    );
  };
  const ItemView = ({ item }) => {
    // let dpUrl = {uri:`${item.profilePic}`}
    return (
      <View style={styles.itemView}>   
      
    <TouchableOpacity 
      // onPress={() => YearClick(item)}
       >
          <LinearGradient
                    colors={['#fff', '#fff']}
                    style={styles.signIn}
                    
                >
      <View style={styles.btnContainerStyle}>
      <View style={styles.subbtnContainerStyle}>
       <Avatar.Image
              source={{uri: `${item.groomPic}`}}
              size={width/11.7551}
        />
        <Text style={styles.btnTextStyle}  > {item.groom} </Text>
        <Text style={styles.btnTextStyle2}  > {item.groomVillage} </Text> 
        </View>
        
      <View style={styles.subbtnContainerStyle}>
      <Avatar.Image
              source={{uri: `${item.bridePic}`}}
              size={width/11.7551}
        />
        <Text style={styles.btnTextStyle}  > {item.bride} </Text>
        <Text style={styles.btnTextStyle2}  > {item.brideVillage} </Text> 

      </View>
      

  
      </View>
      </LinearGradient>

    </TouchableOpacity>

      </View>

      

    );
  };
 return (
      <View style={styles.container}>
        {/* <Text>CoupleList:{width}</Text> */}
                 <FlatList
          data={coupleDetail}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
} 

export default CoupleList;

const styles = StyleSheet.create({

   container:{
    flex:1,
    alignItems:"center",
    backgroundColor:"lightgray",
    padding:5
  },
itemView:{
  flexDirection:'row',
  marginTop: 5, 
},
 signIn: {
        width: width,
        // height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 10,
    marginVertical:5

    },
     btnContainerStyle: {
    // backgroundColor: '#3F51B5',
    paddingVertical: 8,
    width: width / 1.1,
    borderRadius: 5,
  },
  btnTextStyle: {
    color: '#000',
    fontSize: width/37,
    textTransform: 'uppercase',
    textAlign: 'left',
    fontFamily: 'Quicksand-Medium',
    fontWeight:"bold",
    marginHorizontal:10
  },
   btnTextStyle2: {
    color: '#000',
    fontSize: width/37,
    textTransform: 'uppercase',
    textAlign: 'right',
    fontFamily: 'Quicksand-Medium',
     position:"absolute",
     right:0
  },
  subbtnContainerStyle:{
    // borderBottomWidth:0.5,
    // padding:5,
    marginVertical:5,
    flexDirection:"row",
    alignItems:"center",
    
  },
    
    });