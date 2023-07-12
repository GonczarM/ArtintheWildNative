import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { PaperProvider } from 'react-native-paper';

import MapStack from './screens/MapStack'
import Profile from './screens/Profile'
import CreateMural from './screens/CreateMural';
import ListStack from './screens/ListStack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <PaperProvider>
      <Tab.Navigator 
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
        <Tab.Screen name="MapOfMurals" component={MapStack}  options={{ title: 'Map', headerShown: false }}/>
        <Tab.Screen name="List" component={ListStack} options={{ title: 'List', headerShown: false }} />
      </Tab.Navigator>
      <StatusBar style="dark" />
    </PaperProvider>
    </NavigationContainer>
  );
}
