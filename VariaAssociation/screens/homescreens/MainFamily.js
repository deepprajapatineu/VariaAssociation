import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar,Image,TouchableOpacity,Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
   
    List
} from 'react-native-paper';
import AppTouchacleOpacity from '../design/AppTouchacleOpacity';  
import styless from '../design/styles';  

const width = Dimensions.get('window').width
const MainFamily = ({route,navigation}) => {

const {adminVillage} = route.params;
const {adminTalukaName} = route.params;
const {adminDistrict} = route.params;
const [data, setData] = React.useState({
     username:'',
     role:'',
     mobileNumber:'',
     dpuri:'',
     token:'',
     role:'',
     shouldShow:true,
     onlySuperAdmin:false,
    });

  const { colors } = useTheme();

  const theme = useTheme();
//  AsyncStorage.setItem('dpuri','http:/192.168.225.44:8085/profile_image/photo2.png')
  AsyncStorage.getItem("role").then((value) => {
    if(value == "ROLE_ADMIN"){
     Promise.all([ 
                  setData({
                    ...data,
                    role:value,
                    shouldShow:true,

                  })
                ])
    }
    
    else if(value == "ROLE_SUPERADMIN"){
     Promise.all([ 
                  setData({
                    ...data,
                    role:value,
                    shouldShow:true,
                    onlySuperAdmin:true,

                  })
                ])
    }
    
    else{
      Promise.all([ 
                  setData({
                    ...data,
                    role:value,
                    shouldShow:false,

                  })
                ])
    }

                 
});


    return (
      <View style={styles.container}>
       <StatusBar hidden />
        
        <StatusBar backgroundColor='#00ace6' barStyle= { theme.dark ? "light-content" : "dark-content" }/>
                       
        <Text style={{color: colors.text}}>{data.username}</Text>
        <Text style={styless.conts}>Deep</Text>
     <AppTouchacleOpacity text="Family Book"  onPress={() => navigation.navigate("Family")}  width={width/1.1} />
     <AppTouchacleOpacity text="Link Your Family"  onPress={() => navigation.navigate("AddPersonalFamily")}  width={width/1.1} />

                  {data.shouldShow ? (
                    <View>
     <AppTouchacleOpacity text="Add Village Family" width={width/1.1}  onPress={() => navigation.navigate("AddFamily",{adminVillage:adminVillage,adminTalukaName:adminTalukaName, adminDistrict:adminDistrict})}/>

</View>
          ) : null}
{data.onlySuperAdmin ? (
<View>

     <AppTouchacleOpacity text="Manage Admins"  width={width/1.1}   onPress={() => navigation.navigate("ManageAdmins",{adminVillage:adminVillage,adminTalukaName:adminTalukaName, adminDistrict:adminDistrict})} />

</View>
          ) : null}

      </View>
    );
};

export default MainFamily;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  header:{
    backgroundColor:'red',
    width:'100%',
    height:50,
     position: 'absolute', 
    top: 0, 
  },
  headericon:{
    width:40,
    backgroundColor:'blue',
     position: 'absolute', 
    top: 0, 
  },
});
