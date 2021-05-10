import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ label, onPress, style }) => {
  return (
	  	<TouchableOpacity
	  		style={{ ...styles.button, ...style }}
			onPress={onPress}
		>
		  	<Text style={styles.buttonLabel}>
			  	{ label }
			</Text>
	  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'black',
		paddingHorizontal: 25,
		paddingVertical: 15,
		width: '70%',
		marginTop: 20,
		borderRadius: 5
	},

	buttonLabel: {
		fontSize: 18,
		color: 'white',
		textAlign: 'center'
	}
})

export default CustomButton