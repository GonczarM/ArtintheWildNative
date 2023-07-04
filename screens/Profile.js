import { useState } from 'react';
import { View, Text, Button } from 'react-native';
import Login from '../components/Login';

function Profile({ navigation }) {

  const [user, setUser] = useState(null)

  const loginUser = (userToLogin) => {
    setUser(userToLogin)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {user ? 
      <Text>Profile</Text>
      : <Login loginUser={loginUser} />
      }
    </View>
  );
}

export default Profile