
import React, { useState, useEffect, useRef } from 'react';
import {
       Avatar,
       RadioButton,
       useTheme,
} from 'react-native-paper'
// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, Image, Picker, Button, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-community/async-storage';
import PhoneInput from "react-native-phone-input";
import ImagePicker from 'react-native-image-crop-picker'; 
const village = require('./village.json');



const AddFamily = ({navigation,route}) => {
const phoneRef = useRef(undefined);
    const { colors } = useTheme();

    const [image, setImage] = useState(null);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

    const [search1, setSearch1] = useState('');
  const [filteredDataSource1, setFilteredDataSource1] = useState(village);
  const [masterDataSource1, setMasterDataSource1] = useState(village);

    const [search4, setSearch4] = useState('');
  const [filteredDataSource4, setFilteredDataSource4] = useState([]);
  const [masterDataSource4, setMasterDataSource4] = useState([]);

// const {adminVillage} = route.params;
  const [adminVillage, setAdminVillage] = useState('');
  const [adminTalukaName, setAdminTalukaName] = useState('');
  const [adminDistrict, setAdminDistrict] = useState('');
const [data, setData] = React.useState({
    
    checked:"",
    checked1:"",
    checked2:"",
    relation:'',
    showSearch:false,
    showButtons:true,
    showVillage:false,
    showFirstPerson:false,
    showChildPerson:false,
    showMale:false,
    showFemale:false,
    showFemaleSingle:false,
    ShowFemaleMarried:false,
    showVillageList:false,
    showUsername:false,
    showFatherList:false,    
    alertShow:false,
    showCancelButton:false,
    showConfirmButton:false,
    titleMessage:'Login Failed',
    innerMessage:'Please Enter Valid Information!!!',
    showVillageSuperAdmin:false,

    name:"",
    haveAccount:false,
    username:"",
    village:adminVillage,
    talukaName: "",
    district:"",
    profilePic: "",
    gender: "",
    mobileNumber: "",
    parentId:"",
    partnerId:"",
    wifeName:"",
    fatherName:"Search Father Name...",
    mobileValid: '',
    mobileType: '',
    mobileNumber: '',
    tempId:null,
    });

useEffect(() => {
   Promise.all([  
   AsyncStorage.multiGet(["userName", "mobileNumber", "dpuri", "firstName", "middleName", "lastName", "mobileNumber","temptoken","role","villageName","talukaName","district"]).then(response => {

                                        setAdminVillage(response[9][1])
                                        setAdminTalukaName(response[10][1])
                                        setAdminDistrict(response[11][1])
                        if( response[8][1] == "ROLE_SUPERADMIN"){
                                                Promise.all([ 
                                                              setData({
                                                                ...data,
                                                                showVillageSuperAdmin:true,
                                                                token:response[7][1],
                                                                role:response[8][1],
                                                                village:response[9][1],  
                                                                talukaName:response[10][1],
                                                                district:response[11][1],
                                                                
                                                              })
                                                               
                                                            ])
                                                }else{
                                                  Promise.all([ 
                                                              setData({
                                                                ...data,
                                                                showVillageSuperAdmin:false,
                                                                token:response[7][1],
                                                                role:response[8][1],
                                                                village:response[9][1],  
                                                                talukaName:response[10][1],
                                                                district:response[11][1]
                                                              })
                                                            ])
                                                }
                                                
                    })
             ]);
  }, [])
  
  const searchFilterFunction = (text) => {
    
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      //------------------------------------
        if(data.role == 'ROLE_SUPERADMIN'){
        var url = `http://192.168.225.234:8085/familypersondetailbyname/${text}`
        }else{
        var url = `http://192.168.225.234:8085/personalfamily3/${text}/${adminVillage}/${adminTalukaName}/${adminDistrict}`
        }
        fetch(url)
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
        const itemData = item.name
          ? item.name.toUpperCase()
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

    const searchFilterFunction2 = (text) => {
    
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      //------------------------------------
        fetch(`http://192.168.225.234:8085/findvillage/${text}`)
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
        const itemData = item.name
          ? item.name.toUpperCase()
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


let Image_Http_URL ={ uri: 'https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png'};

  const ItemView = ({ item }) => {
    let dpUrl = {uri:`${item.profilePic}`}
    return (
      // Flat List Item
      <View style={{flexDirection:'row',marginTop: 5}}>
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
        {item.name.toUpperCase()} (
        {item.village}, {item.talukaName})
        
      </Text>
      </View>
    );
  };

  const ItemView2 = ({ item }) => {
    return (
      // Flat List Item
      <View style={{flexDirection:'row',marginTop: 5}}>
        <Text style={styles.itemStyle} 
          onPress={() => getItem2(item)}
        >
        {/* {item.id}
        {'.'} */}
        {item.village} ({item.talukaName}, {item.district} )
      </Text>
      </View>
    );
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

  const getItem = (item) => {
    // Function for click on an item
  
    navigation.navigate("FamilyPresonDetail",{name:item.name, id:item.id, village:item.village, wifeName:item.wifeName, mobileNumber:item.mobileNumber, gender:item.gender, partner:item.partner})
 

  };

  const getItem2 = (item) => {
    navigation.navigate("FamilyBook2",{name:item.name, id:item.id, village:item.village, talukaName:item.talukaName})
  };

  const HandleSearchPerson = () => {
            setData({
                     ...data,
                      showButtons:false,
                      showSearch:true,
                    
                  });
  };

   const HandleSearchVillage = () => {
           setData({
                     ...data,
                      showButtons:false,
                      showVillage:true,
                    
                  });
  };

 const ItemView3 = ({ item }) => {
  //  console("Result:-"+item.properties.SUB_DISTRICT)
    return (
      // Flat List Item
      <View style={{flexDirection:'row',marginTop: 5}}>
        <Text style={styles.itemStyle} 
          onPress={() => getItem3(item)}
        >
        {/* {item.id}
        {'.'} */}
        {item.properties.NAME} ({item.properties.SUB_DISTRICT}) ({item.properties.DISTRICT})
      </Text>
      </View>
    );
  };

const getItem3 = (item) => {
    setData({
                     ...data,
                      village:item.properties.NAME,
                      talukaName:item.properties.SUB_DISTRICT,
                      district:item.properties.DISTRICT,
                      showVillageList:false,
                    
                  });
  };

    const searchFilterFunction3 = (text) => {
    
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      
      const newData = masterDataSource1.filter(function (item) {
        const itemData = item.properties.NAME
          ? item.properties.NAME.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource1(newData);
      setSearch1(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource1(masterDataSource1);
      setSearch1(text);
    }
  };


//-------------------------------This is Start of Enter Father Detail------------------------------
const searchFilterFunction4 = (text) => {
    
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      //------------------------------------
        if(data.role == 'ROLE_SUPERADMIN'){
        var url2 = `http://192.168.225.234:8085/familypersondetailbyname/${text}`
        }else{
        var url2 = `http://192.168.225.234:8085/personalfamily3/${text}/${adminVillage}/${adminTalukaName}/${adminDistrict}`
        }
        fetch(url2)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource4(responseJson);
        setMasterDataSource4(responseJson);
        // console.log("pic:-"+responseJson);

      })
      .catch((error) => {
        console.error(error);
      });
      //------------------------------------
      const newData = masterDataSource4.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource4(newData);
      setSearch4(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource4(masterDataSource4);
      setSearch4(text);
    }
  };

    const ItemView4 = ({ item }) => {
    let dpUrl = {uri:`${item.profilePic}`}
    return (
      // Flat List Item
      <View style={{flexDirection:'row',marginTop: 5}}>
                 <Avatar.Image
                              source={dpUrl}
                                size={35}
                            />
                            {/* <Image source={Image_Http_URL} style = {{height: 200, resizeMode : 'stretch', margin: 5 }} /> */}
      <Text style={styles.itemStyle} 
      onPress={() => getItem4(item)}
      >
        {/* {item.id}
        {'.'} */}
        {item.name.toUpperCase()} (
        {item.village}, {item.talukaName})
        
      </Text>
      </View>
    );
  };


const getItem4 = (item) => {
    setData({
                     ...data,
                      parentId:item.id,
                      fatherName:item.name,
                       showFatherList:false                 
                      
                    
                  });
                  setFilteredDataSource4([]);
  };
//-------------------------------This is end of Enter Father Detail------------------------------

const worning = () => {
          setData({
                       ...data,
                      alertShow:true,
                      showCancelButton:true,
                      titleMessage:'Check!!',
                      innerMessage:'Name: '+data.name+'\nVillage: '+data.village+'\nTalukaName: '+data.talukaName+'\nDistrict: '+data.district+'\ngender: '+data.gender+'\nFather: '+data.fatherName+'\nMobile: '+data.mobileNumber
                       });
}

const submitMaleDetail = (name, village, talukaName, district, username, gender, parentId,mobileNumber, mobileType,mobileValid,image) => {
  console.log(mobileNumber+"::"+mobileType+"::"+mobileValid)
var e = undefined;
var f = '';

    if (mobileValid == false ||data.name == e ||  data.village == e || data.talukaName == e || data.district == e ||  data.gender == e || data.parentId == e || data.name == f ||  data.village == f || data.talukaName == f || data.district == f ||  data.gender == f || data.parentId == f ) {
      
              setData({
                       ...data,
                      alertShow:true,
                      showCancelButton:true,
                      titleMessage:'Failed!!!',
                      innerMessage:'Please Enter All Field!!!'
                       });

    }else{


    fetch("http://192.168.225.234:8085/family", {
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                    "id": "",
                                                                    "name": name,
                                                                    "village": village,
                                                                    "wifeName": null,
                                                                    "talukaName": talukaName,
                                                                    "district":district,
                                                                    "username": username,
                                                                    "gender": gender,
                                                                    "mobileNumber": mobileNumber,
                                                                    "profilePic": null,
                                                                    "parent" : {
                                                                    "id" : parentId
                                                                }  
                                                        })
                                                        })
                                                        .then((response) => response.json())

                                                        .then( (data)=>{
                                                          console.log("Done:-"+data.status)
                                                          console.log("Id:-"+data.Id)
                                                          console.log("response2:-" +data.profilePic);
                                                           let dp = data.Id;
                                                           setData({
                                                                    ...data,
                                                                    tempId:data.Id,
                                                                    });
                                                          if(data.status == "successful"){

                                                            if(image == null){
                                                                  setData({
                                                                    ...data,
                                                                    alertShow:true,
                                                                    showConfirmButton:true,
                                                                    titleMessage:'successful!!!',
                                                                    innerMessage:'Your Data Added!!!'
                                                                    });
                                                            }else{

                                                             
                                                                  let body = new FormData();
                                                              var url4 = `http://192.168.225.234:8085/uploadfamilydp`;
                                                            console.log("DP::-"+image)
                                                            console.log("DP::-"+dp)
                                                            // console.log("DP::-"+data.tempId)
                                                            body.append('file', {uri: image,name: dp+'.png',filename :'imageName.png',type: 'image/png'});
                                                             body.append('Id', dp);
                                                                body.append('Content-Type', 'image/png');

                                                            fetch(url4,{ method: 'POST',headers:{  
                                                                "Content-Type": "multipart/form-data",
                                                                "otherHeader": "foo",
                                                                } , body :body} )
                                                              // .then((res) => checkStatus(res))
                                                              // .then((res) => res.json())
                                                              .then((response) => {
                                                                    return response.text();
                                                                  })
                                                              .then((res) => {  
                                                                console.log(res)
                                                                setData({
                                                                    ...data,
                                                                    alertShow:true,
                                                                    showConfirmButton:true,
                                                                    titleMessage:'successful!!!',
                                                                    innerMessage:'Your Data Added with image!!!'
                                                                    });
                                                                })
                                                              .catch((e) => console.log(e))
                                                              // .done()

                                                            }
                                                          }else{
                                                             setData({
                                                                    ...data,
                                                                    alertShow:true,
                                                                    showCancelButton:true,
                                                                    titleMessage:'Failed!!!',
                                                                    innerMessage:'Some things wrong!!!'
                                                                    });
                                                          }

                                                        })
                                                      
    }

}

 const submitFirstPersonDetail = (name, village, talukaName, district, gender, wifeName) => {
  // console.log(name);
  // console.log(village);
  // console.log(talukaName);
  // console.log(district);
  // console.log(gender);
  // console.log(wifeName);
var e = undefined;
var f = '';

    if (name == e ||  village == e || talukaName == e || district == e ||  gender == e || wifeName == e || name == f ||  village == f || talukaName == f || district == f ||  gender == f || wifeName == f  ) {
     setData({
                       ...data,
                      alertShow:true,
                      showCancelButton:true,
                      titleMessage:'Failed!!!',
                      innerMessage:'Please Enter All Field!!!'
                       });
     

    }else{

    fetch("http://192.168.225.234:8085/rootfamily", {
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                    "id": "",
                                                                    "name": name,
                                                                    "village": village,
                                                                    "wifeName": wifeName,
                                                                    "talukaName": talukaName,
                                                                    "district":district,
                                                                    "gender": gender,
                                                                    "profilePic": null,
                                                                    "partner": wifeName
                                                        })
                                                        })
                                                        .then((response) => response.json())

                                                         .then( (data)=>{
                                                          console.log("Done:-"+data.status)
                                                          console.log("Id:-"+data.Id)
                                                          console.log("response2:-" +data.profilePic);
                                                           let dp = data.Id;
                                                           setData({
                                                                    ...data,
                                                                    tempId:data.Id,
                                                                    });
                                                          if(data.status == "successful"){

                                                            if(image == null){
                                                                  setData({
                                                                    ...data,
                                                                    alertShow:true,
                                                                    showConfirmButton:true,
                                                                    titleMessage:'successful!!!',
                                                                    innerMessage:'Your Data Added!!!'
                                                                    });
                                                            }else{

                                                             
                                                                  let body = new FormData();
                                                              var url4 = `http://192.168.225.234:8085/uploadfamilydp`;
                                                            console.log("DP::-"+image)
                                                            console.log("DP::-"+dp)
                                                            // console.log("DP::-"+data.tempId)
                                                            body.append('file', {uri: image,name: dp+'.png',filename :'imageName.png',type: 'image/png'});
                                                             body.append('Id', dp);
                                                                body.append('Content-Type', 'image/png');

                                                            fetch(url4,{ method: 'POST',headers:{  
                                                                "Content-Type": "multipart/form-data",
                                                                "otherHeader": "foo",
                                                                } , body :body} )
                                                              // .then((res) => checkStatus(res))
                                                              // .then((res) => res.json())
                                                              .then((response) => {
                                                                    return response.text();
                                                                  })
                                                              .then((res) => {  
                                                                console.log(res)
                                                                setData({
                                                                    ...data,
                                                                    alertShow:true,
                                                                    showConfirmButton:true,
                                                                    titleMessage:'successful!!!',
                                                                    innerMessage:'Your Data Added with image!!!'
                                                                    });
                                                                })
                                                              .catch((e) => console.log(e))
                                                              // .done()

                                                            }
                                                          }else{
                                                             setData({
                                                                    ...data,
                                                                    alertShow:true,
                                                                    showCancelButton:true,
                                                                    titleMessage:'Failed!!!',
                                                                    innerMessage:'Some things wrong!!!'
                                                                    });
                                                          }

                                                        })
                                                      
    }                                            

}


  const submitSingleFemaleDetail = (name, village, talukaName, district, gender, wifeName, parentId, username, mobileNumber, mobileType,mobileValid) => {
  
var e = undefined;
var f = '';

    if (mobileValid == false || name == e ||  village == e || talukaName == e || district == e ||  gender == e ||  parentId == e ||  name == f ||  village == f || talukaName == f || district == f ||  gender == f ||  parentId == f   ) {
      
      setData({
                       ...data,
                      alertShow:true,
                      showCancelButton:true,
                      titleMessage:'Failed!!!',
                      innerMessage:'Please Enter All Field!!!'
                       });
     

    }else{

 

    fetch("http://192.168.225.234:8085/family", {
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                    "id": "",
                                                                    "name": name,
                                                                    "village": village,
                                                                    "wifeName": wifeName,
                                                                    "talukaName": talukaName,
                                                                    "district":district,
                                                                    "gender": gender,
                                                                    "username":username,
                                                                    "profilePic": null,
                                                                    "parent" : {
                                                                    "id" : parentId
                                                                } 
                                                        })
                                                        })
                                                        .then((response) => response.json())

                                                       .then( (data)=>{
                                                          console.log("Done:-"+data.status)
                                                          console.log("Id:-"+data.Id)
                                                          console.log("response2:-" +data.profilePic);
                                                           let dp = data.Id;
                                                           setData({
                                                                    ...data,
                                                                    tempId:data.Id,
                                                                    });
                                                          if(data.status == "successful"){

                                                            if(image == null){
                                                                  setData({
                                                                    ...data,
                                                                    alertShow:true,
                                                                    showConfirmButton:true,
                                                                    titleMessage:'successful!!!',
                                                                    innerMessage:'Your Data Added!!!'
                                                                    });
                                                            }else{

                                                             
                                                                  let body = new FormData();
                                                              var url4 = `http://192.168.225.234:8085/uploadfamilydp`;
                                                            console.log("DP::-"+image)
                                                            console.log("DP::-"+dp)
                                                            // console.log("DP::-"+data.tempId)
                                                            body.append('file', {uri: image,name: dp+'.png',filename :'imageName.png',type: 'image/png'});
                                                             body.append('Id', dp);
                                                                body.append('Content-Type', 'image/png');

                                                            fetch(url4,{ method: 'POST',headers:{  
                                                                "Content-Type": "multipart/form-data",
                                                                "otherHeader": "foo",
                                                                } , body :body} )
                                                              // .then((res) => checkStatus(res))
                                                              // .then((res) => res.json())
                                                              .then((response) => {
                                                                    return response.text();
                                                                  })
                                                              .then((res) => {  
                                                                console.log(res)
                                                                setData({
                                                                    ...data,
                                                                    alertShow:true,
                                                                    showConfirmButton:true,
                                                                    titleMessage:'successful!!!',
                                                                    innerMessage:'Your Data Added with image!!!'
                                                                    });
                                                                })
                                                              .catch((e) => console.log(e))
                                                              // .done()

                                                            }
                                                          }else{
                                                             setData({
                                                                    ...data,
                                                                    alertShow:true,
                                                                    showCancelButton:true,
                                                                    titleMessage:'Failed!!!',
                                                                    innerMessage:'Some things wrong!!!'
                                                                    });
                                                          }

                                                        })
                                                       
    }
}        

  const submitMarriedFemaleDetail = (name, village, talukaName, district, gender, wifeName, parentId, username, mobileNumber, mobileType,mobileValid) => {
  
var e = undefined;
var f = '';

    if (mobileValid == false || name == e ||  village == e || talukaName == e || district == e ||  gender == e || parentId == e || name == f ||  village == f || talukaName == f || district == f ||  gender == f ||  parentId == f   ) {
      setData({
                       ...data,
                      alertShow:true,
                      showCancelButton:true,
                      titleMessage:'Failed!!!',
                      innerMessage:'Please Enter All Field!!!'
                       });
     

    }else{

 

    fetch("http://192.168.225.234:8085/rootfamily", {
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                    "id": "",
                                                                    "name": name,
                                                                    "village": village,
                                                                    "wifeName": wifeName,
                                                                    "talukaName": talukaName,
                                                                    "district":district,
                                                                    "gender": gender,
                                                                    "username":username,
                                                                    "profilePic": null,
                                                                    "partner": parentId,
                                                                    "partner_id" : {
                                                                    "id" : parentId
                                                                } 
                                                        })
                                                        })
                                                        .then((response) => response.json())

                                                        .then( (data)=>{
                                                          console.log("Done:-"+data.status)
                                                          console.log("Id:-"+data.Id)
                                                          console.log("response2:-" +data.profilePic);
                                                           let dp = data.Id;
                                                           setData({
                                                                    ...data,
                                                                    tempId:data.Id,
                                                                    });
                                                          if(data.status == "successful"){

                                                            if(image == null){
                                                                  setData({
                                                                    ...data,
                                                                    alertShow:true,
                                                                    showConfirmButton:true,
                                                                    titleMessage:'successful!!!',
                                                                    innerMessage:'Your Data Added!!!'
                                                                    });
                                                            }else{

                                                             
                                                                  let body = new FormData();
                                                              var url4 = `http://192.168.225.234:8085/uploadfamilydp`;
                                                            console.log("DP::-"+image)
                                                            console.log("DP::-"+dp)
                                                            // console.log("DP::-"+data.tempId)
                                                            body.append('file', {uri: image,name: dp+'.png',filename :'imageName.png',type: 'image/png'});
                                                             body.append('Id', dp);
                                                                body.append('Content-Type', 'image/png');

                                                            fetch(url4,{ method: 'POST',headers:{  
                                                                "Content-Type": "multipart/form-data",
                                                                "otherHeader": "foo",
                                                                } , body :body} )
                                                              // .then((res) => checkStatus(res))
                                                              // .then((res) => res.json())
                                                              .then((response) => {
                                                                    return response.text();
                                                                  })
                                                              .then((res) => {  
                                                                console.log(res)
                                                                setData({
                                                                    ...data,
                                                                    alertShow:true,
                                                                    showConfirmButton:true,
                                                                    titleMessage:'successful!!!',
                                                                    innerMessage:'Your Data Added with image!!!'
                                                                    });
                                                                })
                                                              .catch((e) => console.log(e))
                                                              // .done()

                                                            }
                                                          }else{
                                                             setData({
                                                                    ...data,
                                                                    alertShow:true,
                                                                    showCancelButton:true,
                                                                    titleMessage:'Failed!!!',
                                                                    innerMessage:'Some things wrong!!!'
                                                                    });
                                                          }

                                                        })
                                                    
    }
}  


