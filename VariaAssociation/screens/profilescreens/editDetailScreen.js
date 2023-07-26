import React,{useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, Picker, TextInput,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import{ AuthContext } from '../../components/context';
  import RNRestart from 'react-native-restart';

const editDetailScreen = ({ navigation,route}) => {
    const { signOut, toggleTheme } = React.useContext(AuthContext);
const { username } = route.params;
const { token } = route.params;
const { temp } = route.params;
const { selectedValue } = route.params;
   const [data, setData] = React.useState({
    //  username:'',
     newFirstName:'',
     newMiddleName:'',
     newLastName:'',
     newVillageName:'',
     showInputArea:true,
     selectedValue:'',
     newName:'',
    edit:'',
    token:'',
    alertShow:false,
    titleMessage:'',
    innerMessage:'',
    showCancelButton:true,
    showConfirmButton:false,
    });

//     useEffect(() => {
//   AsyncStorage.multiGet(["userName","temptoken"]).then(response => {
//             // console.log(response[0][0]) // Key1
//             // console.log(response[0][1]) // Value1
//              Promise.all([  setData({
           
//                   username:response[0][1],
//                   token:response[1][1],
//                   showInputArea:false,
//                   alertShow:false,
//                   titleMessage:'',
//                   innerMessage:'',
//                   showCancelButton:true,
//                   showConfirmButton:false,
               

                 
//             })
//              ]);
//         })
// }, [])
  // const [selectedValue, setSelectedValue] = useState("");
  // const [showInputArea, showInputArea] = useState(true);

  // const cheker = () =>{

  //   if ( data.itemValue == "none"){
  //      setData({           
  //                 showInputArea:false,
  //           })
  //   }else{
  //     setData({           
  //                 showInputArea:true,
  //           })
  //   }
  // }
  const updateDetail = (username, newName, selectedValue, token) =>{

    if (selectedValue == "FirstName"){
             fetch("http://192.168.225.234:8085/UpdateDetail", {
                                                        method: "POST",
                                                        headers: {
                                                          'Authorization': 'Bearer ' + token,
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                    "username": username,
                                                                    "firstName": newName 
                                                        })
                                                        })
                                                        .then((response) => response.json())

                                                        .then( (response2)=>{
                                                          console.log(response2.message)
                                                          var result = response2.message;
                                                          if(result == "successfull "){
                                                            AsyncStorage.setItem(`${temp}`,data.newName);
                                                            RNRestart.Restart();
                                                            //  setData({
                                                            //           ...data,
                                                            //           alertShow:true,
                                                            //           titleMessage:'successfull',
                                                            //           innerMessage:'Now You Need To Login Again...',
                                                            //           showCancelButton:true,
                                                            //           showConfirmButton:true,
                                                            //       })
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
    
  }else if(selectedValue == "MiddleName"){
    fetch("http://192.168.225.234:8085/UpdateDetail", {
                                                        method: "POST",
                                                        headers: {
                                                          'Authorization': 'Bearer ' + token,
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                    "username": username,
                                                                    "middleName": newName 
                                                        })
                                                        })
                                                        .then((response) => response.json())

                                                        .then( (response2)=>{
                                                          console.log(response2.message)
                                                          var result = response2.message;
                                                          if(result == "successfull "){
                                                            AsyncStorage.setItem(`${temp}`,data.newName);
                                                            RNRestart.Restart();
                                                            //  setData({
                                                            //           ...data,
                                                            //           alertShow:true,
                                                            //           titleMessage:'successfull',
                                                            //           innerMessage:'Now You Need To Login Again...',
                                                            //           showCancelButton:true,
                                                            //           showConfirmButton:true,
                                                            //       })
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

  } else if(selectedValue == "LastName"){
    fetch("http://192.168.225.234:8085/UpdateDetail", {
                                                        method: "POST",
                                                        headers: {
                                                          'Authorization': 'Bearer ' + token,
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                    "username": username,
                                                                    "lastName": newName 
                                                        })
                                                        })
                                                        .then((response) => response.json())

                                                        .then( (response2)=>{
                                                          console.log(response2.message)
                                                          var result = response2.message;
                                                          if(result == "successfull "){
                                                            AsyncStorage.setItem(`${temp}`,data.newName);
                                                            RNRestart.Restart();
                                                            //  setData({
                                                            //           ...data,
                                                            //           alertShow:true,
                                                            //           titleMessage:'successfull',
                                                            //           innerMessage:'Now You Need To Login Again...',
                                                            //           showCancelButton:true,
                                                            //           showConfirmButton:true,
                                                            //       })
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

  } else if(selectedValue == "Village"){
    fetch("http://192.168.225.234:8085/UpdateDetail", {
                                                        method: "POST",
                                                        headers: {
                                                          'Authorization': 'Bearer ' + token,
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                    "username": username,
                                                                    "village": newName 
                                                        })
                                                        })
                                                        .then((response) => response.json())

                                                        .then( (response2)=>{
                                                          console.log(response2.message)
                                                          var result = response2.message;
                                                          if(result == "successfull "){
                                                            AsyncStorage.setItem(`${temp}`,data.newName);
                                                          RNRestart.Restart();
                                                            //  setData({
                                                            //           ...data,
                                                            //           alertShow:true,
                                                            //           titleMessage:'successfull',
                                                            //           innerMessage:'Now You Need To Login Again...',
                                                            //           showCancelButton:false,
                                                            //           showConfirmButton:true,
                                                            //       })
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
                                     titleMessage:'Failed',
                                     innerMessage:'Please Select Properly',
                                     showCancelButton:true,
                                     showConfirmButton:false,
                                                                  })
                                                          
  }}

    return (
      <View style={styles.container}>

                    <View style={{width:"100%",height:"100%",justifyContent:"center", alignItems:"center"}}> 

                <View style={styles.input}> 
                    <Text style={{fontSize:16, fontWeight:"bold"}}>Enter New {selectedValue}</Text>
                    <TextInput
                    placeholder="Type Here"
                    style={{borderBottomWidth:1, width:"90%"}}
                       onChangeText={(val) => 
                              setData({
                              ...data,
                                newName:val,
                              })
                               }
                    />
                   <View style={{flexDirection:"row"}}>
                  <TouchableOpacity 
                            onPress={() => {
                                 navigation.goBack()
                            }}
                            style={styles.inputButton}
                        >
                         <Text style={{color:"white", fontWeight:"bold"}}>Back</Text></TouchableOpacity>

                         <TouchableOpacity 
                            onPress={() => {
                                //  submitNewValue(data.userId,data.input,data.temp)
                                updateDetail( username, data.newName, selectedValue,token )     
                            }}
                            style={styles.inputButton}
                        >
                         <Text style={{color:"white", fontWeight:"bold"}}>Ok</Text></TouchableOpacity>
                         </View>

                          </View>
            </View>

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
            //  AsyncStorage.removeItem('dpuri2');
  AsyncStorage.setItem(`${temp}`,data.newName);
            // navigation.goBack()
            // navigation.navigate("Home")
                                                       
            setData({
                ...data,

                alertShow: false
                });
  RNRestart.Restart();

             
          }}
        />
 
      </View>
            
      // <View style={styles.container}>
      // <View style={styles.contentheader}>
             
      //     <Text style={styles.contenttext}>Select the change you want </Text>
         
      //   </View>
         
      //   <View style={styles.pickercontainer}>
      //         <Picker
      //       selectedValue={data.selectedValue}
      //       // style={{ height: 50, width: 200, backgroundColor:'#a6a6a6'}}
      //       style={styles.picker}
      //       onValueChange={(itemValue, itemIndex) => 
      //       setData({           
      //             selectedValue:itemValue,
      //       })}
      //     >
      //       <Picker.Item label="Please Select" value="none" />
      //       <Picker.Item label="First Name" value="firstName" />
      //       <Picker.Item label="Middle Name" value="middleName" />
      //       <Picker.Item label="Last Name" value="lastName" />
      //       <Picker.Item label="Village Name" value="village" />
      //     </Picker>
      //     {/* <Text>{selectedValue}</Text> */}
          

      //   </View>
      //        {/* {data.showInputArea ? ( */}
      //          <View style={styles.inputViewmain}>
      //          <View style={styles.inputView}>
      //             <TextInput
      //                   placeholder="Enter New Name"
      //               placeholderTextColor="#666666"
                    
      //               // style={}
      //               autoCapitalize="words"
      //             onChangeText={(val) =>
      //                  setData({
      //                   ...data,
      //                   newName: val,
      //               })}
      //               />
      //          </View>
               
      //             <View style={styles.button}>
      //           <TouchableOpacity
      //               style={styles.signIn}
      //               onPress={() => {updateDetail( username, data.newName, data.selectedValue,token )}}                   
      //           >
      //           <LinearGradient
      //               colors={['#33ccff', '#00ace6']}
      //               style={styles.signIn}
      //           >
      //               <Text style={[styles.textSign, {
      //                   color:'#fff'
      //               }]}>Submit</Text>
      //           </LinearGradient>
      //             </TouchableOpacity>
      //          </View> 
      //          </View>
               
        //  {/* ) : null} */}
            //  {/* <Text>{data.selectedValue}</Text>
            //  <Text>{username}</Text>
            //  <Text>{data.newName}</Text>
            //  <Text>{token}</Text> */}

    );
};

export default editDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    // justifyContent: 'center'
    
  },
  pickercontainer:{
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor:'#00ace6',
    // borderWidth:4,
    // borderColor:'#a6a6a6',
    borderRadius:10,
    width:"95%"
  },
  picker:{
    width:200,
    height:50,
  },
   contentheader:{
  width:"95%",
    backgroundColor: '#00ace6',
    height:60,
    marginTop:10,
    marginBottom:10,
    padding:15,
    justifyContent: 'center',
      alignItems: 'center', 
      borderRadius:10,
      

  },  contenttext:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputView:{
    // backgroundColor:'red',
    marginVertical:10,
    width:"100%",
    borderWidth:1,
    // borderColor:'#808080',
    borderRadius:10,
  },
  inputViewmain:{
    // backgroundColor:'red',
    width:"95%",
    // justifyContent: 'center',
      // alignItems: 'center', 
  },
    button: {
        alignItems: 'center',
        marginTop: 5
    }, 
    signIn: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // marginTop:10,
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
});
