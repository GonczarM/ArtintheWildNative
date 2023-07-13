
import { SafeAreaView, FlatList} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as muralsAPI from '../utils/murals-api'
import MuralListItem from '../components/MuralListItem';
import MuralCard from './MuralCard';

const Stack = createNativeStackNavigator();

function ListMurals({ navigation, route }) {
  
  const { murals } = route.params

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

function ListStack({route}) {
  return (
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
  );
}

export default ListStack;