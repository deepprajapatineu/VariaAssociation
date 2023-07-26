import React, {useEffect} from 'react';
import { View, StyleSheet,Image } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';



import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import{ AuthContext } from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';
import DetailScreen from './profilescreens/DetailScreen';
import { createStackNavigator } from '@react-navigation/stack';
const ProfileStack = createStackNavigator();

export function DrawerContent(props) {
const [data, setData] = React.useState({
     username:'',
     mobileNumber:'',
     firstName:'',
     middleName:'',
     lastName:'',
     mobileNumber:'',
     dp:'../assets/man.png',
     dpuri:"",
     token:'',
     role:"",
    });
    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);

//   AsyncStorage.getItem("userName2").then((value) => {
//      setData({
//              ...data,
//                   username:value,
//             });
// });

useEffect(() => {
  AsyncStorage.multiGet(["userName", "mobileNumber", "dpuri2", "firstName", "middleName", "lastName", "mobileNumber","temptoken","role"]).then(response => {
            // console.log(response[0][0]) // Key1
            // console.log(response[0][1]) // Value1
             Promise.all([  setData({
                ...data,
                  username:response[0][1],
                  mobileNumber:response[1][1],
                  dpuri:response[2][1],
                  token:response[7][1],
                  role:response[8][1],
            })
             ]);
        })
}, [])



var dpp = data.dp;
console.log(dpp);

//  AsyncStorage.getItem("mobileNumber").then((value) => {
//      setData({
             
//                   mobileNumber:value,
//             });
// });
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>

                            <Avatar.Image
                              
                                // source={
                                //     require('file:///storage/emulated/0/Android/data/com.rnv5/files/Pictures/a475fd88-68ea-446c-8503-1350943c278b.jpg')
                                // }
                                source={{ uri: `${data.dpuri}` }}
                                // source={{ uri: `http:/192.168.225.234:8085/profile_image/20190903_223416.jpg` }}
                                
                                size={50}
                            />

                           
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{data.username}</Title>
                                <Caption style={styles.caption}>{data.mobileNumber}</Caption>
                            </View>
                        </View>

                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View> */}
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        /> */}
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Bookmarks"
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        /> */}
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="settings-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        />
                       
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                    </Drawer.Section>
                    {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );

//     const ProfileStackScreen = ({navigation}) => (
// <ProfileStack.Navigator screenOptions={{
//         headerStyle: {
//         backgroundColor: '#1f65ff',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//         fontWeight: 'bold'
//         }
//     }}>
//         <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} options={{
//         headerLeft: () => (
//             <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
//         )
//         }} />
//         <ProfileStack.Screen name="DetailScreen" component={DetailScreen} options={{
        
//         }} />
// </ProfileStack.Navigator>


// );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
