import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import * as muralsAPI from '../utils/murals-api'

function Map() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [murals, setMurals] = useState(null)

  const getMurals = async () => {
    try{
      const APIMurals = await muralsAPI.getMurals()
      setMurals(APIMurals.murals)
    }catch{
      setErrorMsg('Could not get murals. Please refresh and try again.')
    }
  }

  useEffect(() => {
    if(!murals){
      getMurals()
    }
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleUserLocation = () => {
    const newRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
    setRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      {location && murals && 
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE} 
        region={region} 
        showsUserLocation={true} 
        onMapReady={handleUserLocation}
      >
        {murals.map((mural, index) => (
          <Marker 
            key={index}
            coordinate={{latitude: mural.latitude, longitude: mural.longitude}}
            title={mural.title}
          />
        ))}
      </MapView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map