const updateInfo = (e) => {
        
            setData({
                ...data,
                  mobileValid: phoneRef.current.isValidNumber(),
                  mobileType: phoneRef.current.getNumberType(),
                  mobileNumber: phoneRef.current.getValue()
            });
       
    }

  // -------------------------------------------------- End of Dp Upload ------------------------------------------------------

    const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.3
    }).then(image => {
      console.log(image);
      setImage(image.path);
      setData({
        ...data,
        profilePic:image.path
      });
      // uploadImage();
      // this.bs.current.snapTo(1);

//         let body = new FormData();
//   var url4 = `http://192.168.225.234:8085/uploadfamilydp`;

// body.append('file', {uri: image.path,name: 'extra'+'.png',filename :'imageName.png',type: 'image/png'});
//     body.append('Content-Type', 'image/png');

// fetch(url4,{ method: 'POST',headers:{  
//      "Content-Type": "multipart/form-data",
//      "otherHeader": "foo",
//      } , body :body} )
//   // .then((res) => checkStatus(res))
//   // .then((res) => res.json())
//   .then((response) => {
//          return response.text();
//       })
//   .then((res) => { console.log("response:-" +res); })
//   .catch((e) => console.log(e))
//   .done()

    });

  }

  // -------------------------------------------------- End of Dp Upload ------------------------------------------------------

  return (
     
    <SafeAreaView style={{ flex: 1, justifyContent:'center', 
        }}>
    <ScrollView>

    {/* ---------------------------------------------This is Start of main view------------------------------------------- */}

      <KeyboardAvoidingView
      // style={styles.container}
      behavior="padding"
    >
<View style={styles.container}>
 <View style={{ justifyContent:'center', alignItems:'center',backgroundColor:"#00ace6", padding:10,borderRadius:5 }}><Text style={{fontSize:18}}>Add Your Family</Text></View>

    {/* ---------------------------------------------This is Start village selection view------------------------------------------- */}

      {data.showVillageList ? (
        <View style={{ }}>
        {/* <View style={{  }}> */}
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          autoFocus = {true}
          onChangeText={(text) => searchFilterFunction3(text)}
          onClear={(text) => setFilteredDataSource3([])}
          placeholder="Search Person..."
          value={search1}
        />
    <ScrollView>

     <FlatList
          data={filteredDataSource1}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView3}
        />
    </ScrollView>


    {/* </View> */}
    
    </View>
            ) : null}

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Profile Photo</Text>
<View style={styles.button}>
      <Avatar.Image
               source={{ uri: `${data.profilePic}` }}
               size={60}
                />
 <TouchableOpacity style={styles.choosefileTouch}
                   onPress={() => {
                                  choosePhotoFromLibrary()
                                }}
                                >
                  <Text style={styles.contenttext}>Choose From Gallary</Text>
                </TouchableOpacity>
