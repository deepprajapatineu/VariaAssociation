import React,{useEffect} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,Image,TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { SliderBox } from "react-native-image-slider-box";
import LinearGradient from 'react-native-linear-gradient';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
   
    List
} from 'react-native-paper';
// import { Icon } from 'react-native-elements'
const HomeScreen = ({navigation}) => {


useEffect(() => {
   Promise.all([  
   AsyncStorage.multiGet(["userName", "mobileNumber", "dpuri2", "firstName", "middleName", "lastName", "mobileNumber","temptoken","role","villageName","talukaName","district"]).then(response => {
            // console.log(response[0][0]) // Key1
            // console.log(response[0][1]) // Value1
             Promise.all([  setData({
                  ...data,
                  username:response[0][1],
                  mobileNumber:response[1][1],
                  dpuri:response[2][1],
                  token:response[7][1],
                  role:response[8][1],
                  village:response[9][1],  
                  talukaName:response[10][1],
                  district:response[11][1],  
                  
            })
             ]);
        })
             ]);

                 var url4 = `http://192.168.225.234:8085/getmyprofilepic/deep`;
                       
                                fetch(url4, {
                                    method: 'GET'
                                })
                                // .then((response4) => response4.json())
                                  .then((response) => {
                                            return response.text();
                                  })
                                .then((response4Json) => {
                                  
                                    setDpuri(response4Json)
                                    AsyncStorage.setItem('dpuri2',response4Json);
                                     }).catch((error) => {
                                                      
                                                        });
  }, [])

const [data, setData] = React.useState({
     username:'',
     role:'',
     mobileNumber:'',
     dpuri:'',
     token:'',
     role:'',
     village:'',
     shouldShow:true,
    });

    const [data2, setData2] = React.useState({
    //  sliderImages:[
    //    require('../assets/logo.png),
    //    "https://source.unsplash.com/1024x768/?nature",
    //     "https://source.unsplash.com/1024x768/?water",
    //     "https://source.unsplash.com/1024x768/?girl",
    //     "https://source.unsplash.com/1024x768/?tree",
        
    //  ],
    });

const [dpuri, setDpuri] = React.useState();
  const { colors } = useTheme();

  const theme = useTheme();
//  AsyncStorage.setItem('dpuri','http:/192.168.225.44:8085/profile_image/photo2.png')
//   AsyncStorage.getItem("userName2").then((value) => {
//      Promise.all([ 
//                   setData({
//                     ...data,
//                     username:value,
//                   })
//                 ])

                
// });

const CustomSlider = () =>{
  <SliderBox
  ImageComponent={FastImage}
  images={this.state.images}
  sliderBoxHeight={200}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  paginationBoxVerticalPadding={20}
  autoplay
  circleLoop
  resizeMethod={'resize'}
  resizeMode={'cover'}
  paginationBoxStyle={{
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10
  }}
  dotStyle={{
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)"
  }}
  ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
  imageLoadingColor="#2196F3"
/>
}


    return (
      <View style={styles.container}>
      

       <StatusBar hidden />
        {/* <View style={styles.header}>
          <TouchableOpacity style={styles.headericon}>
            <List.Icon icon="menu" />
          </TouchableOpacity>
        </View> */}
        <StatusBar backgroundColor='#00ace6' barStyle= { theme.dark ? "light-content" : "dark-content" }/>
                       
<View style={styles.subcontainer2 }>
                        <SliderBox
                        
          images={[
    'https://media3.s-nbcnews.com/j/newscms/2018_21/2442281/og-nbcnews1200x630_c986de7e1bb6ad2281723b692aa61990.nbcnews-fp-1200-630.png',
    'http://192.168.225.234:8085/profile_image/deep.png',
    'https://media3.s-nbcnews.com/j/newscms/2018_21/2442281/og-nbcnews1200x630_c986de7e1bb6ad2281723b692aa61990.nbcnews-fp-1200-630.png'
  ]}
           sliderBoxHeight={200}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  dotColor="white"
  inactiveDotColor="#90A4AE"
  paginationBoxVerticalPadding={20}
  autoplay
  circleLoop
  resizeMethod={'resize'}
  resizeMode={'cover'}
  paginationBoxStyle={{
    position: "absolute",
    bottom: 0,
    padding:0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
    
  }}
  dotStyle={{
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)",
    
  }}
  ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
  imageLoadingColor="#2196F3"
