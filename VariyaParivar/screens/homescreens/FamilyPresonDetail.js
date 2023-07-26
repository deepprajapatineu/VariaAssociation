import React,{useEffect} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import {
    Avatar, 
    List
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';


const FamilyPresonDetail = ({ route,navigation}) => {
const { name } = route.params;
    const { village } = route.params;
    const { id } = route.params;
    const { partner } = route.params;
  
   
     useEffect(() => {
       fetch(`http://192.168.225.234:8085/familypersondetail/${id}/${village}`)
            .then(response => response.json())
            .then((responseJson)=> {
               
              setData({
                     ...data,
                      name:responseJson[0].name,
                      village:responseJson[0].village,
                      district:responseJson[0].district,
                      mobileNumber:responseJson[0].mobileNumber,
                      gender:responseJson[0].gender,
                      profilePic:responseJson[0].profilePic
                     
                  });
                   
            })
            .catch(error=>console.log("Error he:-"+ error)) 
        
  
}, [])

const [data, setData] = React.useState({
    name:"",
    village:"",
    district:"",
    mobileNumber:"",
    gender:"",
    profilePic:"",
    });
    
    return (
      <View style={styles.container}>
      {/* <ScrollView > */}
         {/* <Text>Name:- {data.name}</Text>
     <Text>Village:- {data.village}</Text>
        <Text>MobileNumber:- {data.mobileNumber}</Text>       
        <Text>gender:- {data.gender}</Text>       
        <Text>Dp:- {data.profilePic}</Text>        */}
      
          <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.background}
                >
                <Text style={{fontSize:16, fontWeight:"bold", color:"white"}}>P R O F I L E</Text>
                <ScrollView >
                  <View style={styles.subContainer}>
         <Avatar.Image
              source={{uri: `${data.profilePic}`}}
              size={180}
        />
        <Text style={styles.text}>{data.name}</Text>
          </View>
          
          <View style={styles.subContainer2}>
             <Text style={styles.text2}>Village</Text>
             <Text style={styles.text3}>{data.village}({data.district})</Text>
          </View>

          <View style={styles.subContainer2}>
             <Text style={styles.text2}>Gender</Text>
             {/* <Text style={styles.text3}>{data.gender}</Text> */}

               {(() => {

                                            if (data.gender == "m") {
                                                {/* return <Text style={styles.text3}> (m)</Text>; */}
                                                  return  <List.Icon style={styles.icon} icon="human-male" />;
                                            }else{
                                                return  <List.Icon style={styles.icon} icon="human-female" />;
                                            }
                                            })()}
          </View>
          <View style={styles.subContainer2}>
             <Text style={styles.text2}>Mobile</Text>
             <Text style={styles.text3}>{data.mobileNumber}</Text>
          </View>
          <View style={styles.subContainer2}>
             <Text style={styles.text2}>Partner</Text>
             <Text style={styles.text3}>{partner}</Text>
          </View>
          </ScrollView>
        </LinearGradient>
      {/* </ScrollView> */}
      
      </View>
    );
};

export default FamilyPresonDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical:70,
    // width:400
  },
  subContainer:{
    width:330,
    alignItems:"center",
     paddingTop:20,
 marginBottom:40,
   
  },
background:{
 shadowColor: "#000",
       shadowOffset: { width: 10, height: 10},
shadowOpacity: 0.44,
shadowRadius: 10.32,
elevation: 12,
borderRadius:10,
 alignItems:"center",
 paddingVertical:10,
 width:"90%",
},
text:{
  marginTop:15,
  fontSize:16, 
  fontWeight:"bold", 
  color:"white",
  letterSpacing: 2
  },
    subContainer2:{
  //  backgroundColor:"red",
   width:320,
   justifyContent:"center",
   margin:10,
   borderBottomWidth:1,
   borderColor:"lightgray",
   flexDirection:"row",
   marginVertical:25
  },
  text2:{
    position:"absolute",
    left:0,
    bottom:0,
  fontSize:16, 
  fontWeight:"bold", 
  color:"white",
  letterSpacing: 2,
  marginVertical:5
  },
    text3:{
      position:"absolute",
    right:0,
    bottom:0,
  fontSize:16, 
  // fontWeight:"bold", 
  color:"white",
  letterSpacing: 2,
  marginVertical:5
  },
    icon:{
      position:"absolute",
    right:0,
    bottom:0,
    paddingTop:20
  },
});
