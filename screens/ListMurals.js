import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList} from 'react-native';

import * as muralsAPI from '../utils/murals-api'
import MuralListItem from '../components/MuralListItem';

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
      // const randomMurals = []
      // for (let i = 0; i < 6; i++) {
      //   const randomMural = getRandomMural(APIMurals.murals)
      //   randomMurals.push(randomMural)
      // }
      // setMurals(randomMurals)
    }catch{
      // setError('Could not get murals. Please refresh and try again.')
    }
  }

  return (
    <SafeAreaView>
      {murals && murals.length > 0 && <FlatList
        data={murals}
        renderItem={(m) => <MuralListItem mural={m.item} />}
        keyExtractor={mural => mural._id}
      />}
    </SafeAreaView>
  );
};

export default ListMurals;