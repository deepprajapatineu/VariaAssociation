import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import DetailScreen from './profilescreens/DetailScreen';
import ChangePasswordScreen from './profilescreens/ChangePasswordScreen';
import HelpScreen from './profilescreens/HelpScreen';
import AboutUSScreen from './profilescreens/AboutUSScreen';
import editDetailScreen from './profilescreens/editDetailScreen';
import DpOpen from './profilescreens/DpOpen';
import SettingsScreen from './SettingsScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RootProfile = createStackNavigator();

const RootProfileScreen = ({navigation}) => (
    <RootProfile.Navigator 
    headerMode='none'>
        <RootProfile.Screen name="Settings" component={SettingsScreen}
/>

        <RootProfile.Screen name="Profile" component={DetailScreen}/>
        <RootProfile.Screen name="editDetailScreen" component={editDetailScreen}/>
        <RootProfile.Screen name="DpOpen" component={DpOpen}/>
        <RootProfile.Screen name="New Password" component={ChangePasswordScreen}/>
        <RootProfile.Screen name="HelpScreen" component={HelpScreen}/>
        <RootProfile.Screen name="AboutUSScreen" component={AboutUSScreen}/>
    </RootProfile.Navigator>
);

export default RootProfileScreen;