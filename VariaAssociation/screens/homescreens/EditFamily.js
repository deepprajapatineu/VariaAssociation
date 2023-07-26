import React,{useEffect,useState} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,Image,TouchableOpacity, FlatList, Picker, ScrollView, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
   Avatar,
    List
} from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import ImagePicker from 'react-native-image-crop-picker';

const EditFamily = ({navigation,route}) => {

  const [adminVillage, setAdminVillage] = useState('');
  const [adminTalukaName, setAdminTalukaName] = useState('');
  const [adminDistrict, setAdminDistrict] = useState('');
  const [father, setFather] = useState('');

   const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search1, setSearch1] = useState('');
  const [filteredDataSource1, setFilteredDataSource1] = useState([]);
  const [masterDataSource1, setMasterDataSource1] = useState([]);
    const [image, setImage] = useState(null);

const [data, setData] = React.useState({
     userId:'',
     username:'',
     showSearch:true,
     showDetail:false,  
     showInput:false,
     showFatherSearch:false,
     showFatherSearch1:false,
     name:'',
     mobileNumber:'',
     village:'',
     talukaName:'',
     district:'',
     children:'',
     gender:'',
      partner:'Single',
      role:'',
      father:'',
      temp:'',
      input:'', 
      profilePic:'',
    alertShow:false,
    alertShow2:false,
    titleMessage:'',
    innerMessage:'',
    showCancelButton:true,
    showConfirmButton:false,
    });

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

  const searchFilterFunction1 = (text) => {
    
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      //------------------------------------
        // fetch(`http://192.168.225.234:8085/familypersondetailbyname/${text}`)
        if(data.role == 'ROLE_SUPERADMIN'){
        var url = `http://192.168.225.234:8085/familypersondetailbyname/${text}`
        }else{
        var url = `http://192.168.225.234:8085/personalfamily3/${text}/${adminVillage}/${adminTalukaName}/${adminDistrict}`
        }


        fetch(url)
        
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource1(responseJson);
        setMasterDataSource1(responseJson);
        // console.log("pic:-"+responseJson);

      })
      .catch((error) => {
        console.error(error);
      });
      //------------------------------------
      const newData = masterDataSource1.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
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

     const ItemView1 = ({ item }) => {
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
      onPress={() => getItem1(item)}
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
                  if(!(item.partner1 == undefined)){
                    console.log("yes")
                     setData({
                    ...data,  
                    userId:item.id,
                    name:item.name,
                    mobileNumber:item.mobileNumber,
                    gender:item.gender,
                    username:item.username,
                    village:item.village,
                    talukaName:item.talukaName,
                    district:item.district,       
                    partner:item.partner1[0].name,
                    showDetail:true,
                    profilePic:item.profilePic,           

                  })
                  }
                  else{
                      setData({
                    ...data,  
                    userId:item.id,
                    name:item.name,
                    mobileNumber:item.mobileNumber,
                    gender:item.gender,
                    username:item.username,
                    village:item.village,
                    talukaName:item.talukaName,
                    district:item.district,       
                    partner:'Single',
                    showDetail:true,   
                    profilePic:item.profilePic,        

                  })
                  }
                  setFilteredDataSource([]);
                    getItem2(item)

  };


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

body.append('file', {uri: image.path,name: data.userId+'.png',filename :'imageName.png',type: 'image/png'});
    body.append('Id', data.userId);

    body.append('Content-Type', 'image/png');

