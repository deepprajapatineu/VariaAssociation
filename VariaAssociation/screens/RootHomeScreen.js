import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FamilyBook from './homescreens/FamilyBook';
import FamilyBook2 from './homescreens/FamilyBook2';
import FamilyPresonDetail from './homescreens/FamilyPresonDetail';
import Family from './homescreens/Family';
import AddFamily from './homescreens/AddFamily';
import MainFamily from './homescreens/MainFamily';
import AddPersonalFamily from './homescreens/AddPersonalFamily';
import EditFamily from './homescreens/EditFamily';
import ManageAdmins from './homescreens/ManageAdmins';
import DpOpen from './profilescreens/DpOpen';
import RootWeddingScreen from './RootWeddingScreen';

const RootHome = createStackNavigator();

const RootHomeScreen = ({navigation}) => (
    <RootHome.Navigator 
    screenOptions={{
        headerStyle: {
        backgroundColor: '#00ace6',
        // paddingLeft:30
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',

        }
    }}>
        <RootHome.Screen name="HomeScreen" component={HomeScreen}options={{
        title:'Varia Parivar',
        
        headerLeft: () => (
            <Icon.Button name="menu" size={25} backgroundColor="#00ace6" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }}/>

        <RootHome.Screen name="MainFamily" component={MainFamily}
       options={{ headerShown: false }}        
        />

         <RootHome.Screen name="AddPersonalFamily" component={AddPersonalFamily}
       options={{ headerShown: false }}        
        />

        <RootHome.Screen name="EditFamily" component={EditFamily}
       options={{ headerShown: false }}        
        />

        <RootHome.Screen name="Family" component={Family}
       options={{ headerShown: false }}
        
        />
        <RootHome.Screen name="FamilyBook" component={FamilyBook}
        options={{ headerShown: false }}
        />

         <RootHome.Screen name="FamilyBook2" component={FamilyBook2}
        options={{ headerShown: false }}
        />

        <RootHome.Screen name="FamilyPresonDetail" component={FamilyPresonDetail}
        options={{ headerShown: false }}
        />

        <RootHome.Screen name="AddFamily" component={AddFamily}
        options={{ headerShown: false }}
        />

          <RootHome.Screen name="ManageAdmins" component={ManageAdmins}
        options={{ headerShown: false }}
        />

        <RootHome.Screen name="DpOpen" component={DpOpen}
        options={{ headerShown: false }}
        />

        <RootHome.Screen name="RootWeddingScreen" component={RootWeddingScreen}
        options={{ headerShown: false }}
        />
      
    </RootHome.Navigator>
);

export default RootHomeScreen;