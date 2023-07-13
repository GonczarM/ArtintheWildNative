import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, Card} from 'react-native-paper';

import * as muralsAPI from '../utils/murals-api'

function AddImage({mural, updateMural}) {

  const [image, setImage] = useState(null)
  const [status, requestPermission] = ImagePicker.useCameraPermissions()

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
      updateMural(updatedMural.mural)
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
  )
}

export default AddImage