</View>

<Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Village</Text>
            {data.showVillageSuperAdmin ? (
             <TouchableOpacity
                  style={styles.button}  
                   onPress={() => {                           
                             setData({          
                               ...data,
                       showVillageList:true                 
                           })    }  }
                >
                   <Text >Select Village</Text>
                </TouchableOpacity>
                 ) : null}
                <Text style={styles.button}  >{data.village}</Text>
    <View style={{ justifyContent:'center', alignItems:'center' }}>
    {/* <Text>Village:-{data.village}</Text> */}
    </View>
    {/* ---------------------------------------------This is End of village selection view------------------------------------------- */}
    
    {/* ---------------------------------------------This is Start of root/active person selection------------------------------------------- */}

      
       <View style={styles.button} >

     <Text> Have Father Detail:- </Text><RadioButton
        value="second"
        status={ data.checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setData({          
                                  // ...data,
                                  village:data.village,
                                  talukaName:data.talukaName,
                                  district:data.district,
                                  showFirstPerson:false,   
                                  showChildPerson:true,
                                   checked:"second"                 

                              })}
      />
           <Text> First Person:- </Text><RadioButton
        value="first"
        status={ data.checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => 
                   setData({         
                    //  ...data, 
                       village:data.village,
                       talukaName:data.talukaName,
                       district:data.district,
                       showFirstPerson:true,
                       showChildPerson:false,
                       checked:"first"                 
                           })
            }
      />
      {/* <Text>{data.checked}</Text> */}
    </View>
    {/* ---------------------------------------------This is End of root/active person selection------------------------------------------- */}
  

    {/* ---------------------------------------------This is Start of root person view------------------------------------------- */}

          {data.showFirstPerson ? (
          <View style={{flexDirection:"column"}}>
              {/* <Text>First Person</Text> */}

               <Text style={[styles.text_footer, {
                 
                color: "colors.text"
            }]}>Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Name"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => 
                    setData({
                    ...data,
                    name:val
                     })
                    }         
                />
                </View>

       


                <Text style={[styles.text_footer, {
                 
                color: "colors.text"
            }]}>Wife Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Wife Name"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                     onChangeText={(val) => 
                    setData({
                    ...data,
                    wifeName:val
                     })
                    }         
                />
                </View>


