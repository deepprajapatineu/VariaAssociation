import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainWeddingScreen from './weddingScreen/MainWeddingScreen';
import MainWeddingScreen2 from './weddingScreen/MainWeddingScreen2';
import WeddingAdminPanel from './weddingScreen/WeddingAdminPanel';
import CoupleList from './weddingScreen/CoupleList';
import MainDonor from './weddingScreen/MainDonor';


const RootWedding = createStackNavigator();

const RootWeddingScreen = ({navigation}) => (
    <RootWedding.Navigator >

    
        <RootWedding.Screen name="MainWeddingScreen" component={MainWeddingScreen}
        options={{ headerShown: false }}
        />

        <RootWedding.Screen name="MainWeddingScreen2" component={MainWeddingScreen2}
        options={{ headerShown: false }}
        />

         <RootWedding.Screen name="WeddingAdminPanel" component={WeddingAdminPanel}
        options={{ headerShown: false }}
        />

       <RootWedding.Screen name="CoupleList" component={CoupleList}
        options={{ headerShown: false }}
        />

        <RootWedding.Screen name="MainDonor" component={MainDonor}
        options={{ headerShown: false }}
        />
    </RootWedding.Navigator>
);

export default RootWeddingScreen;