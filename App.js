import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Map from './screens/Map'
import Profile from './screens/Profile'
import CreateMural from './screens/CreateMural';
import ListMurals from './screens/ListMurals';
import Settings from './screens/Settings';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      initialRouteName={"Map"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = 'user'
          } else if (route.name === 'Settings') {
            iconName = 'cog'
          } else if (route.name === 'Map') {
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
        <Tab.Screen name="Map" component={Map}  options={{ title: 'Map' }}/>
        <Tab.Screen name="List" component={ListMurals} options={{ title: 'List' }} />
        <Tab.Screen name="Settings" component={Settings} options={{ title: 'Settings' }} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
