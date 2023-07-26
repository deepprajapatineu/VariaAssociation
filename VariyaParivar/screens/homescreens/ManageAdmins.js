import React,{useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,Image,TouchableOpacity,FlatList, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
   Avatar,
    List
} from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import AppTouchacleOpacity from '../design/AppTouchacleOpacity';  
import AppAlert from '../design/AppAlert';  
import AwesomeAlert from 'react-native-awesome-alerts';
 
const ManageAdmins = ({route,navigation}) => {


useEffect(() => {
    
AsyncStorage.getItem("role").then((value) => {
    if(value == "ROLE_SUPERADMIN"){
     Promise.all([ 
                  setData({
                    ...data,
                    // role:value,
                    showSuperAdmin:true,

                  })
                ])
    }

                 
});
  }, [])

const {adminVillage} = route.params;
const {adminTalukaName} = route.params;
const {adminDistrict} = route.params;

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

const [data, setData] = React.useState({
   titleMessage:'',
        innerMessage:'',
        alertShow:false,
        showCancelButton:true,
        showConfirmButton:false,
    village:"",
    name:"",
    username:"",
    role:"",
    dpuri:'https://i.pinimg.com/originals/29/47/9b/29479ba0435741580ca9f4a467be6207.png',
    mobileNumber:"",
    showSearch:true,
    showDetail:false,
    showSuperAdmin:false,
     temp:"hi"
    });
  const { colors } = useTheme();

  const theme = useTheme();


 const searchFilterFunction = (text) => {
    
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      //------------------------------------
        fetch(`http://192.168.225.234:8085/userbyname/${text}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
        // console.log("pic:-"+responseJson);

      })
      .catch((error) => {
        console.error(error);
      });
      //------------------------------------
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.firstName
          ? item.firstName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8', 
        }}
      />
    );
  };

 const ItemView = ({ item }) => {
    let dpUrl = {uri:`${item.profilePic}`}
    return (
      // Flat List Item
      <View style={{flexDirection:'row',marginTop: 5, paddingLeft:10}}>
                 <Avatar.Image
                              source={dpUrl}
                                size={35}
                            />
                            {/* <Image source={Image_Http_URL} style = {{height: 200, resizeMode : 'stretch', margin: 5 }} /> */}
      <Text style={styles.itemStyle} 
      onPress={() => getItem(item)}
      >
        {/* {item.id}
        {'.'} */}
        {item.firstName.toUpperCase()} (
        {item.village}, {item.talukaName}) ({item.username})
        
      </Text>

     
      </View>
    );
  };

  const getItem = (item) => {
  //  navigation.navigate("FamilyBook",{name:item.firstName, id:item.id, village:item.village, talukaName:item.talukaName})
  
   var url4 = `http://192.168.225.234:8085/getmyprofilepic/${item.username}`;
                       
    fetch(url4, {
           method: 'GET'
        })
     .then((response) => {
               return response.text();
        })
      .then((response4Json) => {
                                                                                        
        // console.log("info:-"+response4Json);
        // AsyncStorage.setItem('dpuri2',response4Json);
        setData({
    ...data,
    // showSearch:false,
    showDetail:true,
    dpuri:response4Json,
    name:item.firstName,
    username:item.username,
    role:item.role,
    village:item.village,
    mobileNumber:item.mobileNumber,
   

  });
                                                                                            
    }).catch((error) => {
                                                                                                            
           });
  // setData({
  //   ...data,
  //   // showSearch:false,
  //   showDetail:true,
  //   name:item.firstName,
  //   username:item.username,
  //   role:item.role,
  //   village:item.village,
  //   mobileNumber:item.mobileNumber,
   

  // });
  setFilteredDataSource([])

  };

const setAdmin = () => {
    setData({
    ...data,
  temp:"Admin"
   

  });
   fetch("http://192.168.225.234:8085/changerole", {
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                "username": data.username,                                                                
                                                                "role": "ROLE_ADMIN",
                                                        })
                                                        })
                                                        .then((response) => response.json())

                                                        .then( (responseJson)=>{
                                                           if(responseJson.message == "successful"){
                                                            setData({
                                                              ...data,
                                                                titleMessage:'Successful!',
                                                                innerMessage:'Your Data Submited',
                                                                alertShow:true,
                                                                showCancelButton:false,
                                                                showConfirmButton:true,
                                                            })
                                                          }else{
                                                             setData({
                                                              ...data,
                                                                titleMessage:'Failed!',
                                                                innerMessage:'something wrong. Please Try Again!!',
                                                                alertShow:true,
                                                                showCancelButton:false,
                                                                showConfirmButton:true,
                                                            })
                                                          }
                                                         
                                                        })
  }