<View>
                

            <View style={styles.button}>
                <Text> Gender:- </Text>
            <Text> Male:- </Text><RadioButton
                value="Male"
                status={ data.gender === 'm' ? 'checked' : 'unchecked' }
                onPress={() => 
                          setData({          
                            ...data,
                              // showMale:true,            
                              // showFemale:false,   
                              // showChildPerson:true,
                              gender:"m"                 


                                  })
                    }
              />
            <Text> Female:- </Text><RadioButton
                value="Female"
                status={ data.gender === 'f' ? 'checked' : 'unchecked' }
                onPress={() => setData({        
                                          ...data,  
                                  //         showFemale:true,       
                                  //     showMale:false,        
                                  // showChildPerson:true,
                                    gender:"f"                 


                                      })}
              />
             </View>

                  <TouchableOpacity
                  style={styles.button2}  
                   onPress={() => {                           
                            worning()
                                }  }
                >
                   <Text >Check Your Data</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.button2}  
                   onPress={() => {                           
                            submitFirstPersonDetail(data.name, data.village, data.talukaName, data.district, data.gender, data.wifeName)
                                }  }
                >
                   <Text >Submit</Text>
                </TouchableOpacity>
</View>
          ) : null} */}
              </View>
       
          ) : null}

    {/* ---------------------------------------------This is End of root person view------------------------------------------- */}

    {/* ---------------------------------------------This is Start of Active person view------------------------------------------- */}

      {data.showChildPerson ? (
        <View>
    {/* ---------------------------------------------This is Start of gender selection------------------------------------------- */}

            <View style={styles.button}>

            <Text> Gender:- </Text>
            <Text> Male:- </Text><RadioButton
                value="Male"
                status={ data.gender === 'm' ? 'checked' : 'unchecked' }
                onPress={() => 
                          setData({          
                            ...data,
                              showMale:true,            
                              showFemale:false,   
                              showChildPerson:true,
                              gender:"m"                 


                                  })
                    }
              />
            <Text> Female:- </Text><RadioButton
                value="Female"
                status={ data.gender === 'f' ? 'checked' : 'unchecked' }
                onPress={() => setData({        
                                          ...data,  
                                          showFemale:true,       
                                      showMale:false,        
                                  showChildPerson:true,
                                    gender:"f"                 


                                      })}
              />
             
            </View>
    {/* ---------------------------------------------This is End of gender selection------------------------------------------- */}
              
{/* //-------------------------------This is Start of Enter Male Detail------------------------------ */}

       {data.showMale ? (
          <View >
              
               <Text style={[styles.text_footer, {
                 
                color: "colors.text"
            }]}>Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Enter Name"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                     onChangeText={(val) => 
                    setData({
                    ...data,
                    name:val
                     })
                    }         
                />
                </View>
             
           

         {/* { data.isValidPhone ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{data.phoneNumberMsg}</Text>
            </Animatable.View>
            } */}

                <View style={styles.button} >
            <Text> Have Phone Number:- </Text>
            <Text> Yes:- </Text><RadioButton
                value="1"
                status={ data.haveAccount === true ? 'checked' : 'unchecked' }
                onPress={() => 
                          setData({    
                            ...data,                          
                            haveAccount:true,
                            showUsername:true,
                            mobileValid:false,
                                  })
                    }
              />
            <Text> No:- </Text><RadioButton
                value="0"
                status={ data.haveAccount === false ? 'checked' : 'unchecked' }
                onPress={() => setData({       
                                        ...data,                                                 
                                      haveAccount:false,
                                      showUsername:false,
                                      username:"",
                                      mobileNumber:'',
                                      mobileValid:true
                                      

                                      })}
              />
             
            </View>
      {data.showUsername ? (
<View>
          <Text style={[styles.text_footer, {
                    
                    color: "colors.text"
                }]}>Phone Number</Text>

                 <PhoneInput
           initialCountry='in'
        style={styles.phoneInput} 
           ref={phoneRef}
            
           onChangePhoneNumber={(e)=>updateInfo(e)}
         />
</View>

                    

          ) : null}

          
             <Text style={[styles.text_footer, {
                 
                color: "colors.text"
            }]}>Father Name</Text>
<TouchableOpacity
                  style={styles.button}  
                   onPress={() => {                           
                             setData({          
                               ...data,
                       showFatherList:true                 
                           })    }  }
                >
                   <Text >{data.fatherName}</Text>
                </TouchableOpacity>

      {data.showFatherList ? (

<View >
 <SearchBar
          round
          searchIcon={{ size: 24 }}
          autoFocus = {true}
          onChangeText={(text) => searchFilterFunction4(text)}
          onClear={(text) => setFilteredDataSource4([])}
          placeholder={data.fatherName}
          value={search4}
        />
        <FlatList
          data={filteredDataSource4}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView4}
        />
        </View>
          ) : null}

{/* <Text>Parent:-{data.parentId}</Text> */}
            <TouchableOpacity
                  style={styles.button2}  
                   onPress={() => {                           
                            worning()
                                }  }
                >
                   <Text >Check Your Data</Text>
                </TouchableOpacity>

<TouchableOpacity
                  style={styles.button2}  
                   onPress={() => {                           
                            submitMaleDetail(data.name, data.village, data.talukaName, data.district, data.username, data.gender, data.parentId, data.mobileNumber, data.mobileType, data.mobileValid, image)
                                }  }
                >
                   <Text >Submit</Text>
                </TouchableOpacity>

        </View>
          ) : null}

    {/* //-------------------------------This is End of Enter Male Detail------------------------------ */}

    {/* ---------------------------------------------This is Start of Female View------------------------------------------- */}

      {data.showFemale ? (
        <View>
            <View style={styles.button}>
            <Text> Married Status:- </Text>
            <Text> single:- </Text><RadioButton
                value="single"
                status={ data.checked2 === 'single' ? 'checked' : 'unchecked' }
                onPress={() => 
                          setData({    
                            ...data,      
                              showFemale:true,            
                                  showChildPerson:true ,              
                                  showFemaleSingle:true,
                                  checked2:"single",
                                  ShowFemaleMarried:false,


                                  })
                    }
              />
            <Text> married:- </Text><RadioButton
                value="married"
                status={ data.checked2 === 'married' ? 'checked' : 'unchecked' }
                onPress={() => setData({       
                                        ...data,   
                                          showFemale:true,         
                                  showChildPerson:true,
                                  showFemaleSingle:false,
                                  ShowFemaleMarried:true,
                                  checked2:"married"                 
              

                                      })}
              />
             
            </View>
            

       
    {/* ---------------------------------------------This is Start of Single Female View------------------------------------------- */}

           {data.showFemaleSingle ? (
          <View style={{flexDirection:"column"}}>
              {/* <Text>Single Female Selected</Text> */}
               <Text style={[styles.text_footer, {
                 
                color: "colors.text"
            }]}>Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Enter Name"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                     onChangeText={(val) => 
                    setData({
                    ...data,
                     name:val
                     })
                    }         
                />
                </View>

                             <View style={styles.button} >
            <Text> Have Phone Number:- </Text>
            <Text> Yes:- </Text><RadioButton
                value="1"
                status={ data.haveAccount === true ? 'checked' : 'unchecked' }
                onPress={() => 
                          setData({    
                            ...data,                          
                            haveAccount:true,
                            showUsername:true,
                            mobileValid:false,
                                  })
                    }
              />
            <Text> No:- </Text><RadioButton
                value="0"
                status={ data.haveAccount === false ? 'checked' : 'unchecked' }
                onPress={() => setData({       
                                        ...data,                                                 
                                      haveAccount:false,
                                      showUsername:false,
                                      username:"",
                                      mobileNumber:'',
                                      mobileValid:true
                                      

                                      })}
              />
             
            </View>
      {data.showUsername ? (
<View>
          <Text style={[styles.text_footer, {
                    
                    color: "colors.text"
                }]}>Phone Number</Text>

                 <PhoneInput
           initialCountry='in'
        style={styles.phoneInput} 
           ref={phoneRef}
            
           onChangePhoneNumber={(e)=>updateInfo(e)}
         />
</View>

                    

          ) : null}


                 <Text style={[styles.text_footer, {
                 
                color: "colors.text"
            }]}>Father</Text>
<TouchableOpacity
                  style={styles.button}  
                   onPress={() => {                           
                             setData({          
                               ...data,
                       showFatherList:true                 
                           })    }  }
                >
                   <Text >{data.fatherName}</Text>
                </TouchableOpacity>

      {data.showFatherList ? (

<View>
 <SearchBar
          round
          searchIcon={{ size: 24 }}
          autoFocus = {true}
          onChangeText={(text) => searchFilterFunction4(text)}
          onClear={(text) => setFilteredDataSource4([])}
          placeholder={data.fatherName}
          value={search4}
        />
        <FlatList
          data={filteredDataSource4}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView4}
        />
        </View>
          ) : null}

<TouchableOpacity
                  style={styles.button2}  
                   onPress={() => {                           
                            worning()
                                }  }
                >
                   <Text >Check Your Data</Text>
                </TouchableOpacity>

          <TouchableOpacity
                  style={styles.button2}  
                   onPress={() => {                           
                            submitSingleFemaleDetail(data.name, data.village, data.talukaName, data.district, data.gender, data.wifeName, data.parentId, data.username, data.mobileNumber, data.mobileType, data.mobileValid)
                                }  }
                >
                   <Text >Submit</Text>
                </TouchableOpacity>

        </View>
          ) : null}
    {/* ---------------------------------------------This is End of Single Female View------------------------------------------- */}

    {/* ---------------------------------------------This is Start of Married Female View------------------------------------------- */}

           {data.ShowFemaleMarried ? (
          <View style={{flexDirection:"column"}}>

            <Text style={[styles.text_footer, {
                 
                color: "colors.text"
            }]}>Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Enter Name"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                     onChangeText={(val) => 
                    setData({
                    ...data,
                     name:val
                     })
                    }         
                />
                </View>
                               <View style={styles.button} >
            <Text> Have Phone Number:- </Text>
            <Text> Yes:- </Text><RadioButton
                value="1"
                status={ data.haveAccount === true ? 'checked' : 'unchecked' }
                onPress={() => 
                          setData({    
                            ...data,                          
                            haveAccount:true,
                            showUsername:true,
                            mobileValid:false,
                                  })
                    }
              />
            <Text> No:- </Text><RadioButton
                value="0"
                status={ data.haveAccount === false ? 'checked' : 'unchecked' }
                onPress={() => setData({       
                                        ...data,                                                 
                                      haveAccount:false,
                                      showUsername:false,
                                      username:"",
                                      mobileNumber:'',
                                      mobileValid:true
                                      

                                      })}
              />
             
            </View>
      {data.showUsername ? (
<View>
          <Text style={[styles.text_footer, {
                    
                    color: "colors.text"
                }]}>Phone Number</Text>

                 <PhoneInput
           initialCountry='in'
        style={styles.phoneInput} 
           ref={phoneRef}
            
           onChangePhoneNumber={(e)=>updateInfo(e)}
         />
</View>

                    

          ) : null}


                <Text style={[styles.text_footer, {
                 
                color: "colors.text"
            }]}>Partner</Text>
<TouchableOpacity
                  style={styles.button}  
                   onPress={() => {                           
                             setData({          
                               ...data,
                       showFatherList:true                 
                           })    }  }
                >
                   <Text >{data.fatherName}</Text>
                </TouchableOpacity>

      {data.showFatherList ? (

<View>
 <SearchBar
          round
          searchIcon={{ size: 24 }}
          autoFocus = {true}
          onChangeText={(text) => searchFilterFunction4(text)}
          onClear={(text) => setFilteredDataSource4([])}
          placeholder={data.fatherName}
          value={search4}
        />
        <FlatList
          data={filteredDataSource4}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView4}
        />
        </View>
          ) : null}

