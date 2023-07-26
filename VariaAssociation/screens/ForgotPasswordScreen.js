import React, { useState, useRef, useEffect } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { View, Text, Button, StyleSheet,BackHandler, Alert, ScrollView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import PhoneInput from "react-native-phone-input";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import CountDown from 'react-native-countdown-component';
import AsyncStorage from '@react-native-community/async-storage';
const ForgotPasswordScreen = ({ route,navigation}) => {

const { colors } = useTheme();
const [data, setData] = React.useState({
      
       mobileNumber:'',
       username: '', 
       alertShow:'',   
       alertShow2:'',
       innerMessage:'',
       shouldShowOTP:true,
       shouldShowOTPCheker:false,
       showConfirmButton:false,
       showCancelButton:false,
       titleMessage:'',
       innerMessage:'',
       isValidUser:true,
       userNameMsg:'',
       otp:'',
       otpMessage:'',
       isValidOTP:false,
       shouldResetPassword:false,
       isValidPassword:true,
       newPassword:'',
       confirmPassword: '',
       isValidConfirmPassword: true,
       secureTextEntry:true,
       confirmPasswordMessage:'Confirm Password And Password are not same.',
    });

    const [navUsername, setNavUsername] = useState('');
    const [navMobileNumber, setNavMobileNumber] = useState('');

  const backAction = () => {
      
          setData({
                     ...data,
                     shouldShowOTP:false,
                    alertShow3:true,
                    showConfirmButton:true,
                    showCancelButton:true,
                    titleMessage:'Are You Sure?',
                    innerMessage:'If You Go Back, You Need To Do Whole Process Again!',
                    
                  });

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

  const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const forgotPassword = (navUsername,newPassword,confirmPassword) => {
        if (newPassword == confirmPassword)
        {
            console.log("Matched!!!");

                    var url4 = `http://192.168.225.234:8085/forgotPassword/${navUsername}/${newPassword}`;
                       
                                fetch(url4, {
                                    method: 'GET'
                                })
                                .then((response4) => response4.json())
                                .then((response4Json) => {
                                  
                                    console.log(response4Json);

                                         if(response4Json.message == "successful"){
                                      
                                      setData({
                                                ...data,
                                                alertShow3:true,
                                                showConfirmButton:true,
                                                titleMessage:'Successful!',
                                                innerMessage:'Your OTP Matched Successfully, Your Passwod Reset!'
                                            });
                                        }else{
                                        setData({
                                                ...data,
                                                isValidConfirmPassword:false,
                                                confirmPasswordMessage:"There Is Some Problem!! Please Try Again.",
                                            }                                  
                                            );
                                        }

                                     }).catch((error) => {
                                                        setData({
                                                                ...data,
                                                                isValidConfirmPassword:false,
                                                                confirmPasswordMessage:"There Is Some Problem!! Please Try Again.",
                                                            }                                  
                                                            );
                                                        });
        }else{
                        setData({
                             ...data,
                            isValidConfirmPassword:false,
                           confirmPasswordMessage:'Confirm Password And Password are not same.',
                            });

        }
    }
    
    const otpCheck = (username, otp) => {
        var e = '';
        if (username.length == e ||  data.otp.length == e  ) {

            setData({
                     ...data,
                     otpMessage:"Please Enter OTP",
                     isValidOTP:false
                         
                });

    }else{
                 var url = `http://192.168.225.234:8085/otpcheck/${username}/${otp}`;
                       
                                fetch(url, {
                                    method: 'GET'
                                })
                                .then((response2) => response2.json())
                                .then((response2Json) => {
                                    console.log(response2Json);

                                         if(response2Json.message == "successfull OTP matched"){
                                      setData({
                                                ...data,
                                                alertShow2:true,
                                                showConfirmButton:true,
                                                showCancelButton:true,
                                                titleMessage:'Successful!',
                                                innerMessage:'Your OTP Matched Successfully, Now You Enter Your New Password'
                                            });
                                        }else{
                                        setData({
                                                ...data,
                                                isValidOTP:false,
                                                otpMessage:"OTP does not Matched!!",
                                            }                                  
                                            );
                                        }

                                     })
    }
    }


    
    const otpHandle = (username) => {
                    if (username.length == 0 ) {
// console.log("Your username is not define");
            setData({
                     ...data,
                     userNameMsg:"Please Enter OTP",
                     isValidUser:false
                         
                });

    }else{
                 var url = `http://192.168.225.234:8085/getallmyuserdetail/${username}`;
                       setNavUsername(data.username);
                                fetch(url, {
                                    method: 'GET'
                                })
                                .then((response2) => response2.json())
                                .then((response2Json) => {
                                    
                                    // console.log(response2Json.mobileNumber);

                                     

                                    
                                    // console.log("save username:"+ navUsername); 
                                    var number = response2Json.mobileNumber;
                                   
                                    setNavMobileNumber(response2Json.mobileNumber);
                                    // console.log("save phone:"+ ); 


                                                            //This is for send otp
                                                                                                                        
                                                            var url2 = `http://192.168.225.234:8085/otp/${navUsername}/${navMobileNumber}`;
                                                                                
                                                                                            fetch(url2, {
                                                                                                method: 'PUT'
                                                                                            })
                                                                                            .then((response3) => response3.json())
                                                                                            .then((response3Json) => {
                                                                                            

                                                                                                if(response3Json.message == "successful"){
                                                                                                    

                                                                                                     setData({
                                                                                                        ...data,
                                                                                                        shouldShowOTP:false,
                                                                                                        isValidUser:true,
                                                                                                        alertShow:true,
                                                                                                        showConfirmButton:true,
                                                                                                        // showCancelButton:true,
                                                                                                        titleMessage:'Succesful',
                                                                                                        innerMessage:'We send OTP In Your Mobile Number, Please Confirm OTP!',
                                                                                                            
                                                                                                    });  
                                                                                                                                                                                                    
                                                                                                 console.log("If statment");
                                                                                                    }else{
                                                                                                   
                                                                                                         console.log("else statment");
                                                                                                    }
                                                                                                
                                                                                            })
                                                                                            .catch((error) => {
                                                                                                console.console("Error in sending otp:-"+error);
                                                                                            });
                                                    


                                     }) .catch((error) => {
                                    // console.log("Error he:"+error);     

                                     setData({
                                            ...data,
                                            shouldShowOTP:false,
                                            isValidUser:true,
                                            alertShow:true,
                                            // showConfirmButton:true,
                                            showCancelButton:true,
                                            titleMessage:'Failed!!',
                                            innerMessage:'Please Enter Valid Username!',
                                            
                                                
                                        });                                
                                   
                                });
    }
    }


    
    return (
      <View style={styles.container}>
<StatusBar backgroundColor='#00ace6' barStyle="light-content"/>
<View style={styles.header}>
            <Text style={styles.text_header}>Forgot Password!</Text>
            
        </View>
       <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
        <ScrollView>
    {data.shouldShowOTP ? (

        <View>
<Text style={[styles.text_footer, {
                color: colors.text
            }]}>{"\n"}Enter Your User Name</Text>
            
            <View style={styles.action}>
            
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your UserName"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                  onChangeText={(val) =>
                       setData({
                        ...data,
                        username: val,
                    })}

        

                    // onEndEditing={(e)=>
                    
                    // handleValidUser(e.nativeEvent.text)}
                />
                
                </View>
                
                    { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{data.userNameMsg}</Text>
            </Animatable.View>
            }
            <View style={styles.button2}>
<TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {
                           
                        otpHandle(data.username)}}
                >
                <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Submit</Text>
                </LinearGradient>
                </TouchableOpacity>
                </View>
                </View>
                ) : null}

                {data.shouldShowOTPCheker ? (                    
                <View>
                {/* <Text>hiiis</Text> */}

                 <Text style={[styles.text_footer, {
                color: colors.text
            }]}>{"\n"}Enter OTP</Text>
            <View style={styles.action}>
            

                <OTPInputView
          style={styles.otp }
          pinCount={4}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled = {(code => {
              setData({
                            ...data,
                            otp:code,
                            // otpMessage:code
                        })
            //   console.log(`Code is ${code}, you are good to go!`)
          })}
          // placeholderCharacter={'*'}
          // placeholderTextColor={'red'}
          selectionColor={"#00ace6"}
        />

                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidOTP ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{data.otpMessage}</Text>
            </Animatable.View>
            }
            


            
           {/* <CountDown
        until={60 * 2 + 30}
        // until={60 * 10 + 30}
        // until={ 10}
        size={20}
        onFinish={() => {
                    // alert('Finished')
                        setData({
                                ...data,
                                shouldShowOTP:false,
                        });
                    }
                }
        style={styles.counter}
        digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#00ace6'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'MM', s: 'SS'}}
      /> */}
            {/* <Button title="CLICK HERE TO SHOW ALERT WITH 5 SECONDS OF DELAY" onPress={ShowAlertWithDelay()} /> */}
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {otpCheck( navUsername, data.otp )}}
                    
                   
                >
                <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Confirm OTP</Text>
                </LinearGradient>
                </TouchableOpacity>
</View> 


                </View>
                ) : null}

