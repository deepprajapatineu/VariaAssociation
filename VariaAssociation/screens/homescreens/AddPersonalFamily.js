import React,{useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,Image,TouchableOpacity, Picker, TextInput, FlatList, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

import {
       Avatar,
    List
} from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import AppTouchacleOpacity from '../design/AppTouchacleOpacity';  

const AddPersonalFamily = ({navigation}) => {

   
useEffect(() => {
   Promise.all([  
   AsyncStorage.multiGet(["userName", "mobileNumber", "dpuri", "firstName", "middleName", "lastName", "mobileNumber","temptoken","role","villageName","talukaName","district"]).then(response => {

             Promise.all([  setData({
                  ...data,
                  username:response[0][1],
                  mobileNumber:response[1][1],
                  dpuri:response[2][1],
                  token:response[7][1],
                  role:response[8][1],
                  village:response[9][1],  
                  talukaName:response[10][1],
                  district:response[11][1],  
                  
            }),
            setAdminVillage(response[9][1]),
            setAdminTalukaName(response[10][1]),
            setAdminDistrict(response[11][1]),
             ]);
        })
             ]);


  }, [])

 const [dpImage, setDpImage] = useState("");
 const [familyId, setFamilyId] = useState("");
    const [image, setImage] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [pname, setPname] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [partnerName, setPartnerName] = useState('');
const [adminVillage, setAdminVillage] = useState('');
  const [adminTalukaName, setAdminTalukaName] = useState('');
  const [adminDistrict, setAdminDistrict] = useState('');
const [data, setData] = React.useState({
    showDetail:false,
    showAddDetail:false, 
    showSearch:false,
    showAll:true,
    showSearchButton:false,

     name:"",
     username:'',  
     fatherId:"",
     motherId:"",
     partnerId:"",
     father:"Please Add",
     mother:"Please Add",
     partner:"Please Add",
     selectItem:"",
     detail:"",
     detail2  :"Please Select",
     token:"",
     role:"",
     profilePic:"",
      alertShow:false,
    titleMessage:'',
    innerMessage:'',
    showCancelButton:true,
    showConfirmButton:false,
    });

  const { colors } = useTheme();

  const theme = useTheme();

const HandleShowAddDetail = () =>{
  setData({
                ...data,
                  showAddDetail:true,
                  showDetail:false,
            })
}


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

    const getItem = (item) => {
     setData({
                ...data,
                 detail:item.id,
                 detail2:item.name,
                 showSearch:false,
                 showAll:true           

            })
  };

  const updateDetail = (username, selectItem, detail) =>{

     if (selectItem == "father"){
             fetch("http://192.168.225.234:8085/savepersonalfamily", {

                         
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                    "username": username,
                                                                    "father": detail 
                                                        })
                                                        })
                                                        .then((response) => response.json())

                                                        .then( (response2)=>{
                                                          var result = response2.message;
                                                           if(result == "successfull"){
                                                             setData({
                                                                      ...data,
                                                                      alertShow:true,
                                                                      titleMessage:'successfull',
                                                                      innerMessage:'Your Data Submited',
                                                                      showCancelButton:false,
                                                                      showConfirmButton:true,
                                                                  })
                                                          }else{
                                                             setData({
                                                                      ...data,
                                                                      alertShow:true,
                                                                      titleMessage:'Failed',
                                                                      innerMessage:'Please Try Again!',
                                                                      showCancelButton:true,
                                                                      showConfirmButton:false,
                                                                  })
                                                          }
                                                         
                                                        })
                                              }
            else if (selectItem == "mother"){
             fetch("http://192.168.225.234:8085/savepersonalfamily", {

                         
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                    "username": username,
                                                                    "mother": detail 
                                                        })
                                                        })
                                                        .then((response) => response.json())

                                                        .then( (response2)=>{
                                                                 var result = response2.message;
                                                           if(result == "successfull"){
                                                             setData({
                                                                      ...data,
                                                                      alertShow:true,
                                                                      titleMessage:'successfull',
                                                                      innerMessage:'Your Data Submited',
                                                                      showCancelButton:false,
                                                                      showConfirmButton:true,
                                                                  })
                                                          }else{
                                                             setData({
                                                                      ...data,
                                                                      alertShow:true,
                                                                      titleMessage:'Failed',
                                                                      innerMessage:'Please Try Again!',
                                                                      showCancelButton:true,
                                                                      showConfirmButton:false,
                                                                  })
                                                          }
                                                         
                                                        })
                                              }

              else if (selectItem == "partner"){
                                    fetch("http://192.168.225.234:8085/savepersonalfamily", {

                                                
                                                                                method: "POST",
                                                                                headers: {
                                                                                    'Accept': 'application/json',
                                                                                    'Content-Type': 'application/json'
                                                                                },
                                                                                body: JSON.stringify({
                                                                                            "username": username,
                                                                                            "partner": detail 
                                                                                })
                                                                                })
                                                                                .then((response) => response.json())

                                                                                .then( (response2)=>{
                                                                                         var result = response2.message;
                                                           if(result == "successfull"){
                                                             setData({
                                                                      ...data,
                                                                      alertShow:true,
                                                                      titleMessage:'successfull',
                                                                      innerMessage:'Your Data Submited',
                                                                      showCancelButton:false,
                                                                      showConfirmButton:true,
                                                                  })
                                                          }else{
                                                             setData({
                                                                      ...data,
                                                                      alertShow:true,
                                                                      titleMessage:'Failed',
                                                                      innerMessage:'Please Try Again!',
                                                                      showCancelButton:true,
                                                                      showConfirmButton:false,
                                                                  })
                                                          }
                                                                                
                                                                                })
                                              }
                              else if (selectItem == "yourSelf"){
                                    fetch("http://192.168.225.234:8085/savepersonalfamily", {

                                                
                                                                                method: "POST",
                                                                                headers: {
                                                                                    'Accept': 'application/json',
                                                                                    'Content-Type': 'application/json'
                                                                                },
                                                                                body: JSON.stringify({
                                                                                            "username": username,
                                                                                            "familyId": detail 
                                                                                })
                                                                                })
                                                                                .then((response) => response.json())

                                                                                .then( (response2)=>{
                                                                                         var result = response2.message;
                                                           if(result == "successfull"){
                                                             setData({
                                                                      ...data,
                                                                      alertShow:true,
                                                                      titleMessage:'successfull',
                                                                      innerMessage:'Your Data Submited',
                                                                      showCancelButton:false,
                                                                      showConfirmButton:true,
                                                                  })
                                                          }else{
                                                             setData({
                                                                      ...data,
                                                                      alertShow:true,
                                                                      titleMessage:'Failed',
                                                                      innerMessage:'Please Try Again!',
                                                                      showCancelButton:true,
                                                                      showConfirmButton:false,
                                                                  })
                                                          }
                                                                                
                                                                                })
                                              }
                                              else{
                                                 setData({
                                                        ...data,        
                                                            alertShow:true,
                                                            titleMessage:'Failed!!',
                                                            innerMessage:'Please Enter All Field',
                                                            showCancelButton:true,
                                                            showConfirmButton:false,
                                                    })

                                              }
    }


 const HandleShowDetail1 = (username) =>{

          var url = `http://192.168.225.234:8085/personalfamily/${username}`;
                                        
                                                    fetch(url, {
                                                        method: 'GET'
                                                    })
                                                    .then((response2) => response2.json())
                                                    .then(async(response2) => {
                                                        var yourSelf = response2.familyId;
                                                              if(!(yourSelf == null)){
                                                                            var url = `http://192.168.225.234:8085/familypersondetail/${yourSelf}/${adminVillage}`;
                                                                    
                                                                                fetch(url, {
                                                                                    method: 'GET'
                                                                                })
                                                                                .then((response3) => response3.json())
                                                                                .then(async(response3) => {
                                                                                                                                                            
                                                                                        // setData({
                                                                                        //       ...data,        
                                                                                        //     profilePic:response3[0].profilePic,
                                                                                        //   });
                                                                                        setDpImage(response3[0].profilePic)
                                                                                        setFamilyId(response3[0].id)
                                                                                          setPname(response3[0].name) 
                                                                                    })
                                                                                .catch((error) => {
                                                                                    console.error(error);
                                                                                });
                                                              } 

                                                                                

                                                        })
                                                    .catch((error) => {
                                                        console.error(error);
                                                    });

       setData({
                ...data,
                  showAddDetail:false,
                  showDetail:true,
            })
    } 


 const HandleShowDetail2 = (username) =>{

          var url = `http://192.168.225.234:8085/personalfamily/${username}`;
                                        
                                                    fetch(url, {
                                                        method: 'GET'
                                                    })
                                                    .then((response2) => response2.json())
                                                    .then(async(response2) => {
                                                        var fatherid = response2.father;

                                                                         if (!(fatherid == null)){

                                                                                 var url = `http://192.168.225.234:8085/familypersondetail/${fatherid}/${adminVillage}`;
                                                                    
                                                                                fetch(url, {
                                                                                    method: 'GET'
                                                                                })
                                                                                .then((response3) => response3.json())
                                                                                .then(async(response3) => {                                                                            
                                                                                    setFatherName(response3[0].name)
                                                                                    // setData({
                                                                                    //         ...data,        
                                                                                    //       father:response3[0].name,
                                                                                    //       showDetail:true,
                                                                                    //     })
                                                                                    })
                                                                                .catch((error) => {
                                                                                    console.error(error);
                                                                                });
                                                                         }

                                                                    


                                                        })
                                                    .catch((error) => {
                                                        console.error(error);
                                                    });

       setData({
                ...data,
                  showAddDetail:false,
                  showDetail:true,
            })
    } 


 const HandleShowDetail3 = (username) =>{

          var url = `http://192.168.225.234:8085/personalfamily/${username}`;
                                        
                                                    fetch(url, {
                                                        method: 'GET'
                                                    })
                                                    .then((response2) => response2.json())
                                                    .then(async(response2) => {
                                                        var motherid = response2.mother;

                                                                           if (!(motherid == null)){

                                                                                 var url = `http://192.168.225.234:8085/familypersondetail/${motherid}/${adminVillage}`;
                                                                    
                                                                                fetch(url, {
                                                                                    method: 'GET'
                                                                                })
                                                                                .then((response3) => response3.json())
                                                                                .then(async(response3) => {                                                                        
                                                                                   setMotherName(response3[0].name)
                                                                                    // setData({
                                                                                    //         ...data,        
                                                                                    //       mother:response3[0].name,
                                                                                    //       showDetail:true,
                                                                                    //     })
                                                                                    })
                                                                                .catch((error) => {
                                                                                    console.error(error);
                                                                                });
                                                                           }

                                                                            

                                                        })
                                                    .catch((error) => {
                                                        console.error(error);
                                                    });

       setData({
                ...data,
                  showAddDetail:false,
                  showDetail:true,
            })
    } 

 const HandleShowDetail4 = (username) =>{

          var url = `http://192.168.225.234:8085/personalfamily/${username}`;
                                        
                                                    fetch(url, {
                                                        method: 'GET'
                                                    })
                                                    .then((response2) => response2.json())
                                                    .then(async(response2) => {
                                                     
                                                        var partnerid = response2.partner;

                                                                         if(!(partnerid == null)){

                                                                                 var url = `http://192.168.225.234:8085/familypersondetail/${partnerid}/${adminVillage}`;
                                                                    
                                                                                fetch(url, {
                                                                                    method: 'GET'
                                                                                })
                                                                                .then((response3) => response3.json())
                                                                                .then(async(response3) => {
                                                                                   
                                                                                  setPartnerName(response3[0].name)                                                                          
                                                                                    // setData({
                                                                                    //         ...data,        
                                                                                    //       partner:response3[0].name,
                                                                                    //       showDetail:true,
                                                                                    //     })
                                                                                    })
                                                                                .catch((error) => {
                                                                                    console.error(error);
                                                                                });
                                                                         }

                                                        })
                                                    .catch((error) => {
                                                        console.error(error);
                                                    });

       setData({
                ...data,
                  showAddDetail:false,
                  showDetail:true,
            })
    } 

    const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.3
    }).then(image => {
         setImage(image.path);
        let body = new FormData();
  var url4 = `http://192.168.225.234:8085/uploadfamilydp`;

body.append('file', {uri: image.path,name: familyId+'.png',filename :'imageName.png',type: 'image/png'});
    body.append('Id', familyId);

    body.append('Content-Type', 'image/png');

fetch(url4,{ method: 'POST',headers:{  
     "Content-Type": "multipart/form-data",
     "otherHeader": "foo",
     } , body :body} )
     .then((response) => {
               return response.text();
          })
  .then((res) => {
    
     setDpImage(res)
  
  })
  .catch((e) => console.log(e))
  .done()
    });
  }


    return (
      <View style={styles.container}>
      <ScrollView
              showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
  >
{/* <Text>{data.username}</Text> */}
  {/* <Text>{data.fatherId}</Text>
  <Text>{data.mother}</Text>
  <Text>{data.partner}</Text> */}

   {/* ------------------------------------------------------------------------------------------- */}


          {data.showSearch ? (
          <View style={styles.search}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          autoFocus = {true}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
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
          {/* ------------------------------------------------------------------------------------------- */}
{data.showAll ? (
  <View>
      <View style={styles.buttonView}>
     <AppTouchacleOpacity text="ADD MEMBER"  onPress={() => HandleShowAddDetail()}  width={130} />
      

      {data.showAddDetail ? (
<View style={styles.AddDetailView}>
    <Picker
            selectedValue={data.selectItem}
            // style={{ height: 50, width: 200, backgroundColor:'#a6a6a6'}}
            style={{ height: 50, width: 155 , color: '#344953',justifyContent: 'center',   }}
            onValueChange={(itemValue, itemIndex) => 
         setData({
                ...data,
                  selectItem:itemValue, 
                  showSearchButton:true,          
            })}
            itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17, height: 44 }}
          > 
             <Picker.Item label="Select Value" />
            <Picker.Item label="Your Self" value="yourSelf" />
            <Picker.Item label="Father" value="father" />
            <Picker.Item label="Mother" value="mother" />
            <Picker.Item label="Partner" value="partner" />
          </Picker>
         
{data.showSearchButton ? (

                <TouchableOpacity
                  style={styles.button1}  
                   onPress={() => {                           
                       setData({
                                    ...data,
                                      showSearch:true,
                                      showAll:false           
                                })
                       }}      
                >
                   <Text style={styles.buttonText}>{data.detail2}</Text>
                </TouchableOpacity>
          ) : null}
     <AppTouchacleOpacity text="Submit"  onPress={() => { updateDetail(data.username, data.selectItem, data.detail)}}  width={130} />

</View>

          ) : null}

                 
     <AppTouchacleOpacity text="SHOW MEMBER"  onPress={() => {HandleShowDetail1(data.username), HandleShowDetail2(data.username), HandleShowDetail3(data.username), HandleShowDetail4(data.username)}}  width={130} />
                
</View>
                {data.showDetail ? (
                <View style={styles.AddDetailView2}>
                   {/* <Text style={styles.buttonText}>SHOW MEMBER</Text> */}
                <View>

                  <View style={styles.button2}>
                    <Avatar.Image
                            source={{ uri: `${dpImage}` }}
                            size={80}
                              />
              <TouchableOpacity style={styles.choosefileTouch}
                                onPress={() => {
                                                choosePhotoFromLibrary()
                                              }}
                                              >
                                <Text style={styles.contenttext}>Edit</Text>
                              </TouchableOpacity>
              </View>

                    <View style={styles.contentheader}>
                          
                        <Text style={styles.contenttext}>Your Name</Text>
                      
                      </View>
                        <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{pname}</Text>
                      </View>

                      <View style={styles.contentheader}>
                          
                        <Text style={styles.contenttext}>Father</Text>
                      
                      </View>
                        <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{fatherName}</Text>
                      </View>

                      <View style={styles.contentheader}>
                          
                        <Text style={styles.contenttext}>Mother</Text>
                      
                      </View>
                        <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{motherName}</Text>
                      </View>

                          <View style={styles.contentheader}>
                          
                        <Text style={styles.contenttext}>Partner</Text>
                      
                      </View>
                        <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{partnerName}</Text>
                      </View>
                </View>
                </View>
          ) : null}
      
       </View>
          ) : null}
                <AwesomeAlert
          show={data.alertShow}
          showProgress={true}
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
            //   this.navigation.push('SignUpScreen'),
            setData({
                ...data,
                alertShow: false
                });
          }}
          onConfirmPressed={() => {
            //  signOut()                               
            setData({
                ...data,
                alertShow: false
                });
            navigation.goBack()   
          }}
        />
      </ScrollView>

      </View>
    );
};

