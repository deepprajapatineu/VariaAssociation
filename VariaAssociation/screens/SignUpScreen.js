








//-----------------------------------------------------------------------------------------------------------------------------------


import React, { useState, useRef } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    ScrollView ,
    FlatList
    
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import PhoneInput from "react-native-phone-input";
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AwesomeAlert from 'react-native-awesome-alerts';

import { useTheme } from 'react-native-paper';
import { AuthContext } from '../components/context';

import AsyncStorage from '@react-native-community/async-storage';
const village = require('./homescreens/village.json');

const SignUpScreen = ({route,navigation},{props}) => {
const phoneRef = useRef(undefined);


    const [data, setData] = React.useState({
       containerStyle:styles.container,
        value:'',
        username: '',
        password: '',
        firstName: '',
        middleName:'',
        lastName:'',
        countryCode:'',
        mobileValid: '',
        mobilrType: '',
        mobileNumber:'',
        villageName:'',
        talukaName:'Please Select',
        district:'',
        confirmPassword: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidExtra:true,
        isValidUser: true,
        isValidPassword: true,
        isValidFName:true,
        isValidMName:true,
        isValidLName:true,
        isValidVName:true,
        isValidConfirmPassword: true,
        showAlert: false ,
        titleMessage:'Login Failed',
        innerMessage:'Please Enter Valid Information!!!',
        alertShow:false,
        showCancelButton:false,
        showConfirmButton:false,
        isValidPhone:true,
        showVillage:false,
        userNameMsg:'',
        phoneNumberMsg:'',
        confirmPasswordMsg:'',
        temp:"Please Select Village"
        
    });

    const [navUsername, setNavUsername] = useState('');
    // const [navUsername, setNavUsername] = useState('');
    const [navMobileNumber, setNavMobileNumber] = useState('');
    const [search1, setSearch1] = useState('');
  const [filteredDataSource1, setFilteredDataSource1] = useState(village);
  const [masterDataSource1, setMasterDataSource1] = useState(village);
const tooShort = {
      enabled: true,
      label: 'Too short',
      labelColor: 'red'
};

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);


                    const getValueFunction = () => {
                        // Function to get the value from AsyncStorage
                        AsyncStorage.getItem('userUsername').then(value =>
                        Promise.all([ 
                                        setData({
                                        ...data,
                                        username:value,
                                        innerMessage:value
                                        })
                                    ])
                        
                    );
                    };

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        //  if(val.search(/[^A-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) != -1){
        //      isValidPassword: false
        //  }else{
                    if( val.trim().length >= 1 ) {
                    setData({
                        ...data,
                        password: val,
                        isValidPassword: true
                    });
                } else {
                    setData({
                        ...data,
                        password: val,
                        isValidPassword: false
                    });
                // }
        }
        

    }


