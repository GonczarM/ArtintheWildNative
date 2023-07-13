import React, { useState, useReducer, useContext } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, StyleSheet, Pressable, } from 'react-native';
import * as Location from 'expo-location';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MuralBanner from '../components/MuralBanner';
import MuralCard from './MuralCard';
import { MuralContext, MuralDispatchContext} from '../utils/context';

const Stack = createNativeStackNavigator();

function muralReducer(mural, action){
  switch (action.type) {
    case 'changed': {
      return(action.mural)
    }
  }
}

function Map({navigation, route}) {

  const [errorMsg, setErrorMsg] = useState(null);
  const { murals } = route.params
  const mural = useContext(MuralContext)

  const dispatch = useContext(MuralDispatchContext)

  const handleMarkerClick = (clickedMural) => {
    dispatch({
      type: 'changed',
      mural: clickedMural
    })
  }

  const handleUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    await Location.getCurrentPositionAsync({});
  };

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

function MapStack({route}) {

  const [mural, dispatch] = useReducer(muralReducer, null);

  return (
    <MuralContext.Provider value={mural}>
    <MuralDispatchContext.Provider value={dispatch}>
    <Stack.Navigator>
      <Stack.Screen 
        name='Map' 
        component={Map}
        initialParams={{ murals: route.params.murals}} 
      />
      <Stack.Screen 
        name='Mural Card' 
        component={MuralCard}
      />
    </Stack.Navigator>
    </MuralDispatchContext.Provider>
    </MuralContext.Provider>
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

export default MapStack