import React, {useEffect,useState} from 'react';
import { View, Text, Button, StyleSheet, ScrollView,TouchableOpacity, SafeAreaView,  Image, ImageBackground, TextInput, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
       Avatar,
    List
} from 'react-native-paper'
// import ImagePicker from 'react-native-image-picker'
// import ImageResizer from 'react-native-image-resizer'
// import RNFS from 'react-native-fs'
import ImagePicker from 'react-native-image-crop-picker';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import RNRestart from 'react-native-restart';
  const width = Dimensions.get('window').width
const DetailScreen = ({route,navigation}) => {
const { colors } = useTheme();
const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  
  const [data, setData] = React.useState({
     username:'',
     mobileNumber:'',
     firstName:'',
     middleName:'',
     lastName:'',
     mobileNumber:'',
     villageName:'',
     dp:'',
     dpuri:"",
     token:'',
     isShowDetail:true,
     isShowChoose:false,
     isShowInput:true
    });

    useEffect(() => {
  AsyncStorage.multiGet(["userName", "mobileNumber", "dpuri2", "firstName", "middleName", "lastName", "mobileNumber","villageName","temptoken"]).then(response => {
            // console.log(response[0][0]) // Key1
            // console.log(response[0][1]) // Value1
             Promise.all([  setData({
                ...data,
           
                  username:response[0][1],
                  mobileNumber:response[1][1],
                  dpuri:response[2][1],
                  firstName:response[3][1],
                  middleName:response[4][1],
                  lastName:response[5][1],
                  mobileNumber:response[6][1],
                  villageName:response[7][1],
                  token:response[8][1],
                  isShowDetail:true,
                  isShowChoose:false,

            })
             ]);
        })
}, [])
const uploadImage = () =>{
  console.log("File Name is :-"+ image);
  let body = new FormData();
  var url4 = `http://192.168.225.234:8085/upload-file`;

body.append('file', {uri: image,name: 'photo2.png',filename :'imageName.png',type: 'image/png'});
    body.append('username', 'deep');

    body.append('Content-Type', 'image/png');

fetch(url4,{ method: 'POST',headers:{  
     "Content-Type": "multipart/form-data",
     "otherHeader": "foo",
     } , body :body} )
  // .then((res) => checkStatus(res))
  // .then((res) => res.json())
  .then((res) => { console.log("response" +res);

    }
 
  )
  .catch((e) => console.log(e))
  // .done()
   navigation.navigate('Settings')
  
}
 const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.3
    }).then(image => {
      console.log(image);
      setImage(image.path);
      // uploadImage();
      // this.bs.current.snapTo(1);

        let body = new FormData();
  var url4 = `http://192.168.225.234:8085/upload-file`;

body.append('file', {uri: image.path,name: data.username+'.png',filename :'imageName.png',type: 'image/png'});
    body.append('username', data.username);

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
  .then((res) => { console.log("response" +res);
  AsyncStorage.removeItem('dpuri2');
  AsyncStorage.setItem('dpuri2',res);
  RNRestart.Restart();
   })
  .catch((e) => console.log(e))
  .done()
  setData({
    ...data,
    isShowChoose:false,
 isShowDetail:true,
  })
navigation.navigate('Home')
    });
