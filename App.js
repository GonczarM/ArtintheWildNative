import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { PaperProvider } from 'react-native-paper';
import { useState, useEffect } from 'react';

import MapStack from './screens/MapStack'
import Profile from './screens/Profile'
import CreateMural from './screens/CreateMural';
import ListStack from './screens/ListStack';
import * as muralsAPI from './utils/murals-api'


const Tab = createBottomTabNavigator();

export default function App() {

  const [murals, setMurals] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  
  useEffect(() => {
    if(!murals){
      getMurals()
    }
  }, []);

  const getMurals = async () => {
    try{
      const APIMurals = await muralsAPI.getMurals()
      setMurals(APIMurals.murals)
    }catch{
      setErrorMsg('Could not get murals. Please refresh and try again.')
    }
  }

  return (
    <NavigationContainer>
    <PaperProvider>
     {murals && <Tab.Navigator 
      initialRouteName={"MapOfMurals"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Profile') {
            iconName = 'user'
          } else if (route.name === 'Settings') {
            iconName = 'cog'
          } else if (route.name === 'MapOfMurals') {
            iconName = 'map-marker-alt'
          } else if (route.name === 'List') {
            iconName = 'list'
          } else if (route.name === 'Create') {
            iconName = 'pen-square'
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'lightblue',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
        <Tab.Screen name="Create" component={CreateMural} options={{ title: 'Create Mural' }} />
        <Tab.Screen 
          name="MapOfMurals" 
          component={MapStack} 
          initialParams={{ murals }}
          options={{ title: 'Map', headerShown: false, }}
        />
        <Tab.Screen 
          name="List" 
          component={ListStack} 
          initialParams={{ murals }} 
          options={{ title: 'List', headerShown: false }} 
        />
      </Tab.Navigator>}
      <StatusBar style="dark" />
    </PaperProvider>
    </NavigationContainer>
  );
}