fetch(url4,{ method: 'POST',headers:{  
     "Content-Type": "multipart/form-data",
     "otherHeader": "foo",
     } , body :body} )
     .then((response) => {
               return response.text();
          })
  .then((res) => {
    
     setData({
       ...data,
       profilePic:res,
     });
  
  })
  .catch((e) => console.log(e))
  .done()
    });
  }


  const getItem2 = (item) => {
   var url2 = `http://192.168.225.234:8085/getparentId/${item.id}`
   fetch(url2)
        
      .then((response) => response.json())
      .then((responseJson) => {
           
                  setFather(responseJson.name)



      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitNewValue = (id, input, temp) => {
    if(input == ''){
        setData({
                   ...data,
                  alertShow:true,
                  titleMessage:'Faild!!',
                  innerMessage:'Please Enter Data',
                  showCancelButton:true,
                  showConfirmButton:false,                                                            
                })
    }
    else{
    if(temp == "name"){

                 fetch("http://192.168.225.234:8085/editfamily", {

                         
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                    "id": id,
                                                                    "name": input 
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

    }else if (temp == 'mobile'){

         fetch("http://192.168.225.234:8085/editfamily", {

                         
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                    "id": id,
                                                                    "mobileNumber": input 
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

console.log(id+temp+name);
    }else{

    }
    }
  }

  const getItem1 = (item) => {
    console.log("Name:-"+item.name)
       var url2 = `http://192.168.225.234:8085/editfamilyfather/${data.userId}/${item.id}`
   fetch(url2 )
        
      .then((response) => response.json())
      .then((responseJson) => {
            var result = responseJson.message;
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
      .catch((error) => {
        console.error(error);
      });
  }


  const deleteUser = (userId) =>{
       var url3 = `http://192.168.225.234:8085/deletefamilymember/${userId}`
   fetch(url3, { method: 'DELETE' })
        
      .then((response) => response.json())
      .then((responseJson) => {
            var result = responseJson.message;
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
      .catch((error) => {
        console.error(error);
      });
  
  }


    return (
      <View style={styles.container}>

{data.showFatherSearch ? (
              <View style={{width:"100%",height:"100%", alignItems:"center"}}> 
                <View style={styles.searchview}> 
                 <View style={{marginVertical:10, justifyContent:"center",}}>
                      <View style={styles.contentheader}>
                          
                        <Text style={styles.contenttext}>Enter father's New Detail</Text>
                      
                      </View>
                      </View>
 
            <SearchBar
              round
              searchIcon={{ size: 24 }}
              autoFocus = {true}
              onChangeText={(text) => searchFilterFunction1(text)}
              onClear={(text) => setFilteredDataSource1([])}
              placeholder="Search Person..."
              value={search1}
            />
            <FlatList
              data={filteredDataSource1}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView1}
            />
            </View>
              </View>
              
              ) : null}

           {data.showInput ? (
              <View style={{width:"100%",height:"100%",justifyContent:"center", alignItems:"center"}}> 

                <View style={styles.input}> 
                    <Text style={{fontSize:16, fontWeight:"bold"}}>Enter New Value</Text>
                    <TextInput
                    placeholder="Type Here"
                    style={{borderBottomWidth:1, width:"90%"}}
                       onChangeText={(val) => 
                              setData({
                              ...data,
                                input:val,
                              })
                               }
                    />
                   <View style={{flexDirection:"row"}}>
                  <TouchableOpacity 
                            onPress={() => {
                                  setData({
                                    ...data,
                                    showInput:false
                                  })
                            }}
                            style={styles.inputButton}
                        >
                         <Text style={{color:"white", fontWeight:"bold"}}>Back</Text></TouchableOpacity>

                         <TouchableOpacity 
                            onPress={() => {
                                 submitNewValue(data.userId,data.input,data.temp)
                            }}
                            style={styles.inputButton}
                        >
                         <Text style={{color:"white", fontWeight:"bold"}}>Ok</Text></TouchableOpacity>
                         </View>

                          </View>
            </View>
              ) : null}

               {data.showSearch ? (
              <View style={styles.searchview}> 
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
<ScrollView style={{ }}>
{data.showDetail ? (
  <View style={styles.AddDetailView2}>
                   {/* <Text style={styles.buttonText}>SHOW MEMBER</Text> */}
                <View style={{width:"100%" }}>


                <View style={styles.button2}>
                    <Avatar.Image
                            source={{ uri: `${data.profilePic}` }}
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
                          
                        <Text style={styles.contenttext}>Name</Text>
                        <TouchableOpacity style={styles.icon} 
                            onPress={() => {
                                  setData({
                                    ...data,
                                    showInput:true,
                                    temp:'name'
                                  })
                            }}
                        >
                        <List.Icon icon="square-edit-outline" /></TouchableOpacity>
                      </View>
                      <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{data.name} </Text>
                      </View>
                      <View style={styles.contentheader}>
                          
                        <Text style={styles.contenttext}>Mobile Number</Text>
                        <TouchableOpacity style={styles.icon}
                         onPress={() => {
                                  setData({
                                    ...data,
                                    showInput:true,
                                    temp:'mobile'
                                  })
                            }}
                        ><List.Icon icon="square-edit-outline" /></TouchableOpacity>

                      
                      </View>
                      <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{data.mobileNumber} </Text>
                      </View>

                      <View style={styles.contentheader}>
                          
                        <Text style={styles.contenttext}>Father Detail</Text>
                        <TouchableOpacity style={styles.icon}
                         onPress={() => {
                                  setData({
                                    ...data,
                                    showFatherSearch:true,
                                    showFatherSearch1:true,
                                  })
                            }}
                            ><List.Icon icon="square-edit-outline" /></TouchableOpacity>

                      
                      </View>
                      <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{father} </Text>
                      </View>

                      

                      <View style={styles.contentheader}>
                          
                        <Text style={styles.contenttext}>Village</Text>
                      
                      </View>
                      <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{data.village} </Text>
                      </View>

                      <View style={styles.contentheader}>
                          
                        <Text style={styles.contenttext}>Sub District</Text>
                      
                      </View>
                      <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{data.talukaName} </Text>
                      </View>

                      <View style={styles.contentheader}>
                          
                        <Text style={styles.contenttext}>District</Text>
                      
                      </View>
                      <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{data.district} </Text>
                      </View>

                      <View style={styles.contentheader}>
                          
                        <Text style={styles.contenttext}>User Name</Text>
                      
                      </View>
                      <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{data.username} </Text>
                      </View>

                      <View style={styles.contentheader}>
                          
                        <Text style={styles.contenttext}>Partner</Text>
                      
                      </View>
                      <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{data.partner} </Text>
                      </View>

                      <TouchableOpacity style={styles.delete}
                      onPress={() => {

                          setData({
                              ...data,
                              alertShow2:true,
                              titleMessage:'Warning!!',
                              innerMessage:'Are You Sure, You Want To delete This Member',
                              showCancelButton:true,
                              showConfirmButton:true,                                                            
                            })
                                
                            }}
                            >
                      <Text style={{color:"white", fontSize:16, fontWeight:"bold"}}>Delete User</Text>
                      </TouchableOpacity>

                      

                      </View>
                      </View>
 ) : null}
</ScrollView>
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
            setData({
                ...data,
                alertShow: false
                });
            navigation.goBack()   
          }}
        />

        <AwesomeAlert
          show={data.alertShow2}
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
                alertShow2: false
                });
          }}
          onConfirmPressed={() => {  
             deleteUser(data.userId)                           
            setData({
                ...data,
                alertShow2: false
                });
            navigation.goBack()   
          }}
        />

      </View>
    );
};

export default EditFamily;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    // justifyContent: 'center',  
    width:"100%"
  },
itemStyle: {
    padding: 10,
  },
  searchview:{
    width:"100%",
    padding:5,
  },

      AddDetailView2:{
    // backgroundColor:"red",
    justifyContent:"center",
    alignItems:"center",
    borderWidth:2,
    width:350,
    borderRadius:10,
    padding:10,
    paddingHorizontal:10,
    marginVertical:10
  },
      contentheader:{  
    backgroundColor: '#f2f2f2',
    height:60,
    marginTop:5,
    padding:15,
    // justifyContent: 'center',
    flexDirection:"row"

  },
   contenttext:{
      // backgroundColor:'red',
      // width:"50%",
      marginVertical:5,
    fontSize: 17,
    fontWeight: 'bold',
  },
  icon:{
    // backgroundColor:"red",
    // justifyContent: 'center',
    // alignItems:"center",
    position: 'absolute',
    right:0
    
  },
   contenttext2view:{ 
   height:40, 
 justifyContent: 'center',
 borderBottomWidth: 1,
  borderColor: '#ECECEC',
  padding:15,
 },
  contenttext2:{   
    fontSize:16,   
    color:'#8c8c8c',
    
  },
  delete:{
    // width:"100%",
    // height:50,
    backgroundColor:"#DD6B55",
    justifyContent:"center",
    alignItems:"center",
    padding:10,
    marginTop:10,
    borderRadius:10,
  },

  input:{
    // flex:1,
     padding:10,
     justifyContent:"center",
      alignItems:"center",
       width:"80%", 
       borderWidth:2,
       borderRadius:5,
  },

inputButton:{
  margin:10,
  marginTop:20,
  padding:5,
  paddingHorizontal:15,
  backgroundColor:"#00ace6",
  borderRadius:5
},
button2:{
  justifyContent:"center",
  alignItems:"center",
},
});
