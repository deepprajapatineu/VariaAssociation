import React,{useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,Image,TouchableOpacity,FlatList, ScrollView,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
   Avatar,
    List
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import AppTouchacleOpacity from '../design/AppTouchacleOpacity';  
const width = Dimensions.get('window').width

 
const MainWeddingScreen = ({route,navigation}) => {
  
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

useEffect(() => {
  
  AsyncStorage.getItem("role").then((value) => {
    if(value == "ROLE_SUPERADMIN"){
     Promise.all([ 
               setShowAdminPanel(true)
                ])
    }
    });

   Promise.all([  
  fetch(`http://192.168.225.234:8085/getallyear`)
      .then((response) => response.json())
      .then((responseJson) => {

         responseJson.sort(function(obj1, obj2) {
      // Ascending: first id less than the previous
      return  obj2.weddingYear - obj1.weddingYear;
    });
    
        setFilteredDataSource(responseJson);
        // console.log(responseJson)

      })
      .catch((error) => {
        // console.error(error);
      })
    
             ]);

       
  }, [])


  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: 'white', 
        }}
      />
    );
  };

   const ItemView = ({ item }) => {
    let dpUrl = {uri:`${item.profilePic}`}
    return (
      <View style={styles.itemView}>   
       <TouchableOpacity 
      onPress={() => YearClick(item)}
       >
          <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.signIn}
                    
                >
      <View style={styles.btnContainerStyle}>
        <Text style={styles.btnTextStyle}  > {item.weddingYear} </Text>
      </View>
      </LinearGradient>

    </TouchableOpacity>
      </View>

      

    );
  };

const YearClick = (item) => {
  console.log("OK:-"+item.weddingYear)
  navigation.navigate('MainWeddingScreen2',{yearId:item.weddingId,year:item.weddingYear})
  // if (!(item.coupleDetails[0] == undefined)){
  //  navigation.navigate('MainWeddingScreen2',{coupleDetail:item.coupleDetails})
  // }else{
  // console.log("fffffff:-")

  // }
}

 return (
      <View style={styles.container}>
  {showAdminPanel ? (
         <AppTouchacleOpacity text="Open Admin Panel" onPress={() => navigation.navigate('WeddingAdminPanel')}  />
       ) : null}
     
         {/* <Text>MainWeddingScreen:{width}</Text> */}
      {/* <TouchableOpacity
                  style={styles.button}  
        onPress={() => navigation.navigate('MainWeddingScreen2')}                   
                >
                
                   <Text style={styles.buttonText}>FAMILY</Text>
       
                </TouchableOpacity> */}
                   <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />

     
      </View>
    );
} 

export default MainWeddingScreen;

const styles = StyleSheet.create({
  container:{
    // backgroundColor:"lightgray",
    flex:1,
    alignItems:"center"
  },
itemStyle: {
    // padding: 10,
  },
itemView:{
  flexDirection:'row',
  marginTop: 5, 
  // marginHorizontal:10,
  // paddingLeft:10,
    // backgroundColor:"lightgray",

},
 signIn: {
        // width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    margin:10

    },
     btnContainerStyle: {
    // backgroundColor: '#3F51B5',
    paddingVertical: 8,
    width: width / 1.1,
    borderRadius: 5,
  },
  btnTextStyle: {
    color: '#ffffff',
    fontSize: 14,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    fontWeight:"bold"
  },
    });