<TouchableOpacity
                  style={styles.button2}  
                   onPress={() => {                           
                            worning()
                                }  }
                >
                   <Text >Check Your Data</Text>
                </TouchableOpacity>

          <TouchableOpacity
                  style={styles.button2}  
                   onPress={() => {                           
                            submitMarriedFemaleDetail(data.name, data.village, data.talukaName, data.district, data.gender, data.wifeName, data.parentId,  data.username, data.mobileNumber, data.mobileType, data.mobileValid)
                                }  }
                >
                   <Text >Submit</Text>
                </TouchableOpacity>
        </View>
          ) : null}
    {/* ---------------------------------------------This is End of Married Female View------------------------------------------- */}

          </View>
            ) : null}
    {/* ---------------------------------------------This is End of Female View------------------------------------------- */}

            </View>
            ) : null}
    {/* ---------------------------------------------This is End of Active person view------------------------------------------- */}

    {/* //--------------------------------------------This is Start of search Person------------------------------------------- */}
        {data.showSearch ? (
          <View>
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
    {/* //--------------------------------------------This is End of search Person------------------------------------------- */}

    {/* //--------------------------------------------This is Start of search Village------------------------------------------- */}

          {data.showVillage ? (
          <View>
        <SearchBar
          round
          autoFocus = {true}
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction2(text)}
          onClear={(text) => setFilteredDataSource2([])}
          placeholder="Search Village..."
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView2}
        />
        </View>
          ) : null}
    {/* //--------------------------------------------This is End of search Village------------------------------------------- */}
          
      </View>
    </KeyboardAvoidingView>
    {/* ----------------------------This is End of main view------------------------------------------- */}

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

      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
    justifyContent: 'center',
    padding:5,
    paddingLeft:10
    // alignItems: 'center',      
  },
  itemStyle: {
    padding: 10,
  },
  buttonView:{
    marginTop:150 ,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  button:{
    //  justifyContent: 'center',
    alignItems: 'center', 
    // width:100,
    // height:100,
    marginVertical:10,
    paddingVertical:5,
    // padding:10,
    // backgroundColor:"lightblue",
    borderRadius:8,
     flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',

  },
   button2:{
     justifyContent: 'center',
    alignItems: 'center', 
    // width:100,
    // height:100,
    marginVertical:10,
    paddingVertical:10,
    padding:10,
    backgroundColor:"#00ace6",
    borderRadius:8,
     flexDirection: 'row',
     

  },
  picker:{
    width:200,
    height:50,
  },
  radioView:{
     justifyContent:'center', 
     alignItems:'center', 
     flexDirection: 'row',
     backgroundColor:"gray", 
     marginVertical:5
  },
  text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop:5,
    },
     action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
     textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
     phoneInput: {
     borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
     paddingVertical: 20
  },
  choosefileTouch:{
    backgroundColor:"#00ace6",
    padding:5,
    borderRadius:5,
    marginLeft:20
  },
  contenttext:{
    color:"white",
    fontWeight:"bold",
    fontSize:12
  },
});

export default AddFamily;

