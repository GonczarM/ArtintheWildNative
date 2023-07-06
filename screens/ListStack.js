import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as muralsAPI from '../utils/murals-api'
import MuralListItem from '../components/MuralListItem';
import MuralCard from './MuralCard';

const Stack = createNativeStackNavigator();

function ListMurals({ navigation }) {

  const [murals, setMurals] = useState(null)

  useEffect(() => {
    if(!murals){
      getMurals()
    }
  }, [])

  const getMurals = async () => {
    try{
      const APIMurals = await muralsAPI.getMurals()
      setMurals(APIMurals.murals)
    }catch{
      // setError('Could not get murals. Please refresh and try again.')
    }
  }

  const handleMuralClick = (mural) => {
    navigation.navigate('Mural Card', {mural});
  }

  return (
    <SafeAreaView>
      <FlatList
        data={murals}
        renderItem={(mural) => <MuralListItem mural={mural.item} handleMuralClick={handleMuralClick} />}
        keyExtractor={mural => mural._id}
      />
    </SafeAreaView>
  )
};

function ListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='List Murals' 
        component={ListMurals}
      />
      <Stack.Screen 
        name='Mural Card' 
        component={MuralCard}
      />
    </Stack.Navigator>
  );
}

export default ListStack;