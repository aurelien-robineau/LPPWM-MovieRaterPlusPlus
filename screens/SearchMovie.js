import React, { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

const SearchMovie = ({ navigation }) => {
	const [research, setReaserch] = useState(null)

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Recherche"
				onChangeText={setReaserch}
				value={research}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20
	},

	input: {
		backgroundColor: 'white',
		color: 'black',
		paddingHorizontal: 20,
		paddingVertical: 18,
		fontSize: 18,
		marginTop: 20
	}
})

export default SearchMovie