const [shouldShow, setShouldShow] = useState(false);
  const [shouldText, setShouldText] = useState('');

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 1) {
            setData({
                ...data,
                userNameMsg:'Please Enter User Name',
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false,
                userNameMsg:'Please Enter User Name'
            });
        }
    }

     const handleValidFName = (val3) => {
        if( val3.trim().length > 0 ) {
            setData({
                ...data,
               
                isValidFName: true
            });
        } else {
            setData({
                ...data,
                
                isValidFName: false
            });
        }
    }

    const handleValidMName = (val4) => {
        if( val4.trim().length > 0 ) {
            setData({
                ...data,
                middleName:val4,
                isValidMName: true
            });
        } else {
            setData({
                ...data,
                middleName:val4,
                isValidMName: false
            });
        }
    }

    const handleValidLName = (val5) => {
        if( val5.trim().length > 0 ) {
            setData({
                ...data,
                lastName:val5,
                isValidLName: true
            });
        } else {
            setData({
                ...data,
                lastName:val5,
                isValidLName: false
            });
        }
    }

    const handleValidVName = (val6) => {
        if( val6.trim().length > 0 ) {
            setData({
                ...data,
                villageName:val6,
                isValidVName: true
            });
        } else {
            setData({
                ...data,
                villageName:val6,
                isValidVName: false
            });
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
    

     function refreshPage() {
    window.location.reload(false);
  }

  const resendOTP = (navUsername,navMobileNumber) =>{
 var url = `http://192.168.225.234:8085/otp/${navUsername}/${navMobileNumber}`;
                       
                                fetch(url, {
                                    method: 'PUT'
                                })
                                .then((response3) => response3.json())
                                .then((response3Json) => {
                                    // console.log(response3Json);
                                    // signIn(response2Json.username);
                                    // navigation.navigate('HomeScreen');

                                    //   if(response3Json.message == "successful"){
                                    //     //   hideWithTimer();
                                    //          setData({
                                    //     ...data,
                                    //     shouldShowOTP:true,
                                    //     isValidOTP:false,
                                    //     otpMessage:"Successful send OTP!!!",
                                    //     }                                  
                                    //     );
                                       
                                    // //  console.log("If statment");
                                    //     }else{
                                    //     setData({
                                    //             ...data,
                                    //             shouldShowOTP:true,
                                    //             isValidOTP:false,
                                    //             otpMessage:"OTP does not send due to problem!!",
                                    //         }                                  
                                    //         );
                                    //         //  console.log("else statment");
                                    //     }
                                    
                                })
                                .catch((error) => {
                                    console.error(error);
                                });



            
    }

    const signUpHandle = (username, password, firstName, middleName, lastName, villageName, mobileNumber, mobileValid, talukaName, district) => {

var e = '';
        
                    if (data.username == e ||  data.password.length == e || data.firstName.length == e || data.middleName.length == e || data.lastName.length == e || data.villageName.length == e  ) {
                        
                                  setShouldShow(true);
                                 setShouldText("Please Enter All The Fields...");
                                 
                                
                                                }
                    else{

                            if( data.password == data.confirmPassword)
                                {
                                if( data.mobileValid == true)
                                        {


                           var url = `http://192.168.225.234:8085/getallmyuserdetail/${username}`;
                       
                                fetch(url, {
                                    method: 'GET'
                                })
                                .then((response2) => response2.json())
                                .then((response2Json) => {
                                    setData({
                                        ...data,
                                        
                                        isValidUser: false,
                                        userNameMsg: 'Please Enter Another User Name!!!'
                                    });
                                    console.log(response2Json);
                                   setShouldShow(true);
                                 setShouldText("Wrong Input! You Already have an account.Please Enter Another User Name!!!");
                        
                                })
                                .catch((error) => {
                                    fetch("http://192.168.225.234:8085/usersave", {
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                                "uid": "",
                                                                "username": username,
                                                                "password": password,
                                                                "firstName": firstName,
                                                                "middleName": middleName,
                                                                "lastName": lastName,
                                                                "countryCode": "None",
                                                                "mobileNumber": mobileNumber,
                                                                "village": villageName,
                                                                "talukaName": talukaName,
                                                                "district": district,
                                                                "role": "ROLE_USER",
                                                                "enable": false
                                                        })
                                                        })
                                                        .then((response) => response.json())

                                                        .then( (data)=>{
                                                            try {
                                                                setData({
                                                                    ...data,
                                                                    isValidExtra:true,
                                                                    isValidUser: true,
                                                                    isValidPassword: true,
                                                                    isValidFName:true,
                                                                    isValidMName:true,
                                                                    isValidLName:true,
                                                                    isValidVName:true,
                                                                    isValidConfirmPassword: true,
                                                                    isValidPhone:true,                                                                    
                                                                    alertShow:true,
                                                                    showConfirmButton:true,
                                                                    titleMessage:'Successful!!!',
                                                                    innerMessage:'Your account created Successfully!!Now you need to confirm OTP'
                                                                });

                                                                setNavUsername(username);
                                                                setNavMobileNumber(mobileNumber);
                                                                 


                                                            } catch (e) {
                                                                console.log("error hai",e)
                                                                setShouldShow(true);
                                                                setShouldText("Registration Fail!!!Please Enter Valid Information");
                                                    
                                                                }
                                                            })
                                    
                                });


                                

                                

                                                        
                                                        }


else{
                          setData({
                                     ...data,
                                        isValidPhone:false,
                                         phoneNumberMsg:'Please Enter Valid Mobile Number'
                                     });

                                     setShouldShow(true);
                                        setShouldText("Registration Fail!!!Your Mobile Number is Invalid.");
                                       
                                        
                }
        }else{

                             setData({
                                     ...data,
                                    isValidConfirmPassword:false,
                                     });
                                       setShouldShow(true);
                                        setShouldText("Registration Fail!!!Your password and confirm password is not same.");
                                        
        }


                         



                                        
                    }
            
        
    }

//     const onSelect = (country: Country) => {

//           setData({
//                             ...data,
//                             countryCode: country,
//                         })
//     // setCountryCode(country.cca2)
//     // setCountry(country)
//   }