/>
</View>
        {/* <Text style={{color: colors.text}}>Home Screen</Text> */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
  >

  

<View style={styles.subcontainer}>


                <TouchableOpacity
                  style={styles.button}  
                  onPress={() =>  navigation.openDrawer()}                   
                >
                   <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.linear}
                >
                <List.Icon  
                icon="eventbrite" 
               
                />
                   <Text style={styles.buttonText} >EVENT</Text>
                   </LinearGradient>

                </TouchableOpacity>

  <TouchableOpacity
                  style={styles.button}  
        onPress={() => navigation.navigate('MainFamily',{adminVillage:data.village,adminTalukaName:data.talukaName, adminDistrict:data.district})}                   
                >
                  <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.linear}
                >
                <List.Icon  
                icon="account-group" 
               
                />
                   <Text style={styles.buttonText}>FAMILY</Text>
                    </LinearGradient>
                </TouchableOpacity>
                </View>
                 

<View style={styles.subcontainer}>

                  <TouchableOpacity
                  style={styles.button}  
        // onPress={() => navigation.navigate("MainFamily")}                   
                >
                  <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.linear}
                >
                <List.Icon  
                icon="laptop-chromebook"                
                />
                   <Text style={styles.buttonText}>STUDENT</Text>
                    </LinearGradient>
                </TouchableOpacity>
                  <TouchableOpacity
                  style={styles.button}  
        onPress={() => navigation.navigate("RootWeddingScreen")}                  
                >
                 <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.linear}
                >
                 <List.Icon  
                icon="human-male-female"                
                />
                   <Text style={styles.buttonText}>WEDDING</Text>
                    </LinearGradient>
                </TouchableOpacity>
</View>
<View style={styles.subcontainer}>

        <TouchableOpacity
                  style={styles.button}  
        // onPress={() => navigation.navigate("MainFamily")}                   
                >
                  <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.linear}
                >
                 <List.Icon  
                icon="newspaper"                
                />
                   <Text style={styles.buttonText}>NEWS</Text>
                    </LinearGradient>
                </TouchableOpacity>
                

                <TouchableOpacity
                  style={styles.button}  
                  // onPress={() => navigation.navigate("MainFamily")}                   
                >
                  <LinearGradient
                    colors={['#33ccff', '#00ace6']}
                    style={styles.linear}
                >
                 <List.Icon  
                icon="image-album"                
                />
                   <Text style={styles.buttonText}>GALLERY</Text>
                    </LinearGradient>
                </TouchableOpacity>
                </View>
</ScrollView>
      </View>
      
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingTop:30 
  },
  subcontainer:{
    flexDirection: 'row',
    // backgroundColor:"red",
paddingTop:10,
  },
   subcontainer2:{
    flexDirection: 'row',
    paddingVertical:10,
    // backgroundColor:"red"

  },
  buttonText:{
    color:"black",
    fontSize:18,
    fontWeight: 'bold',
    letterSpacing: 1,
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
  button:{
     justifyContent: 'center',
    alignItems: 'center', 
    width:130,
    height:130,
    margin:15,
    paddingVertical:30,
    padding:10,
    borderRadius:8,

       shadowColor: "#000",
       shadowOffset: { width: 5, height: 5 },
shadowOpacity: 0.44,
shadowRadius: 5.32,
elevation: 10,
  },

   
  linear: {
       width:130,
    height:130,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    margin:10,
    

    },

    
});
