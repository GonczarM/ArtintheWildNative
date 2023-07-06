import { View, ScrollView } from 'react-native'
import { Avatar, Button, Card, Text } from 'react-native-paper';


function MuralCard({ route }) {

  const { mural } = route.params

  return(
    <ScrollView>
      <Card>
        {mural.favoritePhoto && <Card.Cover source={{ uri: mural.favoritePhoto }} />}
        <Card.Title title={mural.title} subtitle={`by ${mural.artist}`}/>
        <Card.Content>
          <Text>{mural.year}</Text>
          <Text>Description</Text>
          <Text>{mural.description}</Text>
          <Text>{`Sponsored by ${mural.affiliation}`}</Text>
          <Text>{mural.address}</Text>
          <Text>{mural.zipcode}</Text>
        </Card.Content>
        <Card.Actions>
          <Button>Add Photo</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  )
};

export default MuralCard