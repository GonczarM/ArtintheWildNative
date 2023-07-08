import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, StyleSheet, Pressable, } from 'react-native';
import * as Location from 'expo-location';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as muralsAPI from '../utils/murals-api'
import MuralBanner from '../components/MuralBanner';
import MuralCard from './MuralCard';

const Stack = createNativeStackNavigator();

function Map({navigation}) {

  const [murals, setMurals] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const [mural, setMural] = useState(null)
  
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

  const handleUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    await Location.getCurrentPositionAsync({});
  };

  const handleMarkerClick = (clickedMural) => {
    setMural(clickedMural)
  }

  const handleMuralBannerClick = () => {
    navigation.navigate('Mural Card', {mural});
  }

  return (
    <View style={styles.container}> 
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
          latitude: 41.88,
          longitude: -87.64,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }} 
        showsUserLocation={true} 
        onMapReady={handleUserLocation}
      >
        {murals && murals.map((mural, index) => ( <Marker 
          key={index}
          coordinate={{latitude: mural.latitude, longitude: mural.longitude}}
          onPress={() => handleMarkerClick(mural)}
        />))}
      </MapView>
      {mural && <View style={{width: '100%'}}>
        <Pressable
          onPress={handleMuralBannerClick}
        >
          <MuralBanner mural={mural} />
        </Pressable>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

function MapStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Map' 
        component={Map}
      />
      <Stack.Screen 
        name='Mural Card' 
        component={MuralCard}
      />
    </Stack.Navigator>
  );
}

export default MapStack