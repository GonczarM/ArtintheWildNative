import { ScrollView } from 'react-native'
import { Button, Card, Text, Modal, Portal, PaperProvider } from 'react-native-paper';
import * as Linking from 'expo-linking';
import { useState, useContext } from 'react';

import AddImage from '../components/AddImage'
import { MuralContext, MuralDispatchContext} from '../utils/context';

function MuralCard({ route }) {

  const [visible, setVisible] = useState(false)
  const mural = useContext(MuralContext)

  const dispatch = useContext(MuralDispatchContext)

  const updateMural = (updatedMural) => {
    dispatch({
      type: 'changed',
      mural: updatedMural
    })
    setVisible(false)
  }

  return(
    <PaperProvider>
    <ScrollView>
      <Card>
        {mural.favoritePhoto && <Card.Cover source={{ uri: mural.favoritePhoto }} />}
        <Card.Title title={mural.title} subtitle={`by ${mural.artist}`}/>
        <Card.Content>
          <Text>Created in {mural.year}</Text>
          <Text>Description</Text>
          <Text>{mural.description}</Text>
          <Text>Sponsored by {mural.affiliation}</Text>
          <Text>Address</Text>
          <Text>{mural.address}</Text>
          <Text>{mural.zipcode}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => setVisible(true)}>Add Photo</Button>
          <Button onPress={() => Linking.openURL(`geo:0,0?q=${mural.latitude},${mural.longitude}(${mural.title})`)}>Navigate</Button>
        </Card.Actions>
      </Card>
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)} >
          <AddImage mural={mural} updateMural={updateMural} />
        </Modal>
      </Portal>
    </ScrollView>
    </PaperProvider>
  )
};

export default MuralCard