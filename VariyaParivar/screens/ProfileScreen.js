// import React, {useEffect} from 'react';
// import { View ,Button, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground,StatusBar } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import {
//     useTheme,
//     Avatar,
//     Title,
//     Caption,
//     Paragraph,
//     Drawer,
//     Text,
//     TouchableRipple,
//     Switch,
//     List
// } from 'react-native-paper';
// import {  ListItem } from 'react-native-elements'
// import{ AuthContext } from '../components/context';
// // import RootProfileScreen from './RootProfileScreen';
// const ProfileScreen = ({navigation}) => {

// const [data, setData] = React.useState({
//      username:'',
//      mobileNumber:'',
//      firstName:'',
//      middleName:'',
//      lastName:'',
//      mobileNumber:'',
//      dp:'../assets/man.png',
//      dpuri:"http://192.168.225.44:8085/profile_image/man%20logo.png",
//     });
//     // const paperTheme = useTheme();

//     const { signOut, toggleTheme } = React.useContext(AuthContext);
// const theme = useTheme();
// useEffect(() => {
//   AsyncStorage.multiGet(["userName", "mobileNumber", "dpuri", "firstName", "middleName", "lastName", "mobileNumber"]).then(response => {
//             // console.log(response[0][0]) // Key1
//             // console.log(response[0][1]) // Value1
//              Promise.all([  setData({
           
//                   username:response[0][1],
//                   mobileNumber:response[1][1],
//                   dpuri:response[2][1],
//                   firstName:response[3][1],
//                   lastName:response[5][1],
//             })
//              ]);
//         })
// }, [])

// //  AsyncStorage.setItem('dpuri','http://192.168.225.44:8085/profile_image/man%20logo.png')

//     return (
    
//       <View>
//         {/* <RootProfileScreen/> */}
//       <StatusBar hidden />
//          {/* <StatusBar backgroundColor='transparent' barStyle= { theme.dark ? "light-content" : "dark-content" }/> */}
//       <ScrollView>
//       <View style={styles.headerContainer}>
//         <ImageBackground
//           style={styles.headerBackgroundImage}
//           blurRadius={10}
//           source={{uri: `${data.dpuri}`}}
//         >
//           <View style={styles.headerColumn}>
//             <Image
//               style={styles.userImage}
//               source={{uri: `${data.dpuri}`}}
//             />
//             <Text style={styles.userNameText}>{data.firstName} {data.lastName}</Text>
//             <View style={styles.userAddressRow}>
//               <View>
//                 {/* <Icon
//                   name="place"
//                   underlayColor="transparent"
//                   iconStyle={styles.placeIcon}
//                   // onPress={this.onPressPlace}
//                 /> */}
//               </View>
//               <View style={styles.userCityRow}>
//                 <Text style={styles.userCityText}>
//                   {/* {city}, {country} */}
//                   {data.mobileNumber}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </ImageBackground>
//       </View>
//      <View style={styles.contentview}>
//         <View style={styles.contentheader}>
   
//           <Text style={styles.contenttext}>Account</Text>
//         </View>
//         <TouchableOpacity style={styles.list}
//         onPress={()=>navigation.navigate('DetailScreen')}
//         >
//          <List.Item
//             title="Detail"
//             // description="Item description"
          
//           left={props => <List.Icon {...props} icon="account" />}
//             right={props => <List.Icon {...props} icon="arrow-right" />}
//           />
//         </TouchableOpacity>

//          <TouchableOpacity style={styles.list}>
//          <List.Item
//             title="Change Password"
//             // description="Item description"
          
//           left={props => <List.Icon {...props} icon="security" />}
//             right={props => <List.Icon {...props} icon="arrow-right" />}
//           />
//         </TouchableOpacity>

//  <View style={styles.contentheader}>
   
//           <Text style={styles.contenttext}>More</Text>
//         </View>
//         <TouchableOpacity style={styles.list}>
//          <List.Item
//     title="Help"
//     // description="Item description"
   
//    left={props => <List.Icon {...props} icon="help-circle-outline" />}
//     right={props => <List.Icon {...props} icon="arrow-right" />}
//   />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.list}>
//          <List.Item
//     title="About Us"
//     // description="Item description"
   
