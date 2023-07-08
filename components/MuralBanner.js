import * as React from 'react';
import { Image } from 'react-native';
import { Banner, Text } from 'react-native-paper';

const MuralBanner = ({ mural }) => {
  const [visible, setVisible] = React.useState(true);

  return (
    <Banner
      style={{marginVertical: 12}}
      visible={visible}
      icon={() => (
        <Image
          source={{
            uri: mural.favoritePhoto,
          }}
          style={{
            width: 125,
            height: 125,
          }}
        />
      )}>
      <Text variant="headlineMedium" >{mural.title}</Text>{'\n'} 
      <Text variant="titleMedium">by {mural.artist}</Text>
    </Banner>
  );
};

export default MuralBanner;