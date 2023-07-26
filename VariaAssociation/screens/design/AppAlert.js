import React,{useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,Image,TouchableOpacity,FlatList, Dimensions } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';

const width = Dimensions.get('window').width


const AppAlert = ({show}) =>{
  const [data, setData] = React.useState({
   titleMessage:'Login Failed',
        innerMessage:'Please Enter Valid Information!!!',
        alertShow:show,
        showCancelButton:true,
        showConfirmButton:false,

    });
  return (
 <AwesomeAlert
          show={data.alertShow}
          showProgress={false}
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
              ...data,
                alertShow: false
                });
          }}
          onConfirmPressed={() => {            
            navigation.navigate('HomeScreen'),                                                        
            setData({
              ...data,
                alertShow: false
                });
          }}
        />
         );
};

export default AppAlert;

const styles = StyleSheet.create({
 
});