//     ImagePicker.openCamera({
//   width: 300,
//   height: 400,
//   cropping: true,
// }).then(image => {
//   console.log(image);
// });
  }

  const choosePhotoFromCamara = () => {
        ImagePicker.openCamera({
  width: 300,
  height: 400,
  cropping: true,
}).then(image => {
  
      console.log(image);
      setImage(image.path);
      // uploadImage();
      // this.bs.current.snapTo(1);

        let body = new FormData();
  var url4 = `http://192.168.225.234:8085/upload-file`;

body.append('file', {uri: image.path,name: data.username+'.png',filename :'imageName.png',type: 'image/png'});
    body.append('username', data.username);

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
  .then((res) => { console.log("response" +res);
    AsyncStorage.removeItem('dpuri2');
  AsyncStorage.setItem('dpuri2',res);
  RNRestart.Restart();
   })
  .catch((e) => console.log(e))
  .done()
  setData({
    ...data,
    isShowChoose:false,
     isShowDetail:true,
  })
navigation.navigate('Home')
    });

  }

    return (
      <View Style={styles.container}>
    

{data.isShowDetail ? (
  <View>
      <ScrollView
              showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}>
  
      {/* <View style={styles.choosefileview}>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Stay connected with VARIYA PARIVAR!</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
</View> */}
             

      {/* <Button 
      title="Edit"
      // style={{backgroundColor:'#c0c0c0'}}
      color='#00ace6'
       onPress={()=>navigation.navigate('editDetailScreen',{username:data.username, token:data.token})}
      /> */}
      <View style={styles.contentview}>
       <View style={styles.contentheaderdp}>
             
          
                       <TouchableOpacity 
                       onPress={()=>navigation.navigate('DpOpen',{dpuri:data.dpuri})}
                       >
                           <Avatar.Image
                                source={{ uri: `${data.dpuri}` }}
                                size={130}
                            />
                       </TouchableOpacity>
                            <TouchableOpacity style={styles.dptouch}
                            onPress={() => {
                                  // choosePhotoFromLibrary()
                                    setData({
                                        ...data,                                            
                                        isShowDetail:false,
                                        isShowChoose:true,

                                  })
                                }}
                            >
                            <Text style={styles.contenttext}>Edit</Text>
                            </TouchableOpacity>
         
        </View>

        <View style={styles.contentheader}>                          
                        <Text style={styles.contenttext}>User Name</Text>
            
        </View>
        <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{data.username} </Text>
        </View>

        <View style={styles.contentheader}>                          
                        <Text style={styles.contenttext}>First Name</Text>
                        <TouchableOpacity style={styles.icon} 
                           onPress={()=>navigation.navigate('editDetailScreen',{username:data.username, token:data.token, selectedValue:"FirstName", temp:"firstName"})}
                        >
                        <List.Icon icon="square-edit-outline" /></TouchableOpacity>
        </View>
        <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{data.firstName} </Text>
        </View>

        <View style={styles.contentheader}>                          
                        <Text style={styles.contenttext}>Middle Name</Text>
                        <TouchableOpacity style={styles.icon} 
                         onPress={()=>navigation.navigate('editDetailScreen',{username:data.username, token:data.token, selectedValue:"MiddleName", temp:"middleName"})}

                        >
                        <List.Icon icon="square-edit-outline" /></TouchableOpacity>
        </View>
        <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{data.middleName} </Text>
        </View>

        <View style={styles.contentheader}>                          
                        <Text style={styles.contenttext}>Last Name</Text>
                        <TouchableOpacity style={styles.icon} 
                          onPress={()=>navigation.navigate('editDetailScreen',{username:data.username, token:data.token, selectedValue:"LastName", temp:"lastName"})}

                        >
                        <List.Icon icon="square-edit-outline" /></TouchableOpacity>
        </View>
        <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{data.lastName} </Text>
        </View>

        <View style={styles.contentheader}>                          
                        <Text style={styles.contenttext}>Mobile Number</Text>
                        {/* <TouchableOpacity style={styles.icon} 
                            onPress={() => {
                                  setData({
                                    ...data,
                                    showInput:true,
                                    temp:'name'
                                  })
                            }}
                        >
                        <List.Icon icon="square-edit-outline" /></TouchableOpacity> */}
        </View>
        <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{data.mobileNumber} </Text>
        </View>

        <View style={styles.contentheader}>                          
                        <Text style={styles.contenttext}>Village Name</Text>
                        
        </View>
        <View style={styles.contenttext2view}>
                      <Text style={styles.contenttext2}>{data.villageName} </Text>
        </View>

      
      </View>

      </ScrollView>
      </View>
         ) : null}
{data.isShowChoose ? (
   <Animatable.View 
           
            animation="fadeInUpBig"
        >
        {/* <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{uri: `${data.dpuri}`}}
        > */}
           <View style={styles.choosefileview}>
          
              <View style={styles.choosefile}>
                <TouchableOpacity style={styles.choosefileTouch}
                onPress={() => {
                                  choosePhotoFromCamara()
                                }}
                              >
                  <Text style={styles.contenttext}>Choose From Camara</Text>
                </TouchableOpacity>
                   <TouchableOpacity style={styles.choosefileTouch}
                   onPress={() => {
                                  choosePhotoFromLibrary()
                                }}
                                >
                  <Text style={styles.contenttext}>Choose From Gallary</Text>
                </TouchableOpacity>
                   <TouchableOpacity style={styles.choosefileTouch}>
                  <Text style={styles.contenttext}>Delete Photo</Text>
                </TouchableOpacity>
                   <TouchableOpacity style={styles.choosefileTouch}
                   onPress={() => {
                     navigation.navigate('Settings')
                                }}>

                  <Text style={styles.contenttext}
                  
                                >Cancle</Text>
                </TouchableOpacity>
              </View>
              
           </View>
            {/* </ImageBackground> */}
           </Animatable.View>
         ) : null}
      

      </View>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    // justifyContent: 'center'
  },
   contentview:{
flex: 1,
paddingHorizontal:5
  },
  //  contentheader:{
  
  //   backgroundColor: '#f2f2f2',
  //   height:60,
  //   marginTop:5,
  //   padding:15,
  //   justifyContent: 'center'

  // },
      contentheader:{  
    backgroundColor: '#f2f2f2',
    // height:60,
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
  contentheaderdp:{
     backgroundColor: '#fff',
    height:150,
    marginVertical:15,
    // padding:15,
    paddingVertical:10,
    justifyContent: 'center',
    alignItems:'center'
    // flexDirection: 'row'
  },
  dptouch:{
    // top:30,
    // marginLeft:,
  },
    contenttext:{
      // backgroundColor:'red',
      // width:"50%",
      marginVertical:5,
    fontSize: width/28,
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
    fontSize: width/28, 
    color:'#8c8c8c',
    
  },


  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },

    footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30,
      bottom:0
  },
   title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
    text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
   signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  },
  choosefileview:{
   width:"100%",
    height:"100%",
    backgroundColor:"black",
     justifyContent: 'center',
      alignItems: 'center',
  },
  choosefile:{
    position: 'absolute',
    bottom:0,
    backgroundColor:"lightgray",
    width:"80%",
    height:250,
    // borderTopWidth:0,
    // borderRadius:20
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
      alignItems: 'center',
     
  },
  choosefileTouch:{
    marginVertical:10
  },
   headerBackgroundImage: {
   width:"100%",
   height:270,
 
  },  

});

