import { ScrollView } from 'react-native'
import { Button, Card, Text, Modal, Portal, PaperProvider } from 'react-native-paper';
import * as Linking from 'expo-linking';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import * as muralsAPI from '../utils/murals-api'

function MuralCard({ route }) {

  const [status, requestPermission] = ImagePicker.useCameraPermissions()
  const [visible, setVisible] = useState(false)
  const [image, setImage] = useState(null)
  const { mural } = route.params

  const pickImage = async (imageUpload) => {
    let result
    if(imageUpload === 'camera'){
      console.log(status)
      if (!status.granted) {
        requestPermission();
      }
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }else if(imageUpload === 'library'){
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }
    setImage(result.assets[0].uri)
  }

  const addImage = async () => {
    try{
      const data = new FormData()
      data.append('photo', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
      const updatedMural = await muralsAPI.addPhoto(data, mural._id)
      console.log(updatedMural)
    }catch({message}){
      console.log(message)
			// if(message === 'Unauthorized'){
			// 	setError('Unauthorized. Please login and try again.')
			// }else{
      //   setError('Add Photo Failed. Please try Again.')
      // }
    }
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
          <Card>
            {image && <Card.Cover source={{uri: image}} />}
            <Card.Actions>
              {!image ? <>
                <Button onPress={() => pickImage('library')}>Upload Photo</Button>
                <Button onPress={() => pickImage('camera')}>Take Photo</Button>
              </>
              : <>
                <Button onPress={addImage}>Add Photo</Button>
              </>}
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
    </ScrollView>
    </PaperProvider>
  )
};

export default MuralCard