import React, { useState, useRef, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import PhoneInput from "react-native-phone-input";
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';
const SignInScreen = ({navigation}) => {

        

const phoneRef = useRef(undefined);
    const [data, setData] = React.useState({
        mobileValid: '',
        mobilrType: '',
        mobileNumber:'',
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        token:'',
    });

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);

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
        if( val.trim().length >= 8 ) {
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
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
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

    const loginHandle = (userName, password, mobileNumber, mobileValid) => {
var e = '';
        if ( data.userName == e || data.password == e ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
        }
        else{
                fetch("http://192.168.225.234:8085/token", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userName,
                    password: password,
                })
                })
                .then((response) => response.json())

                .then(async (data2)=>{
                    try {
                        await AsyncStorage.setItem('userToken',data2.token)
                        await AsyncStorage.setItem('temptoken',data2.token)
                         setData({
                                ...data,
                                token:data2.token
                            });

                                                    var url = `http://192.168.225.234:8085/getallmyuserdetail/${userName}`;
                                        
                                                    fetch(url, {
                                                        method: 'GET'
                                                    })
                                                    .then((response2) => response2.json())
                                                    .then(async(response2) => {
                                                       
                                                         await AsyncStorage.setItem('userName',response2.username)
                                                        await AsyncStorage.setItem('firstName',response2.firstName)
                                                        await AsyncStorage.setItem('middleName',response2.middleName)
                                                        await AsyncStorage.setItem('lastName',response2.lastName)
                                                        await AsyncStorage.setItem('mobileNumber',response2.mobileNumber)
                                                        await AsyncStorage.setItem('villageName',response2.village)
                                                        await AsyncStorage.setItem('talukaName',response2.talukaName)
                                                        await AsyncStorage.setItem('district',response2.district)
                                                        await AsyncStorage.setItem('role',response2.role)
                                                        
                                                        // await AsyncStorage.setItem('enable',response2.enable)

                                                                        var url4 = `http://192.168.225.234:8085/getmyprofilepic/${userName}`;
                       
                                                                                        fetch(url4, {
                                                                                            method: 'GET'
                                                                                        })
                                                                                        .then((response) => {
                                                                                            return response.text();
                                                                                        })
                                                                                        .then((response4Json) => {
                                                                                        
                                                                                            console.log("info:-"+response4Json);
                                                                        AsyncStorage.setItem('dpuri2',response4Json);
                                                                                            

                                                                                            }).catch((error) => {
                                                                                                            
                                                                                                                });

                                                        signIn(response2.username);
                                                    })
                                                    .catch((error) => {
                                                        console.error(error);
                                                    });
                     
                    } catch (e) {
                        console.log("error hai",e)

                        Alert.alert(
                            "Login Failed!!!",
                            "Please Enter Valid Information"
                         ) 
            
                        }
                    })
                }
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#00ace6' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
        <ScrollView>

            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
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
                     // isValidUser: true
                     })
                    }
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
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
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
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
                    onChangeText={(val) => handlePasswordChange(val)}
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
            

            <TouchableOpacity
            onPress={() => 
                    navigation.replace('ForgotPasswordScreen')
                    }
                    >
                <Text style={{color: '#00ace6', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {loginHandle( data.username, data.password, data.mobileNumber, data.mobileValid )}}
                    // onPress={() => {signIn('response2Json.username')}}
                   
                >
                <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => 
                    navigation.replace('SignUpScreen')
                    // navigation.replace('OTPScreen')
                    }
                    style={[styles.signIn, {
                        borderColor: '#00ace6',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#00ace6'
                    }]}>Register</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
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
    button: {
        alignItems: 'center',
        marginTop: 50
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
