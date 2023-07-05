import { View } from 'react-native'
import { Avatar, Button, Card, Text } from 'react-native-paper';

function MuralListItem({ mural }) {

  return(
    <View>
      <Card>
        <Card.Title/>
        <Card.Content>
          <Text variant="titleLarge">{mural.title}</Text>
          <Text variant="bodyMedium">{mural.artist}</Text>
        </Card.Content>
        {mural.favoritePhoto && <Card.Cover source={{ uri: mural.favoritePhoto }} />}
        <Card.Actions>
          <Button>View</Button>
        </Card.Actions>
      </Card>
    </View>
  )
};

export default MuralListItem