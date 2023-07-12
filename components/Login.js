import { View, TextInput, Button, Text } from 'react-native'
import React, { useState } from 'react'
import { login } from '../utils/users-service'

const initialUser = {
	username: '',
	password: ''
}

function Login({loginUser}){
	
	const [form, setForm] = useState(initialUser)
	const [error, setError] = useState('')

	const handleLogin = async () => {
		try{
			const user = await login(form)
			setForm(initialUser)
			loginUser(user)
			// console.log(user)
		}
		catch({message}){
			if(message === 'Conflict'){
				setError('Incorrect username or password. Please try again.')
			}else{
      	setError('Could not login. Please try again.')
			}
    }
	}

  return(
		<View >
			{/* {error && <ErrorMessage error={error} setError={setError} />} */}
			<Text className='text-center'>Login</Text>
			<View >
				<TextInput 
					placeholder='username'
					value={form.username}
					onChangeText={newText => setForm({...form, username: newText})}
				/>
				<TextInput 
					placeholder='password'
					value={form.password}
					onChangeText={newText => setForm({...form, password: newText})}
				/>
				<Button onPress={handleLogin} title='Login' />
			</View>
		</View>
	)
}

export default Login