// const [value, setValue] = useState()
const searchFilterFunction3 = (text) => {
    
    // Check if searched text is not blank
    if (text) {
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
                      villageName:item.properties.NAME,
                      talukaName:item.properties.SUB_DISTRICT,
                      district:item.properties.DISTRICT,
                      temp:item.properties.NAME+" ("+item.properties.SUB_DISTRICT+") "+" ("+item.properties.DISTRICT+") ",
                      showVillage:false,
                    
                  });
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

    return (
      <View style={styles.container}>
     {/* <View style={data.containerStyle}>  */}
          <StatusBar backgroundColor='#00ace6' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Registration!</Text>
            
        </View>
        
        {data.showVillage ? (
        <View style={{ }}>
        {/* <View style={{  }}> */}
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          // autoFocus = {true}
          onChangeText={(text) => searchFilterFunction3(text)}
          onClear={(text) => setData({...data, showVillage:false})}
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
        </View>

          ) : null}


        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
        <ScrollView >
        {/* ------------------------------------- */}

  

      
            <Text style={[styles.text_footer, {
                color: colors.text,
               
            }]}>Mobile Number</Text>


         <PhoneInput
           initialCountry='in'
        //    ref={ref => {
        //     this.phone = ref;
        //    }}
        style={styles.phoneInput} 
           ref={phoneRef}
            
           onChangePhoneNumber={(e)=>updateInfo(e)}
         />

         { data.isValidPhone ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{data.phoneNumberMsg}</Text>
            </Animatable.View>
            }
     
<Text style={[styles.text_footer, {
                color: colors.text
            }]}>{"\n"}User Name</Text>
            
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
                        // check_textInputChange: true,
                    })}

        

                    onEndEditing={(e)=>
                    
                    handleValidUser(e.nativeEvent.text)}
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
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{data.userNameMsg}</Text>
            </Animatable.View>
            }
      

            <Text style={[styles.text_footer, {
                color: colors.text,
                // marginTop: 35
            }]}>{"\n"}Password</Text>
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
                        password: val,
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
            <Text style={styles.errorMsg}>Confirm Password And Password are not same.</Text>
            </Animatable.View>
            }
{/* ---------------------------------------- */}
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>{"\n"}First Name</Text>
            <View style={styles.action}>
                {/* <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                /> */}
                <TextInput 
                    placeholder="Your First Name"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                     onChangeText={(val3) => setData({
                            ...data,
                            firstName: val3,
                            isValidFName: true
                        })}
                    onEndEditing={(e)=>handleValidFName(e.nativeEvent.text)}
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
            { data.isValidFName ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Please Enter Your First Name.</Text>
            </Animatable.View>
            }


            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>{"\n"}Middle Name</Text>
            <View style={styles.action}>
                
                <TextInput 
                    placeholder="Your Middle Name"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                     onChangeText={(val4) => setData({
                            ...data,
                            middleName: val4,
                            isValidMName: true
                        })}
                    onEndEditing={(e)=>handleValidMName(e.nativeEvent.text)}
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
            { data.isValidMName ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Please Enter Your Middle Name.</Text>
            </Animatable.View>
            }


            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>{"\n"}Last Name</Text>
            <View style={styles.action}>
               
                <TextInput 
                    placeholder="Your Last Name"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                     onChangeText={(val5) => setData({
                            ...data,
                            lastName: val5,
                            isValidLName: true
                        })}
                    onEndEditing={(e)=>handleValidLName(e.nativeEvent.text)}
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
            { data.isValidLName ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Please Enter Your Last Name.</Text>
            </Animatable.View>
            }

            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>{"\n"}Village Name</Text>
            <View style={styles.action}>
       
               <TouchableOpacity 
               onPress={() =>
                   setData({
                   ...data,
                   showVillage:true
               })
               }
               > 
               <Text >{data.temp}</Text> 
               </TouchableOpacity>
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
            { data.isValidVName ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Please Enter Your Village Name.</Text>
            </Animatable.View>
            }

            {shouldShow ? (
                <View style={styles.errorView2}>
                    <Text style={styles.errorMsg2}>{shouldText}</Text>
                 </View>  
        
            
             ) : null}

                      
            <View style={styles.button2}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {
                        signUpHandle( data.username, data.password, data.firstName, data.middleName, data.lastName, data.villageName, data.mobileNumber, data.mobileValid, data.talukaName, data.district )}}
                >
                <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Registration</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.replace('SignInScreen')}
                    style={[styles.signIn, {
                        borderColor: '#00ace6',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#00ace6'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
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
              resendOTP(navUsername, navMobileNumber);
            navigation.navigate('OTPScreen',{username:navUsername, mobileNumber:navMobileNumber}),                                                        
            setData({
                alertShow: false
                });
          }}
        />

      </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    extraa:{
        opacity:0.5,
    },
button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: '#fff',
    fontSize: 15
  },    


    phoneInput: {
     borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
     paddingVertical: 20
  },
    container: {
    //    opacity:0.3,
      flex: 1, 
      backgroundColor: '#00ace6'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
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
        color: '#FF0000',
        fontSize: 14,
    },
    errorView2:{
            flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
    },
    errorMsg2: {
       
        color: '#FF0000',
        fontSize: 14,
        backgroundColor:'#99ff9980',
        paddingVertical:5,
        paddingHorizontal:10,
        borderWidth: 1,
        borderColor: '#99ff9970',
        borderRadius:7,
        marginTop:20,
    },
    button2: {
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
    },
     itemStyle: {
    padding: 10,
  },
  });









