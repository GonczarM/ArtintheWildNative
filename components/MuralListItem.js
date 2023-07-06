import { View } from 'react-native'
import { Card } from 'react-native-paper';

function MuralListItem({ handleMuralClick, mural }) {

  return(
    <View>
      <Card onPress={() => handleMuralClick(mural)}>
        {mural.favoritePhoto && <Card.Cover source={{ uri: mural.favoritePhoto }} />}
        <Card.Title title={mural.title} subtitle={`by ${mural.artist}`}/>
      </Card>
    </View>
  )
};

export default MuralListItem