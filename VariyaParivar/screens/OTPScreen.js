import React, { useState, useRef, useEffect } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { View, Text, Button, StyleSheet,BackHandler, Alert, ScrollView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import PhoneInput from "react-native-phone-input";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import CountDown from 'react-native-countdown-component';
const OTPScreen = ({ route,navigation}) => {

const { username } = route.params;
const { mobileNumber } = route.params;
   const { colors } = useTheme();
   const phoneRef = useRef(undefined);
const [data, setData] = React.useState({
       shouldShowOTP:true,
        showAlert: false ,
        titleMessage:'',
        innerMessage:'',
        alertShow:false,
        alertShow2:false,
        showCancelButton:false,
        showConfirmButton:false,
       shouldShowMobile:false,
    //    username: '',
       otp:'',
       otpMessage:'',
       isValidOTP:true,
    //    mobileNumber:'ss',
    });



  const backAction = () => {
          setData({
                     ...data,
                     shouldShowOTP:false,
                    alertShow2:true,
                    showConfirmButton:true,
                    showCancelButton:true,
                    titleMessage:'Are You Sure?',
                    innerMessage:'If You Go Back, You Need To Register Again!'
                  });

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );


    
  const deleteUser = (navUsername,navMobileNumber) =>{
 var url = `http://192.168.225.234:8085/deleteuser/${navUsername}`;
                       
                                fetch(url, {
                                    method: 'DELETE'
                                })
                                .then((response4) => response4.json())
                                .then((response4Json) => {
                                                                
                                })
                                .catch((error) => {
                                    console.error(error);
                                   
                                });



            
    }


    const resendOTP = (username,mobileNumber) =>{
                                     setData({
                                        ...data,
                                        shouldShowOTP:true,
                                        
                                    }                                  
                                    );


 var url = `http://192.168.225.234:8085/otp/${username}/${mobileNumber}`;
                       
                                fetch(url, {
                                    method: 'PUT'
                                })
                                .then((response3) => response3.json())
                                .then((response3Json) => {
                                      if(response3Json.message == "successful"){
                                        //   hideWithTimer();
                                             setData({
                                        ...data,
                                        shouldShowOTP:true,
                                        isValidOTP:false,
                                        otpMessage:"Successful send OTP!!!",
                                        }                                  
                                        );
                                       
                                    //  console.log("If statment");
                                        }else{
                                        setData({
                                                ...data,
                                                shouldShowOTP:true,
                                                isValidOTP:false,
                                                otpMessage:"OTP does not send due to problem!!",
                                            }                                  
                                            );
                                            //  console.log("else statment");
                                        }
                                    
                                })
                                .catch((error) => {
                                    console.error(error);
                                     setData({
                                        ...data,
                                        isValidOTP:false,
                                        otpMessage:"failed",
                                    }
                                    );
                                });



            
    }

    
    const otpHandle = (username, otp) => {
        if (username.length == 0 ||  data.otp.length == 0  ) {

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
                                                // shouldShowOTP:false,
                                                alertShow:true,
                                                showConfirmButton:true,
                                                // showCancelButton:true,
                                                titleMessage:'Successful!',
                                                innerMessage:'Your OTP Matched Successfully, Your account created!'
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

    
    return (
      <View style={styles.container}>
<StatusBar backgroundColor='#00ace6' barStyle="light-content"/>
<View style={styles.header}>
            <Text style={styles.text_header}>OTP Confirmation!</Text>
        </View>
       <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
        <ScrollView>
{data.shouldShowOTP ? (
        <View style={styles.otppp }>

             <Text style={[styles.text_footer, {
                color: colors.text
            }]}>{"\n"}Enter OTP</Text>
            <View style={styles.action}>
            

                <OTPInputView
          style={styles.otp }
          pinCount={4}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
        //   autoFocusOnLoad
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
            


            {/* <Text>timer</Text> */}
           <CountDown
         until={60+60*60}
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
      />
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {otpHandle( username, data.otp )}}
                    
                   
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
                <TouchableOpacity
                    onPress={() => 
                    {resendOTP(username, mobileNumber)}
                    }
                    style={[styles.signIn, {
                        borderColor: '#00ace6',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#00ace6'
                    }]}>Resend OTP</Text>
                </TouchableOpacity>
            {/* </View> */}
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
              deleteUser(username, mobileNumber),
            navigation.replace('SignInScreen'),
            setData({
                alertShow: false
                });
          }}
        />

      </View>
    );
};



  

export default OTPScreen;
// OTPScreen.propTypes = {
//   data: PropTypes.object,
// }

const styles = StyleSheet.create({
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
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