export default AddPersonalFamily;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  header:{
    backgroundColor:'red',
    width:'100%',
    height:50,
     position: 'absolute', 
    top: 0, 
  },
  headericon:{
    width:40,
    backgroundColor:'blue',
     position: 'absolute', 
    top: 0, 
  },
  button:{
     justifyContent: 'center',
    alignItems: 'center', 
    marginVertical:10,
    // paddingVertical:30,
    // padding:10,
    backgroundColor:"#00ace6",
    borderRadius:8,
    width:130,
    height:50,
    shadowColor: "#000",
    shadowOffset: { width: 15, height: 15 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 10,
  },

   buttonView:{
    // marginTop:150 ,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  AddDetailView:{
    // backgroundColor:"red",
    justifyContent:"center",
    alignItems:"center",
    borderWidth:2,
    borderRadius:10,
    padding:50,
    paddingHorizontal:70,
    marginVertical:10
  },

    AddDetailView2:{
    // backgroundColor:"red",
    justifyContent:"center",
    // alignItems:"center",
    borderWidth:2,
    width:300,
    borderRadius:10,
    padding:10,
    paddingHorizontal:10,
    marginVertical:10
  },

   textInput: {
        // flex: 1,
        // marginTop: Platform.OS === 'ios' ? 0 : -12,
        // paddingLeft: 10,
        color: '#05375a',
    },
    search:{
      flex:1,
      width:400,
      marginTop:5,
      // height:800
    },
    itemStyle: {
    padding: 10,
  },
  button1:{
    marginVertical:5,
    paddingVertical:5
    },
    contentheader:{  
    backgroundColor: '#f2f2f2',
    height:60,
    marginTop:5,
    padding:15,
    justifyContent: 'center'

  },
   contenttext:{
      // backgroundColor:'red',
      // width:"50%",
      marginVertical:5,
    fontSize: 16,
    fontWeight: 'bold',
  },
   contenttext2view:{ 
  //  height:40, 
 justifyContent: 'center',
 borderBottomWidth: 1,
  borderColor: '#ECECEC',
  padding:15,
 },
  contenttext2:{   
    fontSize:16,   
    color:'#8c8c8c',
    
  },
  button2:{
  justifyContent:"center",
  alignItems:"center",
},
});
