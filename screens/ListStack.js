import React, { useReducer, useContext } from 'react';
import { SafeAreaView, FlatList} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MuralListItem from '../components/MuralListItem';
import MuralCard from './MuralCard';
import { ListMuralContext, ListMuralDispatchContext} from '../utils/context';

const Stack = createNativeStackNavigator();

function muralReducer(mural, action){
  switch (action.type) {
    case 'changed': {
      return(action.mural)
    }
  }
}

function ListMurals({ navigation, route }) {
  
  const { murals } = route.params
  const mural = useContext(ListMuralContext)

  const dispatch = useContext(ListMuralDispatchContext)

  const handleMuralClick = (clickedMural) => {
    dispatch({
      type: 'changed',
      mural: clickedMural
    })
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

function ListStack({route}) {

  const [mural, dispatch] = useReducer(muralReducer, null);

  return (
    <ListMuralContext.Provider value={mural}>
    <ListMuralDispatchContext.Provider value={dispatch}>
    <Stack.Navigator>
      <Stack.Screen 
        name='List Murals' 
        component={ListMurals}
        initialParams={{murals: route.params.murals}}
      />
      <Stack.Screen 
        name='Mural Card' 
        component={MuralCard}
      />
    </Stack.Navigator>
    </ListMuralDispatchContext.Provider>
    </ListMuralContext.Provider>
  );
}

export default ListStack;