{/* //This is password Reset Screen */}
        {data.shouldResetPassword ? (

        <View>
            
            <Text style={[styles.text_footer, {
                color: colors.text,
                // marginTop: 35
            }]}>{"\n"}New Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) =>
                       setData({
                        ...data,
                        newPassword: val,
                    })}
                    // onEndEditing={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }


            <Text style={[styles.text_footer, {
                color: colors.text,
                // marginTop: 35
            }]}>{"\n"}Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Conform Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    // onChangeText={(val2) => handleConfirmPasswordChange(val2)}
                    onChangeText={(val2) => setData({
                            ...data,
                            confirmPassword: val2,
                            isValidConfirmPassword: true
                        })}
                    
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidConfirmPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{data.confirmPasswordMessage}</Text>
            </Animatable.View>
            }


            <View style={styles.button2}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {
                           
                        forgotPassword(navUsername,data.newPassword,data.confirmPassword)}}
                >
                <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Save New Password</Text>
                </LinearGradient>
                </TouchableOpacity>
                </View>


        </View>
                ) : null}
            </ScrollView>
        </Animatable.View>
      
        



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
           
            setData({
                alertShow: false,
                shouldShowOTP:true,
                });
          }}
          onConfirmPressed={() => {
           
            setData({
                shouldShowOTPCheker:true,
                alertShow: false,
                // otpMessage:'gggg',
                });
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
           
            setData({
                alertShow: false
                });
          }}
          onConfirmPressed={() => {
            //   deleteUser(username, mobileNumber),
            // navigation.replace('SignInScreen'),
            setData({
                shouldResetPassword:true,
                alertShow: false
                });
          }}
        />

        <AwesomeAlert
          show={data.alertShow3}
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
           
            setData({
                shouldShowOTP:true,
                alertShow: false
                });
          }}
          onConfirmPressed={() => {
            //   deleteUser(username, mobileNumber),
            navigation.replace('SignInScreen'),
            setData({
                
                alertShow: false
                });
          }}
        />

      </View>
    );
};



  

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     alignItems: 'center', 
//     justifyContent: 'center'
//   }, 
button2: {
        alignItems: 'center',
        marginTop: 20
    },
counter:{
    // height: 150,
    // borderWidth: 2,
},
  otp:{
    width: '80%',
    height: 50,
    alignItems: 'center', 
    justifyContent: 'center',
    marginHorizontal: '10%',
    // borderWidth: 2,
},

otppp:{
//  backgroundColor: 'red'
},
  
  borderStyleHighLighted: {
    borderColor: "#00ace6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
     color:'#00ace6',  
  },

  underlineStyleHighLighted: {
    borderColor: "#00ace6",
  },

     phoneInput: {
     borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
     paddingVertical: 20
  },
  container: {
      flex: 1, 
      backgroundColor: '#00ace6'
    },
    header: {
        // flex: 1,
        // justifyContent: 'flex-end',
        paddingVertical:40,
        paddingHorizontal: 20,
        // paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        marginTop:10,
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // marginTop:10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
