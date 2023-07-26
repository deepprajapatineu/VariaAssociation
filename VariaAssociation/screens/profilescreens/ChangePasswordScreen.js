import React,{useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, Picker, TextInput,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import{ AuthContext } from '../../components/context';
  import RNRestart from 'react-native-restart';

const ChangePasswordScreen = ({ navigation,route}) => {
  
    const { signOut, toggleTheme } = React.useContext(AuthContext);
const { username } = route.params;
const { token } = route.params;
const { temp } = route.params;
   const [data, setData] = React.useState({
     
     showNewPassArea:false,
     showOldPassArea:true,
     oldPassword:'',
     newPassword:'',
    alertShow:false,
    titleMessage:'',
    innerMessage:'',
    showCancelButton:true,
    showConfirmButton:false,
    cancelText:"cancel",
   confirmButtonColor:"#DD6B55",
   cancelButtonColor:"#bfbfbf"
    });

const CheckOldPassword = (username,token,oldPassword) =>{
     fetch(`http://192.168.225.234:8085/passwordcheck/${username}/${oldPassword}`)
            .then(response => response.json())
            .then((responseJson)=> {
              
                console.log("yes:-"+responseJson.message)
                if(responseJson.message == "successfull password matched"){
                  setData({
                    ...data,
                      alertShow:true,
                      titleMessage:'Successful!',
                      innerMessage:'Your Password Matched Successfully...',
                      showCancelButton:true,
                      showConfirmButton:false,
                      cancelText:"ok",
                      showOldPassArea:false,
                      showNewPassArea:true,
                      cancelButtonColor:"#DD6B55"
                  })
                }else{
                  setData({
                    ...data,
                      alertShow:true,
                      titleMessage:'Failed!',
                      innerMessage:'Please Enter Valid Password...',
                      showCancelButton:true,
                      showConfirmButton:false,
                  })
                }
                   
            })
            .catch(error=>console.log("Error he:-"+ error)) 
}

const EnterNewPassword = (username, token, newPassword) => {
       fetch(`http://192.168.225.234:8085/forgotPassword/${username}/${newPassword}`)
            .then(response => response.json())
            .then((responseJson)=> {
              
                console.log("yes:-"+responseJson.message)
                if(responseJson.message == "successful"){
                  setData({
                    ...data,
                      alertShow:true,
                      titleMessage:'Successful!',
                      innerMessage:'Your Password Updated...',
                      showCancelButton:false,
                      showConfirmButton:true,
                  })
                }else{
                  setData({
                    ...data,
                      alertShow:true,
                      titleMessage:'Failed!',
                      innerMessage:'Something Wrong! Please Try Again...',
                      showCancelButton:true,
                      showConfirmButton:false,
                  })
                }
                   
            })
            .catch(error=>console.log("Error he:-"+ error)) 
}


    return (
      <View style={styles.container}>
            {data.showOldPassArea ? (

                    <View style={{width:"100%",height:"100%",justifyContent:"center", alignItems:"center"}}> 

                <View style={styles.input}> 
                    <Text style={{fontSize:16, fontWeight:"bold"}}>Enter Old Password</Text>
                    <TextInput
                    placeholder="Type Here"
                    style={{borderBottomWidth:1, width:"90%"}}
                       onChangeText={(val) => 
                              setData({
                              ...data,
                                oldPassword:val,
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
                           
                                CheckOldPassword( username, token,  data.oldPassword)     
                            }}
                            style={styles.inputButton}
                        >
                         <Text style={{color:"white", fontWeight:"bold"}}>Ok</Text></TouchableOpacity>
                         </View>

                          </View>
                          
            </View>
 ) : null}

            {data.showNewPassArea ? (
                  <View style={{width:"100%",height:"100%",justifyContent:"center", alignItems:"center"}}> 

                <View style={styles.input}> 
                    <Text style={{fontSize:16, fontWeight:"bold"}}>Enter New Password</Text>
                    <TextInput
                    placeholder="Type Here"
                    style={{borderBottomWidth:1, width:"90%"}}
                       onChangeText={(val) => 
                              setData({
                              ...data,
                                newPassword:val,
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
                           
                                EnterNewPassword( username, token, data.newPassword)     
                            }}
                            style={styles.inputButton}
                        >
                         <Text style={{color:"white", fontWeight:"bold"}}>Ok</Text></TouchableOpacity>
                         </View>

                          </View>

                          
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
          cancelText={data.cancelText}
          confirmText="Ok"
          confirmButtonColor={data.confirmButtonColor}
          cancelButtonColor={data.cancelButtonColor}
          onCancelPressed={() => {
            
            setData({
                ...data,
                alertShow: false
                });
          }}
          onConfirmPressed={() => {      
            signOut()                   
            setData({
                ...data,
                alertShow: false
                });
            
          }}
        />
 
      </View>


    );
};

export default ChangePasswordScreen;

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
