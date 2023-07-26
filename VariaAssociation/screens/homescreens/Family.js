
import React, { useState, useEffect } from 'react';
import {
       Avatar
} from 'react-native-paper'
// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, Image, Picker, Button, TouchableOpacity, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import AppTouchacleOpacity from '../design/AppTouchacleOpacity';  
const width = Dimensions.get('window').width

const Family = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
const [data, setData] = React.useState({
    village:"",
    showSearch:false,
    showButtons:true,
    showVillage:false,
    });

  const searchFilterFunction = (text) => {
    
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      //------------------------------------
        fetch(`http://192.168.225.234:8085/familypersondetailbyname/${text}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
        // console.log("pic:-"+responseJson);

      })
      .catch((error) => {
        console.error(error);
      });
      //------------------------------------
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

    const searchFilterFunction2 = (text) => {
    
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      //------------------------------------
        fetch(`http://192.168.225.234:8085/findvillage/${text}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
        // console.log("pic:-"+responseJson);

      })
      .catch((error) => {
        console.error(error);
      });
      //------------------------------------
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };


let Image_Http_URL ={ uri: 'https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png'};

  const ItemView = ({ item }) => {
    let dpUrl = {uri:`${item.profilePic}`}
    return (
      // Flat List Item
      <View style={{flexDirection:'row',marginTop: 5}}>
                 <Avatar.Image
                              source={dpUrl}
                                size={35}
                            />
                            {/* <Image source={Image_Http_URL} style = {{height: 200, resizeMode : 'stretch', margin: 5 }} /> */}
      <Text style={styles.itemStyle} 
      onPress={() => getItem(item)}
      >
        {/* {item.id}
        {'.'} */}
        {item.name.toUpperCase()} (
        {item.village}, {item.talukaName})
        
      </Text>
      </View>
    );
  };

  const ItemView2 = ({ item }) => {
    return (
      // Flat List Item
      <View style={{flexDirection:'row',marginTop: 5}}>
        <Text style={styles.itemStyle} 
          onPress={() => getItem2(item)}
        >
        {/* {item.id}
        {'.'} */}
        {item.village} ({item.talukaName}, {item.district} )
      </Text>
      </View>
    );
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

  const getItem = (item) => {
    // Function for click on an item
    // alert('Id : ' + item.id + ' Title : ' + item.name+ ' src : ' + item.profilePic);
    // navigation.navigate("FamilyBook",{name:item.name, id:item.id})
    // navigation.navigate("FamilyPresonDetail",{name:item.name, id:item.id, village:item.village, wifeName:item.wifeName, mobileNumber:item.mobileNumber, gender:item.gender, partner:item.partner})
   navigation.navigate("FamilyBook",{name:item.name, id:item.id, village:item.village, talukaName:item.talukaName})
  

  };

  const getItem2 = (item) => {
    navigation.navigate("FamilyBook2",{name:item.name, id:item.id, village:item.village, talukaName:item.talukaName})
  };

  const HandleSearchPerson = () => {
            setData({
                     ...data,
                      showButtons:false,
                      showSearch:true,
                    
                  });
  };

   const HandleSearchVillage = () => {
           setData({
                     ...data,
                      showButtons:false,
                      showVillage:true,
                    
                  });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
       {data.showButtons ? (
      <View style={styles.buttonView}>
      <AppTouchacleOpacity text="Search Person"  onPress={() => HandleSearchPerson()}  width={width/1.1} />
      <AppTouchacleOpacity text="Search Village"  onPress={() => HandleSearchVillage()}  width={width/1.1} />
      </View>
        ) : null}
        {data.showSearch ? (
          <View>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          autoFocus = {true}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Search Person..."
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
        </View>
          ) : null}
{/* //-------------------------------------------------------------------------------- */}
          {data.showVillage ? (
          <View>
        <SearchBar
          round
          autoFocus = {true}
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction2(text)}
          onClear={(text) => searchFilterFunction2('')}
          placeholder="Search Village..."
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView2}
        />
        </View>
          ) : null}

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
    justifyContent: 'center',
    // alignItems: 'center',      
  },
  itemStyle: {
    padding: 10,
  },
  buttonView:{
    marginTop:150 ,
    justifyContent: 'center',
    alignItems: 'center', 
  },
});

export default Family;


