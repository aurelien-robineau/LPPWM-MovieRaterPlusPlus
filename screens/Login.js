import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

import CustomButton from '../components/CustomButton'

const Login = ({ navigation }) => {
	const [username, setUsername] = useState(null)
	const [password, setPassword] = useState(null)

	return (
		<View style={styles.container}>
			<View style={styles.formGroup}>
				<Text style={styles.label}>Nom d'utilisateur</Text>
				<TextInput
					style={styles.input}
					onChangeText={setUsername}
					value={username}
					textContentType="username"
				/>
			</View>

			<View style={styles.formGroup}>
				<Text style={styles.label}>Mot de passe</Text>
				<TextInput
					style={styles.input}
					onChangeText={setPassword}
					value={password}
					secureTextEntry={true}
					textContentType="password"
				/>
			</View>

			<View style={styles.submitButtonWrapper}>
				<CustomButton 
					label="Connexion"
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 40
	},

	formGroup: {
		marginTop: 30
	},

	label: {
		fontSize: 20,
		marginBottom: 5
	},

	input: {
		backgroundColor: 'white',
		paddingHorizontal: 20,
		paddingVertical: 15,
		fontSize: 20
	},

	submitButtonWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginTop: 30
	}
})

export default Login