const setUser = () => {
    
   fetch("http://192.168.225.234:8085/changerole", {
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                "username": data.username,                                                                
                                                                "role": "ROLE_USER",
                                                        })
                                                        })
                                                        .then((response) => response.json())

                                                        .then( (responseJson)=>{
                                                          if(responseJson.message == "successful"){
                                                            setData({
                                                              ...data,
                                                                titleMessage:'Successful!',
                                                                innerMessage:'Your Data Submited',
                                                                alertShow:true,
                                                                showCancelButton:false,
                                                                showConfirmButton:true,
                                                            })
                                                          }else{
                                                             setData({
                                                              ...data,
                                                                titleMessage:'Failed!',
                                                                innerMessage:'something wrong. Please Try Again!!',
                                                                alertShow:true,
                                                                showCancelButton:false,
                                                                showConfirmButton:true,
                                                            })
                                                          }
                                                        })
  }

  const setSuperAdmin = () => {
    
   fetch("http://192.168.225.234:8085/changerole", {
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                "username": data.username,                                                                
                                                                "role": "ROLE_SUPERADMIN",
                                                        })
                                                        })
                                                        .then((response) => response.json())

                                                        .then( (responseJson)=>{
                                                          if(responseJson.message == "successful"){
                                                            setData({
                                                              ...data,
                                                                titleMessage:'Successful!',
                                                                innerMessage:'Your Data Submited',
                                                                alertShow:true,
                                                                showCancelButton:false,
                                                                showConfirmButton:true,
                                                            })
                                                          }else{
                                                             setData({
                                                              ...data,
                                                                titleMessage:'Failed!',
                                                                innerMessage:'something wrong. Please Try Again!!',
                                                                alertShow:true,
                                                                showCancelButton:false,
                                                                showConfirmButton:true,
                                                            })
                                                          }
                                                        })
  }

    return (
      <View style={styles.container}>
       <StatusBar hidden />

     {data.showSearch ? (
          <View style={{width:"100%",marginBottom:10}}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          autoFocus = {true}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => setFilteredDataSource([])}
          placeholder="Search Person..."
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
        </View>
          ) : null}

          {data.showDetail ? (
            
          <View style={styles.subcontainer}>
          {/* <View style={styles.dp}> */}
           <Avatar.Image
            style={styles.dp}
              source={{uri: `${data.dpuri}`}}
              size={100}
        />
        {/* </View> */}
            {/* <Image
            style={styles.dp}
             source={{
          uri: `${data.dpuri}`,
        }}
        /> */}
{/* <ScrollView> */}
      <View style={styles.subContainer2}>
             <Text style={styles.text2}>Name</Text>
             <Text style={styles.text3}>{data.name}</Text>
          </View>
          <View style={styles.subContainer2}>
             <Text style={styles.text2}>Village</Text>
             <Text style={styles.text3}>{data.village}</Text>
          </View>
          <View style={styles.subContainer2}>
             <Text style={styles.text2}>Current Role</Text>
             <Text style={styles.text3}>{data.role.slice(5)}</Text>
          </View>
        <View style={{flexDirection:"row", marginVertical:10, position:"absolute", bottom:0}}>
         <AppTouchacleOpacity text="Give Admin" onPress={setAdmin} width={100} />
         <AppTouchacleOpacity text="Give User" onPress={setUser} width={100}/>
{data.showSuperAdmin ? (
         <AppTouchacleOpacity text="SuperAdmin" onPress={setSuperAdmin} width={105}/>

       ) : null}
          </View> 
          {/* </ScrollView> */}
 <AwesomeAlert
          show={data.alertShow}
          showProgress={false}
          title={data.titleMessage}
          message={data.innerMessage}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={data.showCancelButton}
          showConfirmButton={data.showConfirmButton}
          cancelText="Cancel"
          confirmText="Ok"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
          
            setData({
              ...data,
                alertShow: false
                });
          }}
          onConfirmPressed={() => {            
            navigation.goBack(),                                                        
            setData({
              ...data,
                alertShow: false
                });
          }}
        />
          </View>
         
          ) : null}
      </View>
    );
};

export default ManageAdmins;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    // paddingVertical:10
    // justifyContent: 'center'   
  },
    itemStyle: {
    padding: 10,
  },
  subcontainer:{
    width:"90%",
    height:325,
    borderWidth:2,
    alignItems:"center"
  },
  dp:{
    // width:50,
    // height:50,
    marginTop:10,
    backgroundColor:"red",
  },
  detail:{
    flexDirection:"row",

  },
  subContainer2:{
  //  backgroundColor:"red",
   width:320,
   justifyContent:"center",
   margin:10,
   borderBottomWidth:1,
   borderColor:"lightgray",
   flexDirection:"row",
   marginVertical:25
  },
  text2:{
    position:"absolute",
    left:0,
    bottom:0,
  fontSize:16, 
  fontWeight:"bold", 
  color:"black",
  letterSpacing: 2,
  marginVertical:5
  },
    text3:{
      position:"absolute",
    right:0,
    bottom:0,
  fontSize:16, 
  // fontWeight:"bold", 
  color:"black",
  letterSpacing: 2,
  marginVertical:5
  },
});
