import { ScrollView } from 'react-native'
import { Button, Card, Text } from 'react-native-paper';
import * as Linking from 'expo-linking';

function MuralCard({ route }) {

  const { mural } = route.params

  return(
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
          <Button>Add Photo</Button>
          <Button onPress={() => Linking.openURL(`geo:0,0?q=${mural.latitude},${mural.longitude}(${mural.title})`)}>Navigate</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  )
};

export default MuralCard