//    left={props => <List.Icon {...props} icon="power-cycle" />}
//     right={props => <List.Icon {...props} icon="arrow-right" />}
//   />
//         </TouchableOpacity>

//         <View style={styles.contentheaderlogout}>
//           {/* <Text style={styles.contenttext}>Log Out</Text> */}
//                 <TouchableOpacity
//                 onPress={() => {signOut()}}
//                 >
//                         <List.Item
//                     title="Log Out"
//                     titleStyle={{color: 'black',fontWeight: 'bold'}}
//                   // left={props => <List.Icon {...props} icon="account" />}
//                     right={props => <List.Icon {...props} icon="logout" />}
//                   />
//                   </TouchableOpacity>
              
//         </View>



//      </View>
//       </ScrollView>
//       </View>
//       // <View style={styles.container}>
//       //   <ScrollView>
//       //   <View style={styles.dpimageview}>
                          
//       //                       {/* <Image
//       //                           source={{ uri: `${data.dpuri}` }}
//       //                           style={styles.dpimage}
//       //                       /> */}

//       //                       <ImageBackground source={{ uri: `${data.dpuri}` }} style={styles.dpimage}>
//       //                       <View>
//       //                     <TouchableOpacity style={styles.dpimage}>
//       //                       <Avatar.Image
                              
//       //                           source={{ uri: `${data.dpuri}` }}
//       //                           size={100}
//       //                           style={styles.dp}
//       //                       />

//       //                     </TouchableOpacity>
//       //                     </View>
//       //               </ImageBackground>

//       //                       </View>        
//       //   <View  style={styles.contentview}>
//       //   <Text>change the profile photo</Text>
//       //   <Button
//       //     title="Click Here"
//       //     // onPress={}
//       //   />
//       //    </View>
//       //   </ScrollView>

//       // </View>
//     );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1, 
//     alignItems: 'center', 
//     // justifyContent: 'center'
//   },
//   dpimage:{
//     // flex:1,
//     width:400,
//     height:200
//   },
//   dp:{

//      position: 'absolute', 
//     bottom: 0, 
//     marginLeft:35
//   },
//   dpimageview:{
//     flex: 1,
//     width: '100%',  
//   marginBottom:10,
  
//     // borderWidth: 1,
//     //     borderColor: 'red',
//   },
//   contentview:{
// flex: 1,
// paddingHorizontal:5
//   },


//   headerBackgroundImage: {
//     paddingBottom: 20,
//     paddingTop: 35,
//    height:270,
//   //  margin:5,
//   //  borderWidth:1,
//   //  borderRadius: 15,
//   },  

//    headerColumn: {
//     backgroundColor: 'transparent',
//     ...Platform.select({
//       ios: {
//         alignItems: 'center',
//         elevation: 1,
//         marginTop: -1,
//       },
//       android: {
//         alignItems: 'center',
//       },
//     }),
//   },

//     userImage: {
//     borderColor: '#FFF',
//     borderRadius: 85,
//     borderWidth: 3,
//     height: 150,
//     marginBottom: 8,
//     width: 150,
//   },

//     userNameText: {
//     color: '#FFF',
//     fontSize: 22,
//     fontWeight: 'bold',
//     paddingBottom: 8,
//     textAlign: 'center',
//   },
//    userAddressRow: {
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//     userCityRow: {
//     backgroundColor: 'transparent',
//   },
//    userCityText: {
//     color: '#A5A5A5',
//     fontSize: 15,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   contentheader:{
//     backgroundColor: '#f2f2f2',
//     // height:10
//     marginTop:5,
//     padding:15,

//   },
//   contentheaderlogout:{
//      backgroundColor: '#f2f2f2',
//       marginTop:5,
//   },
//   contenttext:{
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//     listItemContainer: {
//     height: 55,
//     borderWidth: 5,
//     borderColor: '#ECECEC',
//     color:'red',
     
//   },
//   list:{
// // backgroundColor: 'red',
// borderBottomWidth: 1,
// borderColor: '#ECECEC',
//   }
// });
